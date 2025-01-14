import { twMerge } from 'tailwind-merge'

interface Props {
  src: string | undefined
  alt: string | undefined
  fill?: boolean
  height?: number
  width?: number
  sizes?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
  className: string
  portrait?: boolean
}

const SIZES = [200, 480, 640, 770, 900, 1080, 1200, 1920, 2048]
const MOBILE_BREAK = 900

function createSourceSet(src: string, portrait: boolean): string {
  const [name, extension] = src.split('.')
  const result = SIZES.reduce((acc, width, index) => {
    const height = width <= MOBILE_BREAK && portrait ? width * 1.5 : 0
    return (
      acc +
      `${index ? ', ' : ''}${name}-${width}x${height}.${extension} ${width}w`
    )
  }, '')

  return result
}

export default function Image(props: Props): JSX.Element {
  const {
    src,
    alt,
    sizes,
    height,
    width,
    fill,
    className,
    portrait = false,
    // priority = 'false',
    loading = 'lazy'
  } = props

  const imagePath = `images/${src}`

  const defaultStyles = fill ? 'absolute inset-0 size-full' : ''

  return (
    <img
      className={twMerge(defaultStyles, className)}
      src={imagePath}
      alt={alt}
      loading={loading}
      {...(fill
        ? src && { srcSet: createSourceSet(imagePath, portrait), sizes }
        : {
            height,
            width
          })}
    />
  )
}
