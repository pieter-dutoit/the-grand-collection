'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import {
  ChevronDown,
  CircleHelp,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet
} from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import {
  buildLogoFilename,
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
  png: 'PNG',
  jpeg: 'JPEG'
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
  size
}: {
  background: LogoBackgroundId
  disposition: 'attachment' | 'inline'
  foreground: LogoColourId
  format: LogoDownloadFormat
  logo: BrandLogoDesign['id']
  size: LogoSizeId
}) => {
  const params = new URLSearchParams({
    logo,
    foreground,
    background,
    size,
    format,
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
  const [downloadingFormat, setDownloadingFormat] =
    useState<LogoDownloadFormat | null>(null)

  const selectedForeground = logoColours.find(({ id }) => id === foreground)!
  const selectedBackground = logoBackgrounds.find(
    ({ id }) => id === background
  )!
  const selectedSize = design.sizes.find(({ id }) => id === size)!

  const previewUrl = useMemo(
    () =>
      buildDownloadUrl({
        logo: design.id,
        foreground,
        background,
        size,
        format: 'svg',
        disposition: 'inline'
      }),
    [background, design.id, foreground, size]
  )

  const handleForegroundChange = (value: string) => {
    if (!value) return

    const nextForeground = value as LogoColourId
    setForeground(nextForeground)

    if (background === nextForeground) {
      setBackground('transparent')
    }
  }

  const handleBackgroundChange = (value: string) => {
    if (!value) return

    const nextBackground = value as LogoBackgroundId
    setBackground(nextBackground)
  }

  const handleSizeChange = (value: string) => {
    if (value) setSize(value as LogoSizeId)
  }

  const downloadLogo = async (format: LogoDownloadFormat) => {
    if (format === 'jpeg' && background === 'transparent') return

    setDownloadingFormat(format)

    const filename = buildLogoFilename({
      logo: design.id,
      foreground,
      background,
      size,
      format
    })

    try {
      const response = await fetch(
        buildDownloadUrl({
          logo: design.id,
          foreground,
          background,
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

  const previewStyle =
    background === 'transparent'
      ? CHECKERBOARD_STYLE
      : { backgroundColor: selectedBackground.hex ?? undefined }
  const previewAlt = `${design.alt} in ${selectedForeground.name} on ${
    background === 'transparent'
      ? 'a transparent background'
      : `a ${selectedBackground.name} background`
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
          style={previewStyle}
        >
          <Image
            src={previewUrl}
            alt={previewAlt}
            width={selectedSize.width}
            height={selectedSize.height}
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
                const disabled = option.id === foreground

                return (
                  <ToggleGroupItem
                    key={option.id}
                    value={option.id}
                    disabled={disabled}
                    aria-label={
                      disabled
                        ? `${option.name} background unavailable because it matches the logo`
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
              Matching logo and background colours are unavailable to keep the
              mark visible.
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
              {design.sizes.map((option) => (
                <ToggleGroupItem
                  key={option.id}
                  value={option.id}
                  aria-label={`${option.name}, ${option.width} by ${option.height} pixels`}
                  className='h-auto min-w-0 flex-col px-2 py-2'
                >
                  <span>{option.name}</span>
                  <span className='text-xs font-normal text-olive-500'>
                    {option.width}×{option.height}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <FieldDescription className='flex flex-wrap items-center gap-2'>
              {selectedSize.useCase}.
              {size === 'large' && (
                <Badge asChild variant='secondary'>
                  <span>Recommended</span>
                </Badge>
              )}
              <span>Size applies to PNG and JPEG; SVG scales freely.</span>
            </FieldDescription>
          </FieldSet>
        </FieldGroup>
      </CardContent>

      <Separator />

      <CardFooter className='flex flex-wrap justify-between gap-4 pt-6'>
        <div className='flex items-center gap-1'>
          <p className='text-sm text-olive-600'>
            JPEG requires a solid background.
          </p>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type='button'
                  variant='ghost'
                  colour='olive'
                  size='icon'
                  aria-label='Why JPEG requires a solid background'
                >
                  <CircleHelp data-icon='inline-start' aria-hidden='true' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                JPEG does not support transparent pixels. Choose Gold, Olive,
                Black, or White first.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DropdownMenu>
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
              <DropdownMenuItem onSelect={() => void downloadLogo('svg')}>
                <FileType aria-hidden='true' />
                <span className='flex flex-col'>
                  <span>SVG</span>
                  <span className='text-xs text-olive-500'>
                    Scalable vector
                  </span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => void downloadLogo('png')}>
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
              <DropdownMenuItem
                disabled={background === 'transparent'}
                onSelect={() => void downloadLogo('jpeg')}
              >
                <FileImage aria-hidden='true' />
                <span className='flex flex-col'>
                  <span>JPEG</span>
                  <span className='text-xs text-olive-500'>
                    {background === 'transparent'
                      ? 'Choose a solid background'
                      : 'Smaller photographic file'}
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
