import '@/app/globals.css'
import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { playball, redhat } from '@/fonts/index'
import { GoogleTagManager } from '@next/third-parties/google'

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
  const enableAnalytics = process.env.NEXT_PUBLIC_ANALYTICS === 'true'
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID

  return (
    <html
      lang='en'
      className={`${redhat.variable} ${playball.variable} scroll-smooth antialiased`}
    >
      {enableAnalytics && (
        <>
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          <SpeedInsights />
        </>
      )}

      <body>
        <Navbar />
        <main>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
