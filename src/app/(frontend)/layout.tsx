import '@/app/globals.css'

// import { SpeedInsights } from '@vercel/speed-insights/next';

import { redhat } from '@/fonts/index'

import Navbar from '@/components/layout/navbar'

// import { Footer } from '@/ui/footer';

export const metadata = {
  title: 'The Grand Collection',
  description: 'A collection of grand things.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${redhat.variable} scroll-smooth antialiased`}>
      <body>
        <Navbar />
        {children}
        {/* <Footer /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  )
}
