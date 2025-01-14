import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

const FORMAT_REGEX = /.(\w+)$/i
const SIZE_PARAMS_REGEX = /-(\d+x\d+)\..+$/i
const PARAM_REPLACE_REGEX = /-\d+x\d+/i
const PAYLOAD_MEDIA_BASE_ROUTE = '/api/media/file'

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

    const response = await fetch(
      `http://localhost:3000/${PAYLOAD_MEDIA_BASE_ROUTE}/${filename}`.replace(
        PARAM_REPLACE_REGEX,
        ''
      )
    )
    let buffer: ArrayBuffer | Buffer = await response.arrayBuffer()

    if (sizeParams) {
      const [height, width] = sizeParams.split('x')

      let image = sharp(buffer).resize(+height, +width || undefined)
      if (extension !== 'webp' && toWebp) {
        image = image.webp()
      }
      buffer = await image.toBuffer()
    }

    const headers = new Headers()
    headers.set('Content-Type', `image/${toWebp ? 'webp' : extension}`)
    return new NextResponse(buffer, {
      status: 200,
      statusText: 'OK',
      headers
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to serve image' })
  }
}

export const revalidate = false
export const dynamic = 'force-static'

// Sources
// https://stackoverflow.com/questions/77248968/return-image-from-next-js-api-display-in-browser
// https://medium.com/@nfarina/hosting-and-transforming-images-at-scale-with-cloudflare-1aaeb97651bc
