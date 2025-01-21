// Cache response
export const dynamic = 'force-static'

import sharp from 'sharp'

import { ALLOWED_SIZES, calculatePortraitHeight } from '@/components/ui/image'

const FORMAT_REGEX = /.(\w+)$/i
const SIZE_PARAMS_REGEX = /-(\d+x\d+)\..+$/i
const PARAM_REPLACE_REGEX = /-\d+x\d+/i

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    // Extract image details from url:
    const filename = (await params).name
    const sizeParams = filename.match(SIZE_PARAMS_REGEX)?.[1]
    const extension = filename.match(FORMAT_REGEX)?.[1]
    const isSVG = extension === 'svg'

    // Construct the bucket url to fetch the image from:
    const path = `${process.env.S3_BUCKET_PATH}/media/${filename.replace(
      PARAM_REPLACE_REGEX,
      ''
    )}`

    // Fetch image from bucket:
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    // Ensure the resource is a valid image:
    const contentType = response.headers.get('Content-Type') || ''
    if (!contentType.startsWith('image/')) {
      throw new Error(`Invalid image content type: ${contentType}`)
    }

    // Convert image to buffer
    let buffer: ArrayBuffer | Buffer = await response.arrayBuffer()

    if (isSVG) {
      // Do not format SVG's
      // Cache response to browser
      return new Response(buffer, {
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': 'same-site'
        }
      })
    }

    // Perform resizing and format conversions if necessary:
    if (!!sizeParams) {
      const image = sharp(buffer)
      const [width, height] = sizeParams.split('x')

      // Validate size parameters to protect against invalid route requests or attacks
      const isAllowedWidth = ALLOWED_SIZES.includes(+width)
      const isAllowedHeight =
        +height === 0 || +height === calculatePortraitHeight(+width)

      if (!(isAllowedWidth && isAllowedHeight)) {
        return new Response('Invalid request', { status: 400 })
      }

      image.resize({
        width: +width,
        height: +height || undefined,
        fit: 'cover',
        position: 'center',
        withoutEnlargement: true
      })
      buffer = await image.toBuffer()
    }

    // Create appropriate response headers
    // Cache response to browser for better user experience
    const mimeType = `image/${extension}`

    return new Response(buffer, {
      status: 200,
      statusText: 'OK',
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': 'same-site'
      }
    })
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

// Sources
// https://stackoverflow.com/questions/77248968/return-image-from-next-js-api-display-in-browser
// https://medium.com/@nfarina/hosting-and-transforming-images-at-scale-with-cloudflare-1aaeb97651bc
