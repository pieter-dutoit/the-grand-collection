import 'server-only'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import {
  brandLogoDesigns,
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

const LOGO_PADDING_RATIO = 0.03
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

const getPaddedViewBox = (logo: LogoDesignId) => {
  const design = brandLogoDesigns.find(({ id }) => id === logo)

  if (!design) {
    throw new Error(`Unknown logo design: ${logo}`)
  }

  const [x, y, width, height] = design.sourceViewBox
  const horizontalPadding = width * LOGO_PADDING_RATIO
  const verticalPadding = height * LOGO_PADDING_RATIO

  return {
    x: x - horizontalPadding,
    y: y - verticalPadding,
    width: width + horizontalPadding * 2,
    height: height + verticalPadding * 2
  }
}

export const renderBrandLogoSvg = ({
  background,
  foreground,
  logo
}: {
  background: LogoBackgroundId
  foreground: LogoColourId
  logo: LogoDesignId
}) => {
  const foregroundHex = getColourHex(foreground)
  const backgroundHex = getBackgroundHex(background)
  const viewBox = getPaddedViewBox(logo)
  const title =
    logo === 'horizontal'
      ? 'The Grand Collection horizontal logo'
      : 'The Grand Collection emblem'
  const backgroundRect = backgroundHex
    ? `<rect x="${viewBox.x}" y="${viewBox.y}" width="${viewBox.width}" height="${viewBox.height}" fill="${backgroundHex}"/>`
    : ''
  const artwork = CLEAN_LOGO_BODIES[logo].replace(SOURCE_GOLD, foregroundHex)

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}" role="img" aria-labelledby="logo-title" shape-rendering="geometricPrecision">`,
    `<title id="logo-title">${title}</title>`,
    backgroundRect,
    artwork,
    '</svg>'
  ].join('')
}
