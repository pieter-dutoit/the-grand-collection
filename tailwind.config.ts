import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      // themes: {
      //   light: {
      //     layout: {},
      //     colors: {},
      //   },
      //   dark: {
      //     layout: {},
      //     colors: {},
      //   },
      // },
    }),
  ],
};
export default config;
