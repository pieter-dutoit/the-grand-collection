import '@/app/globals.css'
import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { playball, redhat } from '@/fonts/index'

import Navbar from '@/app/(frontend)/components/layout/navbar'
import Footer from '@/app/(frontend)/components/layout/footer'

import { fetchHomePageData } from '@/lib/data'
import createMetadataConfig from '@/lib/utils/create-metadata-object'

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await fetchHomePageData('seo')

  if (!seo) return {}

  return createMetadataConfig(seo)
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${redhat.variable} ${playball.variable} scroll-smooth antialiased`}
    >
      <body>
        <Navbar />
        <main>
          {children}
          <Footer />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
