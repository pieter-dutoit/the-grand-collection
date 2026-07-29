'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ChevronDown,
  Download,
  FileImage,
  FileType,
  LoaderCircle
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

import {
  buildLogoFilename,
  getLogoOutputSize,
  isLogoColourCombinationAllowed,
  LOGO_ASSET_VERSION,
  logoBackgrounds,
  logoColours,
  type BrandLogoDesign,
  type LogoBackgroundId,
  type LogoColourId,
  type LogoDownloadFormat,
  type LogoSizeId
} from './brand-data'

const FORMAT_LABELS: Record<LogoDownloadFormat, string> = {
  svg: 'SVG',
  png: 'PNG'
}

const CHECKERBOARD_STYLE = {
  backgroundColor: '#ffffff',
  backgroundImage:
    'linear-gradient(45deg, #d6d3d1 25%, transparent 25%), linear-gradient(-45deg, #d6d3d1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d6d3d1 75%), linear-gradient(-45deg, transparent 75%, #d6d3d1 75%)',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0',
  backgroundSize: '20px 20px'
} as const

const buildDownloadUrl = ({
  background,
  disposition,
  foreground,
  format,
  logo,
  rounded,
  size
}: {
  background: LogoBackgroundId
  disposition: 'attachment' | 'inline'
  foreground: LogoColourId
  format: LogoDownloadFormat
  logo: BrandLogoDesign['id']
  rounded: boolean
  size: LogoSizeId
}) => {
  const params = new URLSearchParams({
    logo,
    foreground,
    background,
    size,
    format,
    rounded: String(rounded),
    v: LOGO_ASSET_VERSION,
    disposition
  })

  return `/brand/download?${params.toString()}`
}

const ColourSwatch = ({
  hex,
  transparent = false
}: {
  hex: `#${string}` | null
  transparent?: boolean
}) => (
  <span
    aria-hidden='true'
    className='size-5 shrink-0 rounded-full border border-olive-300 shadow-xs'
    style={transparent ? CHECKERBOARD_STYLE : { backgroundColor: hex ?? '' }}
  />
)

