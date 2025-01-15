// Cache response
export const dynamic = 'force-static'

import { NextResponse } from 'next/server'
import sharp from 'sharp'

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
    const path = `${process.env.PUBLIC_BUCKET_PATH}/media/${filename.replace(
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

    // Do not format SVG's
    if (isSVG) {
      const headers = new Headers()
      headers.set('Content-Type', 'image/svg+xml')
      headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      return new NextResponse(buffer, {
        status: 200,
        statusText: 'OK',
        headers
      })
    }

    // Perform resizing and format conversions if necessary:
    if (!!sizeParams) {
      const image = sharp(buffer)
      const [width, height] = sizeParams.split('x')

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
    const headers = new Headers()
    const mimeType = `image/${extension}`
    headers.set('Content-Type', mimeType)
    headers.set('Cache-Control', 'public, max-age=31536000, immutable')

    return new NextResponse(buffer, {
      status: 200,
      statusText: 'OK',
      headers
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// Sources
// https://stackoverflow.com/questions/77248968/return-image-from-next-js-api-display-in-browser
// https://medium.com/@nfarina/hosting-and-transforming-images-at-scale-with-cloudflare-1aaeb97651bc
