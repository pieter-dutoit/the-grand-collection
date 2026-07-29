export type BrandColour = {
  name: string
  hex: `#${string}`
  foreground: 'dark' | 'light'
}

export type LogoColourId = 'gold' | 'olive' | 'black' | 'white'
export type LogoBackgroundId = 'transparent' | LogoColourId
export type LogoDesignId = 'horizontal' | 'emblem'
export type LogoSizeId = 'small' | 'medium' | 'large' | 'xlarge'
export type LogoDownloadFormat = 'svg' | 'png'

export type LogoColourOption = {
  id: LogoColourId
  name: string
  hex: `#${string}`
}

export type LogoBackgroundOption = {
  id: LogoBackgroundId
  name: string
  hex: `#${string}` | null
}

export type LogoSizeOption = {
  id: LogoSizeId
  name: string
  width: number
  height: number
  useCase: string
}

export type BrandLogoDesign = {
  id: LogoDesignId
  name: string
  description: string
  alt: string
  sourceViewBox: readonly [number, number, number, number]
  sizes: readonly LogoSizeOption[]
}

export const LOGO_ASSET_VERSION = '5'
// Emblem canvases use an 8% side inset and expand vertically to remain square.
export const LOGO_BACKGROUND_PADDING_RATIO = 0.08
export const LOGO_BORDER_RADIUS_RATIO = 0.06
const HORIZONTAL_LOGO_BACKGROUND_PADDING_RATIO = 0.12
const HORIZONTAL_LOGO_BORDER_RADIUS_RATIO = 0.1

export const logoColours = [
  { id: 'gold', name: 'Gold', hex: '#9A8F65' },
  { id: 'olive', name: 'Olive', hex: '#6A7059' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' }
] as const satisfies readonly LogoColourOption[]

export const logoBackgrounds = [
  { id: 'transparent', name: 'Transparent', hex: null },
  { id: 'gold', name: 'Gold', hex: '#9A8F65' },
  { id: 'olive', name: 'Olive', hex: '#6A7059' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' }
] as const satisfies readonly LogoBackgroundOption[]

const isGoldOrOliveColour = (colour: LogoColourId) =>
  colour === 'gold' || colour === 'olive'

export const isLogoColourCombinationAllowed = ({
  background,
  foreground
}: {
  background: LogoBackgroundId
  foreground: LogoColourId
}) => {
  if (background === 'transparent') return true
  if (background === foreground) return false

  if (isGoldOrOliveColour(background)) return foreground === 'white'
  if (background === 'black' && isGoldOrOliveColour(foreground)) return false

  return true
}

export const brandLogoDesigns = [
  {
    id: 'horizontal',
    name: 'Horizontal logo',
    description:
      'The complete wordmark and emblem for website headers, documents, and presentations.',
    alt: 'The Grand Collection horizontal logo',
    sourceViewBox: [0, 0, 77.635406, 15.205579],
    sizes: [
      {
        id: 'small',
        name: 'Small',
        width: 500,
        height: 98,
        useCase: 'Email signatures and documents'
      },
      {
        id: 'medium',
        name: 'Medium',
        width: 1000,
        height: 196,
        useCase: 'Websites and social media'
      },
      {
        id: 'large',
        name: 'Large',
        width: 2000,
        height: 392,
        useCase: 'Presentations and general print'
      },
      {
        id: 'xlarge',
        name: 'Extra large',
        width: 4000,
        height: 784,
        useCase: 'High-resolution and large-format use'
      }
    ]
  },
  {
    id: 'emblem',
    name: 'Emblem',
    description:
      'The compact brand mark for avatars, social profiles, and space-constrained layouts.',
    alt: 'The Grand Collection emblem',
    sourceViewBox: [0, 0, 21.414789, 15.311388],
    sizes: [
      {
        id: 'small',
        name: 'Small',
        width: 256,
        height: 183,
        useCase: 'Profile images and compact digital use'
      },
      {
        id: 'medium',
        name: 'Medium',
        width: 512,
        height: 366,
        useCase: 'Websites and social media'
      },
      {
        id: 'large',
        name: 'Large',
        width: 1024,
        height: 732,
        useCase: 'Presentations and general print'
      },
      {
        id: 'xlarge',
        name: 'Extra large',
        width: 2048,
        height: 1464,
        useCase: 'High-resolution and large-format use'
      }
    ]
  }
] as const satisfies readonly BrandLogoDesign[]

export const buildLogoFilename = ({
  background,
  format,
  foreground,
  logo,
  rounded,
  size
}: {
  background: LogoBackgroundId
  format: LogoDownloadFormat
  foreground: LogoColourId
  logo: LogoDesignId
  rounded: boolean
  size: LogoSizeId
}) => {
  const sizeSegment = format === 'svg' ? '' : `-${size}`
  const roundedSegment = rounded ? '-rounded' : ''

  return `tgc-${logo}-${foreground}-${background}${roundedSegment}${sizeSegment}.${format}`
}

export type LogoCanvas = {
  x: number
  y: number
  width: number
  height: number
  radius: number
}

export const getLogoCanvas = ({
  background,
  design
}: {
  background: LogoBackgroundId
  design: BrandLogoDesign
}): LogoCanvas => {
  const [x, y, width, height] = design.sourceViewBox

  if (background === 'transparent') {
    return { x, y, width, height, radius: 0 }
  }

  const paddingRatio =
    design.id === 'horizontal'
      ? HORIZONTAL_LOGO_BACKGROUND_PADDING_RATIO
      : LOGO_BACKGROUND_PADDING_RATIO
  const radiusRatio =
    design.id === 'horizontal'
      ? HORIZONTAL_LOGO_BORDER_RADIUS_RATIO
      : LOGO_BORDER_RADIUS_RATIO
  const contentScale = 1 - paddingRatio * 2
  const padding = (height * paddingRatio) / contentScale
  const canvasWidth =
    design.id === 'emblem' ? width / contentScale : width + padding * 2
  const canvasHeight =
    design.id === 'emblem' ? canvasWidth : height + padding * 2

  return {
    x: x - (canvasWidth - width) / 2,
    y: y - (canvasHeight - height) / 2,
    width: canvasWidth,
    height: canvasHeight,
    radius: Math.min(canvasWidth, canvasHeight) * radiusRatio
  }
}

export const getLogoOutputSize = ({
  background,
  design,
  size
}: {
  background: LogoBackgroundId
  design: BrandLogoDesign
  size: LogoSizeOption
}) => {
  if (background === 'transparent') {
    return { width: size.width, height: size.height }
  }

  const canvas = getLogoCanvas({ background, design })

  return {
    width: size.width,
    height: Math.round(size.width * (canvas.height / canvas.width))
  }
}

export const brandColours = [
  { name: 'Gold', hex: '#9A8F65', foreground: 'light' },
  { name: 'Olive', hex: '#6A7059', foreground: 'light' },
  { name: 'Sage', hex: '#537974', foreground: 'light' },
  { name: 'Black', hex: '#000000', foreground: 'light' },
  { name: 'White', hex: '#FFFFFF', foreground: 'dark' }
] as const satisfies readonly BrandColour[]

export const brandFontWeights = [300, 400, 500, 600, 700, 800] as const
