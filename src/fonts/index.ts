import localFont from "next/font/local";

export const redhat = localFont({
  src: [
    {
      path: "./RedHatDisplay-VariableFont_wght.ttf",
    },
    {
      path: "./RedHatDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-redhat",
  display: "swap",
  preload: true,
});
