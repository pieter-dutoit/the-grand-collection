import '@/app/globals.css';

// import { SpeedInsights } from '@vercel/speed-insights/next';

import { redhat } from '@/fonts/index';
// import { Navbar } from '@/ui/navbar';
// import { Footer } from '@/ui/footer';

export const metadata = {
  title: 'The Grand Collection',
  description: 'A collection of grand things.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${redhat.variable} scroll-smooth antialiased`}
    >
      <body>
        <h1 className='text-3xl text-olive-400'>{metadata.title}</h1>
        <p>{metadata.description}</p>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
