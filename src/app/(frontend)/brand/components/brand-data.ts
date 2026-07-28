export type BrandColour = {
  name: string
  hex: `#${string}`
  foreground: 'dark' | 'light'
}

export type LogoColourId = 'gold' | 'olive' | 'black' | 'white'
export type LogoBackgroundId = 'transparent' | LogoColourId
export type LogoDesignId = 'horizontal' | 'emblem'
export type LogoSizeId = 'small' | 'medium' | 'large' | 'xlarge'
export type LogoDownloadFormat = 'svg' | 'png' | 'jpeg'

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

export const LOGO_ASSET_VERSION = '1'

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
  size
}: {
  background: LogoBackgroundId
  format: LogoDownloadFormat
  foreground: LogoColourId
  logo: LogoDesignId
  size: LogoSizeId
}) => {
  const extension = format === 'jpeg' ? 'jpg' : format
  const sizeSegment = format === 'svg' ? '' : `-${size}`

  return `tgc-${logo}-${foreground}-${background}${sizeSegment}.${extension}`
}

export const brandColours = [
  { name: 'Gold', hex: '#9A8F65', foreground: 'light' },
  { name: 'Olive', hex: '#6A7059', foreground: 'light' },
  { name: 'Sage', hex: '#537974', foreground: 'light' },
  { name: 'Black', hex: '#000000', foreground: 'light' },
  { name: 'White', hex: '#FFFFFF', foreground: 'dark' }
] as const satisfies readonly BrandColour[]

export const brandFontWeights = [300, 400, 500, 600, 700, 800] as const
