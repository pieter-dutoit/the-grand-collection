import type { Metadata } from "next";
import Head from "next/head";

import NavBar from "@/components/ui/navbar";

import { ThemeProvider } from "@/components/theme-provider";

import { redhat } from "@/fonts/index";

export const metadata: Metadata = {
  title: "The Grand Collection",
  description: "A collection of grand things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${redhat.className} antialiased`}
      suppressHydrationWarning
    >
      <Head>
        <link
          rel='preload'
          href='/fonts/RedHatDisplay-VariableFont_wght.ttf'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
      </Head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
