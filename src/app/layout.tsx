import type { Metadata } from "next";

import { redhat } from "./fonts/index";

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
    <html lang='en'>
      <body className={`${redhat.className} antialiased`}>{children}</body>
    </html>
  );
}
