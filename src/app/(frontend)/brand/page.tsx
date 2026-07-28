import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'

import SectionHeading from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  brandColours,
  brandFontWeights,
  brandLogoDesigns
} from './components/brand-data'
import CopyColourCard from './components/copy-colour-card'
import LogoConfiguratorCard from './components/logo-configurator-card'

export const metadata: Metadata = {
  title: {
    absolute: 'Brand Resources | The Grand Collection'
  },
  description:
    'Official logos, colours, and typography resources for The Grand Collection.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true
    }
  }
}

export default function BrandPage() {
  return (
    <>
      <section className='bg-olive-950 text-white'>
        <div className='container mx-auto flex min-h-80 flex-col justify-center gap-4 py-16 sm:py-20 lg:min-h-96'>
          <p className='text-gold-300 text-sm font-bold tracking-[0.18em] uppercase'>
            The Grand Collection
          </p>
          <h1 className='max-w-4xl text-4xl leading-tight font-semibold text-balance sm:text-5xl lg:text-6xl'>
            Brand Resources
          </h1>
          <p className='max-w-2xl text-base leading-relaxed text-olive-100 sm:text-lg'>
            Official logos, colours, and typography for representing The Grand
            Collection consistently.
          </p>
        </div>
      </section>

      <section
        className='border-y border-olive-200 bg-olive-50/70'
        aria-labelledby='colours-heading'
      >
        <div className='container mx-auto py-16 sm:py-20'>
          <div id='colours-heading'>
            <SectionHeading
              title='Colours'
              parentLabel='Palette'
              description='Select a colour to copy its HEX value to your clipboard.'
              className='mb-8'
            />
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
            {brandColours.map((colour) => (
              <CopyColourCard key={colour.hex} {...colour} />
            ))}
          </div>
        </div>
      </section>

      <section
        className='container mx-auto py-16 sm:py-20'
        aria-labelledby='logos-heading'
      >
        <div id='logos-heading'>
          <SectionHeading
            title='Logos'
            parentLabel='Identity'
            description='Configure the colour, background, and size, then choose the format you need.'
            className='mb-8'
          />
        </div>

        <div className='flex flex-col gap-8'>
          {brandLogoDesigns.map((design, index) => (
            <LogoConfiguratorCard
              key={design.id}
              design={design}
              eager={index === 0}
            />
          ))}
        </div>
      </section>

      <section
        className='container mx-auto py-16 sm:py-20'
        aria-labelledby='typography-heading'
      >
        <div id='typography-heading'>
          <SectionHeading
            title='Typography'
            parentLabel='Primary typeface'
            description='Red Hat Display is used throughout The Grand Collection identity.'
            className='mb-8'
          />
        </div>

        <div className='overflow-hidden rounded-xl bg-olive-950 text-white shadow-sm'>
          <div className='grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end'>
            <div className='flex min-w-0 flex-col gap-6'>
              <div className='flex flex-col gap-2'>
                <p className='text-gold-300 text-sm font-bold tracking-[0.16em] uppercase'>
                  Red Hat Display
                </p>
                <p
                  className='text-5xl leading-none font-light text-balance break-words sm:text-6xl lg:text-7xl'
                  aria-label='Typography specimen: Grand stays, thoughtfully made'
                >
                  Grand stays, thoughtfully made.
                </p>
              </div>

              <p className='text-lg tracking-wide text-olive-200'>
                Aa Bb Cc Dd Ee Ff Gg · 0123456789
              </p>

              <div
                className='flex flex-wrap gap-2'
                aria-label='Available font weights'
              >
                {brandFontWeights.map((weight) => (
                  <Badge key={weight} variant='secondary'>
                    {weight}
                  </Badge>
                ))}
              </div>
            </div>

            <div className='flex flex-col items-start gap-4 lg:items-end'>
              <p className='max-w-xs text-sm leading-relaxed text-olive-200 lg:text-right'>
                Available through Google Fonts in weights 300 through 800.
              </p>
              <Button asChild colour='gold' size='lg'>
                <a
                  href='https://fonts.google.com/specimen/Red%2BHat%2BDisplay'
                  target='_blank'
                  rel='noreferrer'
                >
                  View and download font
                  <ExternalLink data-icon='inline-end' aria-hidden='true' />
                  <span className='sr-only'>
                    Red Hat Display on Google Fonts (opens in a new tab)
                  </span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
