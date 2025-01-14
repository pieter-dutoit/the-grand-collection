import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

const FORMAT_REGEX = /.(\w+)$/i
const SIZE_PARAMS_REGEX = /-(\d+x\d+)\..+$/i
const PARAM_REPLACE_REGEX = /-\d+x\d+/i

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const filename = (await params).name
    const sizeParams = filename.match(SIZE_PARAMS_REGEX)?.[1]
    const extension = filename.match(FORMAT_REGEX)?.[1]

    const accept = request.headers.get('Accept') ?? ''
    const toWebp = /image\/webp/.test(accept)

    const path = `${process.env.PUBLIC_BUCKET_PATH}/media/${filename.replace(
      PARAM_REPLACE_REGEX,
      ''
    )}`

    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const contentType = response.headers.get('Content-Type') || ''
    if (!contentType.startsWith('image/')) {
      throw new Error(`Invalid image content type: ${contentType}`)
    }

    let buffer: ArrayBuffer | Buffer = await response.arrayBuffer()

    try {
      sharp(buffer) // Attempt to initialize with the buffer
    } catch (error) {
      throw new Error(`Invalid image buffer: ${error}`)
    }

    if (sizeParams) {
      const [height, width] = sizeParams.split('x')

      let image = sharp(buffer).resize(+height, +width || undefined)

      if (extension !== 'webp' && toWebp) {
        image = image.webp()
      }

      buffer = await image.toBuffer()
    }

    const headers = new Headers()
    const mimeType = `image/${toWebp ? 'webp' : extension}`
    console.log('Mime type: ', mimeType)
    headers.set('Content-Type', mimeType)

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

export const revalidate = false
export const dynamic = 'force-static'

// Sources
// https://stackoverflow.com/questions/77248968/return-image-from-next-js-api-display-in-browser
// https://medium.com/@nfarina/hosting-and-transforming-images-at-scale-with-cloudflare-1aaeb97651bc
