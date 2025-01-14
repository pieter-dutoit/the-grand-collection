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

    const basePath = process.env.VERCEL_URL || 'localhost:3000'
    const httpScheme = process.env.HTTP_SCHEME || 'https'
    const path =
      `${httpScheme}://${basePath}/${PAYLOAD_MEDIA_BASE_ROUTE}/${filename}`.replace(
        PARAM_REPLACE_REGEX,
        ''
      )
    console.log('PATH: ', path)

    const response = await fetch(path)
    let buffer: ArrayBuffer | Buffer = await response.arrayBuffer()

    if (sizeParams) {
      console.log('size 1')
      const [height, width] = sizeParams.split('x')
      console.log('size 2')
      let image = sharp(buffer).resize(+height, +width || undefined)
      console.log('size 3')
      if (extension !== 'webp' && toWebp) {
        console.log('size 4')
        image = image.webp()
      }
      console.log('size 5')
      buffer = await image.toBuffer()
    }

    console.log('size 6')
    const headers = new Headers()
    headers.set('Content-Type', `image/${toWebp ? 'webp' : extension}`)
    console.log('size 7')
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
