import 'server-only'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import {
  brandLogoDesigns,
  getLogoCanvas,
  logoBackgrounds,
  logoColours,
  type LogoBackgroundId,
  type LogoColourId,
  type LogoDesignId
} from './brand-data'

const SOURCE_SVGS: Record<LogoDesignId, string> = {
  horizontal: readFileSync(
    join(process.cwd(), 'public/logos/tgc-horizontal-gold.svg'),
    'utf8'
  ),
  emblem: readFileSync(
    join(process.cwd(), 'public/logos/tgc-emblem-gold.svg'),
    'utf8'
  )
}

const SOURCE_GOLD = /#7d7151/gi
const INKSCAPE_PLACEHOLDER_FILL = /#ff00ff/gi
const FONT_STYLE_DECLARATIONS =
  /(?:font-size|font-family|-inkscape-font-specification|font-variation-settings):[^;"]+;?/gi

const extractCleanBody = (source: string) => {
  const svgStart = source.indexOf('<svg')
  const bodyStart = source.indexOf('>', svgStart) + 1
  const bodyEnd = source.lastIndexOf('</svg>')

  if (svgStart === -1 || bodyStart === 0 || bodyEnd === -1) {
    throw new Error('Invalid brand logo SVG source')
  }

  return source
    .slice(bodyStart, bodyEnd)
    .replace(/<defs\b[^>]*\/>/gi, '')
    .replace(/\s+id="[^"]*"/gi, '')
    .replace(FONT_STYLE_DECLARATIONS, '')
    .replace(INKSCAPE_PLACEHOLDER_FILL, 'none')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

const CLEAN_LOGO_BODIES: Record<LogoDesignId, string> = {
  horizontal: extractCleanBody(SOURCE_SVGS.horizontal),
  emblem: extractCleanBody(SOURCE_SVGS.emblem)
}

const getColourHex = (colour: LogoColourId) => {
  const option = logoColours.find(({ id }) => id === colour)

  if (!option) {
    throw new Error(`Unknown logo colour: ${colour}`)
  }

  return option.hex
}

const getBackgroundHex = (background: LogoBackgroundId) => {
  const option = logoBackgrounds.find(({ id }) => id === background)

  if (!option) {
    throw new Error(`Unknown logo background: ${background}`)
  }

  return option.hex
}

const getDesign = (logo: LogoDesignId) => {
  const design = brandLogoDesigns.find(({ id }) => id === logo)

  if (!design) {
    throw new Error(`Unknown logo design: ${logo}`)
  }

  return design
}

export const renderBrandLogoSvg = ({
  background,
  foreground,
  logo,
  rounded
}: {
  background: LogoBackgroundId
  foreground: LogoColourId
  logo: LogoDesignId
  rounded: boolean
}) => {
  const foregroundHex = getColourHex(foreground)
  const backgroundHex = getBackgroundHex(background)
  const canvas = getLogoCanvas({
    background,
    design: getDesign(logo)
  })
  const shouldRound = rounded && background !== 'transparent'
  const title =
    logo === 'horizontal'
      ? 'The Grand Collection horizontal logo'
      : 'The Grand Collection emblem'
  const backgroundRect = backgroundHex
    ? `<rect x="${canvas.x}" y="${canvas.y}" width="${canvas.width}" height="${canvas.height}" fill="${backgroundHex}"/>`
    : ''
  const artwork = CLEAN_LOGO_BODIES[logo].replace(SOURCE_GOLD, foregroundHex)
  const clipPath = shouldRound
    ? `<defs><clipPath id="logo-canvas-clip"><rect x="${canvas.x}" y="${canvas.y}" width="${canvas.width}" height="${canvas.height}" rx="${canvas.radius}"/></clipPath></defs>`
    : ''
  const content = shouldRound
    ? `<g clip-path="url(#logo-canvas-clip)">${backgroundRect}${artwork}</g>`
    : `${backgroundRect}${artwork}`

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${canvas.x} ${canvas.y} ${canvas.width} ${canvas.height}" role="img" aria-labelledby="logo-title" shape-rendering="geometricPrecision">`,
    `<title id="logo-title">${title}</title>`,
    clipPath,
    content,
    '</svg>'
  ].join('')
}
