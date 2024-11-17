import localFont from "next/font/local";

export const redhat = localFont({
  src: [
    {
      path: "./RedHatDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./RedHatDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
});
