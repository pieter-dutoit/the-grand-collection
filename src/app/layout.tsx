import "@/styles/globals.css";

import type { Metadata } from "next";

import { Providers } from "@/app/providers";
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
    <html lang='en' suppressHydrationWarning className={`${redhat.variable}`}>
      <body className='font-redhat antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
