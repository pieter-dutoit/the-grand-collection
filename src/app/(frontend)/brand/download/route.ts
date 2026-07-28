import sharp from 'sharp'

import {
  brandLogoDesigns,
  buildLogoFilename,
  LOGO_ASSET_VERSION,
  logoBackgrounds,
  logoColours,
  type LogoBackgroundId,
  type LogoColourId,
  type LogoDesignId,
  type LogoDownloadFormat,
  type LogoSizeId
} from '../components/brand-data'
import { renderBrandLogoSvg } from '../components/brand-logo-renderer'

export const runtime = 'nodejs'

const FORMATS = ['svg', 'png', 'jpeg'] as const
const DISPOSITIONS = ['attachment', 'inline'] as const
const MAX_RESPONSE_BYTES = 4_300_000
const IMMUTABLE_CACHE_SECONDS = 31_536_000
const LOGO_IDS = brandLogoDesigns.map(({ id }) => id)
const COLOUR_IDS = logoColours.map(({ id }) => id)
const BACKGROUND_IDS = logoBackgrounds.map(({ id }) => id)
const SIZE_IDS = brandLogoDesigns[0].sizes.map(({ id }) => id)

const isOneOf = <T extends string>(
  value: string | null,
  options: readonly T[]
): value is T => value !== null && options.includes(value as T)

const errorResponse = (message: string, status: number) =>
  Response.json(
    { error: message },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow, noarchive, noimageindex'
      }
    }
  )

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const logo = searchParams.get('logo')
  const foreground = searchParams.get('foreground')
  const background = searchParams.get('background')
  const size = searchParams.get('size')
  const format = searchParams.get('format')
  const version = searchParams.get('v')
  const disposition = searchParams.get('disposition') ?? 'attachment'

  if (
    !isOneOf(logo, LOGO_IDS) ||
    !isOneOf(foreground, COLOUR_IDS) ||
    !isOneOf(background, BACKGROUND_IDS) ||
    !isOneOf(size, SIZE_IDS) ||
    !isOneOf(format, FORMATS) ||
    !isOneOf(disposition, DISPOSITIONS) ||
    version !== LOGO_ASSET_VERSION
  ) {
    return errorResponse('Invalid logo download options.', 400)
  }

  if (foreground === background) {
    return errorResponse(
      'The logo and background colours must be different.',
      400
    )
  }

  if (format === 'jpeg' && background === 'transparent') {
    return errorResponse('JPEG downloads require a solid background.', 400)
  }

  const design = brandLogoDesigns.find(({ id }) => id === logo)
  const sizeOption = design?.sizes.find(({ id }) => id === size)

  if (!design || !sizeOption) {
    return errorResponse('Unknown logo design or size.', 400)
  }

  try {
    const svg = renderBrandLogoSvg({
      logo: logo as LogoDesignId,
      foreground: foreground as LogoColourId,
      background:
        format === 'svg' ? (background as LogoBackgroundId) : 'transparent'
    })

    let body: ArrayBuffer
    let contentType: string

    if (format === 'svg') {
      body = new TextEncoder().encode(svg).buffer
      contentType = 'image/svg+xml; charset=utf-8'
    } else {
      const image = sharp(Buffer.from(svg), { density: 300 }).resize({
        width: sizeOption.width,
        height: sizeOption.height,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      const backgroundHex = logoBackgrounds.find(
        ({ id }) => id === background
      )?.hex
      const flattenedImage = backgroundHex
        ? image.flatten({ background: backgroundHex })
        : image
      const output =
        format === 'png'
          ? await flattenedImage.png({ compressionLevel: 9 }).toBuffer()
          : await flattenedImage
              .jpeg({ chromaSubsampling: '4:4:4', quality: 92 })
              .toBuffer()

      body = Uint8Array.from(output).buffer
      contentType = format === 'png' ? 'image/png' : 'image/jpeg'
    }

    if (body.byteLength > MAX_RESPONSE_BYTES) {
      return errorResponse('The generated logo is too large to download.', 413)
    }

    const filename = buildLogoFilename({
      logo: logo as LogoDesignId,
      foreground: foreground as LogoColourId,
      background: background as LogoBackgroundId,
      size: size as LogoSizeId,
      format: format as LogoDownloadFormat
    })
    const cacheValue = `public, max-age=${IMMUTABLE_CACHE_SECONDS}, immutable`

    return new Response(body, {
      headers: {
        'Cache-Control': cacheValue,
        'Content-Disposition': `${disposition}; filename="${filename}"`,
        'Content-Length': String(body.byteLength),
        'Content-Type': contentType,
        'Vercel-CDN-Cache-Control': cacheValue,
        'X-Content-Type-Options': 'nosniff',
        'X-Robots-Tag': 'noindex, nofollow, noarchive, noimageindex'
      }
    })
  } catch (error) {
    console.error('Failed to generate brand logo', error)
    return errorResponse('The logo could not be generated.', 500)
  }
}