export default function LogoConfiguratorCard({
  design,
  eager = false
}: {
  design: BrandLogoDesign
  eager?: boolean
}) {
  const [foreground, setForeground] = useState<LogoColourId>('gold')
  const [background, setBackground] = useState<LogoBackgroundId>('transparent')
  const [size, setSize] = useState<LogoSizeId>('large')
  const [rounded, setRounded] = useState(false)
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)
  const [downloadingFormat, setDownloadingFormat] =
    useState<LogoDownloadFormat | null>(null)

  const selectedForeground = logoColours.find(({ id }) => id === foreground)!
  const selectedBackground = logoBackgrounds.find(
    ({ id }) => id === background
  )!
  const selectedSize = design.sizes.find(({ id }) => id === size)!
  const selectedOutputSize = getLogoOutputSize({
    background,
    design,
    size: selectedSize
  })

  const previewUrl = useMemo(
    () =>
      buildDownloadUrl({
        logo: design.id,
        foreground,
        background,
        rounded,
        size,
        format: 'svg',
        disposition: 'inline'
      }),
    [background, design.id, foreground, rounded, size]
  )

  const handleForegroundChange = (value: string) => {
    if (!value) return

    const nextForeground = value as LogoColourId
    setForeground(nextForeground)

    if (
      !isLogoColourCombinationAllowed({
        background,
        foreground: nextForeground
      })
    ) {
      setBackground('transparent')
      setRounded(false)
    }
  }

  const handleBackgroundChange = (value: string) => {
    if (!value) return

    const nextBackground = value as LogoBackgroundId
    if (
      !isLogoColourCombinationAllowed({
        background: nextBackground,
        foreground
      })
    )
      return

    setBackground(nextBackground)

    if (nextBackground === 'transparent') {
      setRounded(false)
    }
  }

  const handleSizeChange = (value: string) => {
    if (value) setSize(value as LogoSizeId)
  }

  const downloadLogo = async (format: LogoDownloadFormat) => {
    if (downloadingFormat !== null) return

    setDownloadingFormat(format)

    const filename = buildLogoFilename({
      logo: design.id,
      foreground,
      background,
      rounded,
      size,
      format
    })

    try {
      const response = await fetch(
        buildDownloadUrl({
          logo: design.id,
          foreground,
          background,
          rounded,
          size,
          format,
          disposition: 'attachment'
        })
      )

      if (!response.ok) {
        throw new Error('Download request failed')
      }

      const objectUrl = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)

      toast.success(`${FORMAT_LABELS[format]} download ready`)
    } catch {
      toast.error('The logo could not be downloaded. Please try again.')
    } finally {
      setDownloadingFormat(null)
    }
  }

  const handleDownloadSelect = (format: LogoDownloadFormat) => {
    setDownloadMenuOpen(false)
    void downloadLogo(format)
  }

  const previewAlt = `${design.alt} in ${selectedForeground.name} on ${
    background === 'transparent'
      ? 'a transparent background'
      : `a ${selectedBackground.name} background${rounded ? ' with rounded corners' : ''}`
  }`

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className='text-xl text-olive-950'>{design.name}</h3>
        </CardTitle>
        <CardDescription>{design.description}</CardDescription>
      </CardHeader>

      <CardContent className='grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)] lg:items-start'>
        <div
          className='flex h-72 items-center justify-center overflow-hidden rounded-lg border border-olive-200 p-8 sm:p-12'
          style={CHECKERBOARD_STYLE}
        >
          <Image
            src={previewUrl}
            alt={previewAlt}
            width={selectedOutputSize.width}
            height={selectedOutputSize.height}
            className={cn(
              'h-auto w-auto max-w-full object-contain',
              design.id === 'horizontal' ? 'max-h-32' : 'max-h-48'
            )}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
            unoptimized
          />
        </div>

        <FieldGroup className='gap-6'>
          <FieldSet className='gap-3'>
            <FieldLegend variant='label'>Logo colour</FieldLegend>
            <ToggleGroup
              type='single'
              value={foreground}
              onValueChange={handleForegroundChange}
              variant='outline'
              className='grid grid-cols-2 sm:grid-cols-4'
              aria-label={`${design.name} colour`}
            >
              {logoColours.map((colour) => (
                <ToggleGroupItem
                  key={colour.id}
                  value={colour.id}
                  aria-label={`Use ${colour.name} logo`}
                  className='h-auto min-w-0 justify-start px-3 py-2'
                >
                  <ColourSwatch hex={colour.hex} />
                  <span>{colour.name}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FieldSet>

          <FieldSet className='gap-3'>
            <FieldLegend variant='label'>Background</FieldLegend>
            <ToggleGroup
              type='single'
              value={background}
              onValueChange={handleBackgroundChange}
              variant='outline'
              className='grid grid-cols-2 sm:grid-cols-5'
              aria-label={`${design.name} background`}
            >
              {logoBackgrounds.map((option) => {
                const disabled = !isLogoColourCombinationAllowed({
                  background: option.id,
                  foreground
                })

                return (
                  <ToggleGroupItem
                    key={option.id}
                    value={option.id}
                    disabled={disabled}
                    aria-label={
                      disabled
                        ? `${option.name} background unavailable with ${selectedForeground.name} logo`
                        : `Use ${option.name} background`
                    }
                    className='h-auto min-w-0 flex-col px-2 py-2'
                  >
                    <ColourSwatch
                      hex={option.hex}
                      transparent={option.id === 'transparent'}
                    />
                    <span className='text-xs'>{option.name}</span>
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
            <FieldDescription>
              Incompatible backgrounds are disabled. Choosing a logo colour that
              conflicts with the current background resets the background to
              Transparent.
            </FieldDescription>
          </FieldSet>

          <FieldSet className='gap-3'>
            <FieldLegend variant='label'>Size</FieldLegend>
            <ToggleGroup
              type='single'
              value={size}
              onValueChange={handleSizeChange}
              variant='outline'
              className='grid grid-cols-2 sm:grid-cols-4'
              aria-label={`${design.name} download size`}
            >
              {design.sizes.map((option) => {
                const outputSize = getLogoOutputSize({
                  background,
                  design,
                  size: option
                })

                return (
                  <ToggleGroupItem
                    key={option.id}
                    value={option.id}
                    aria-label={`${option.name}, ${outputSize.width} by ${outputSize.height} pixels`}
                    className='h-auto min-w-0 flex-col px-2 py-2'
                  >
                    <span>{option.name}</span>
                    <span className='text-xs font-normal text-olive-500'>
                      {outputSize.width}×{outputSize.height}
                    </span>
                  </ToggleGroupItem>
                )
              })}
            </ToggleGroup>
            <FieldDescription className='flex flex-wrap items-center gap-2'>
              {selectedSize.useCase}.
              <br />
              <span className='font-semibold'>
                Size applies to PNG; SVG scales freely.
              </span>
            </FieldDescription>
          </FieldSet>

          <FieldSet className='gap-3'>
            <FieldLegend variant='label'>Corners</FieldLegend>
            <Field
              orientation='horizontal'
              data-disabled={background === 'transparent'}
            >
              <Checkbox
                id={`rounded-corners-${design.id}`}
                checked={rounded}
                disabled={background === 'transparent'}
                onCheckedChange={(checked) => setRounded(checked === true)}
              />
              <FieldContent>
                <FieldLabel htmlFor={`rounded-corners-${design.id}`}>
                  Rounded corners
                </FieldLabel>
                <FieldDescription>
                  Available when a background colour is selected.
                </FieldDescription>
              </FieldContent>
            </Field>
          </FieldSet>
        </FieldGroup>
      </CardContent>

      <Separator />

      <CardFooter className='flex flex-wrap justify-between gap-4 pt-6'>
        <p className='text-sm text-olive-600'>
          The preview matches the exported canvas, padding, and corners.
        </p>

        <DropdownMenu
          modal={false}
          open={downloadMenuOpen}
          onOpenChange={setDownloadMenuOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              type='button'
              colour='gold'
              size='lg'
              disabled={downloadingFormat !== null}
            >
              {downloadingFormat ? (
                <LoaderCircle
                  data-icon='inline-start'
                  className='animate-spin'
                  aria-hidden='true'
                />
              ) : (
                <Download data-icon='inline-start' aria-hidden='true' />
              )}
              {downloadingFormat
                ? `Preparing ${FORMAT_LABELS[downloadingFormat]}`
                : 'Download'}
              <ChevronDown data-icon='inline-end' aria-hidden='true' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='min-w-56'>
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => handleDownloadSelect('svg')}>
                <FileType aria-hidden='true' />
                <span className='flex flex-col'>
                  <span>SVG</span>
                  <span className='text-xs text-olive-500'>
                    Scalable vector
                  </span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleDownloadSelect('png')}>
                <FileImage aria-hidden='true' />
                <span className='flex flex-col'>
                  <span className='flex items-center gap-2'>
                    PNG
                    <Badge asChild variant='secondary'>
                      <span>Recommended</span>
                    </Badge>
                  </span>
                  <span className='text-xs text-olive-500'>
                    Supports transparency
                  </span>
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
