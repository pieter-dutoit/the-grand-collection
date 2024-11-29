import "@/styles/globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "@/app/(frontend)/providers";
import { redhat } from "@/fonts/index";
import { Navbar } from "@/ui/navbar";
import { Footer } from "@/ui/footer";

export const metadata = {
  title: "The Grand Collection",
  description: "A collection of grand things."
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
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
