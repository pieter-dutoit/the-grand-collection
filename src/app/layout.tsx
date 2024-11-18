import "@/styles/globals.css";

import type { Metadata } from "next";

import { NavBar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/config/theme-provider";
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
