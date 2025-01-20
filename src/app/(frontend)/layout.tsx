import '@/app/globals.css'

import { SpeedInsights } from '@vercel/speed-insights/next'

import { playball, redhat } from '@/fonts/index'

import Navbar from '@/app/(frontend)/components/layout/navbar'
import Footer from '@/app/(frontend)/components/layout/footer'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  // const { seo } = await fetchHomePageData('seo')

  // if (!seo) return {}

  return {}
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
