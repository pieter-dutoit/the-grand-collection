import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
import type { ColorScale } from "@nextui-org/theme";

const STATUS_COLORS: Record<string, ColorScale> = {
  success: {
    50: "#f3f8f4",
    100: "#e5f1e8",
    200: "#c8e3cd",
    300: "#aad5b2",
    400: "#8dc898",
    500: "#70ba7e",
    600: "#569462",
    700: "#3e6f48",
    800: "#26592f",
    900: "#113416",
    DEFAULT: "#569462",
    foreground: "#f3f8f4"
  },
  warning: {
    50: "#fef9f3",
    100: "#fcf0e0",
    200: "#f9dcb4",
    300: "#f6c787",
    400: "#f2b25a",
    500: "#ee9d2e",
    600: "#c37e23",
    700: "#99621b",
    800: "#6f4712",
    900: "#472d0a",
    DEFAULT: "#ee9d2e",
    foreground: "#fef9f3"
  },
  danger: {
    50: "#fdf6f5",
    100: "#f9e6e4",
    200: "#f3c7c3",
    300: "#edaaa2",
    400: "#e68c82",
    500: "#df6e61",
    600: "#b4584d",
    700: "#8a4239",
    800: "#5f2c26",
    900: "#361713",
    DEFAULT: "#df6e61",
    foreground: "#fdf6f5"
  }
};

const LIGHT_THEME = {
  colors: {
    default: {
      50: "#f3f4f1",
      100: "#e7e8e3",
      200: "#cfd1c7",
      300: "#b7baab",
      400: "#9fa38f",
      500: "#878c73",
      600: "#6c705c",
      700: "#515445",
      800: "#36382e",
      900: "#1b1c17",
      DEFAULT: "#9fa38f",
      foreground: "#1b1c17"
    } as ColorScale,
    primary: {
      50: "#f5f4f0",
      100: "#ebe9e0",
      200: "#d7d2c1",
      300: "#c3bca2",
      400: "#aea584",
      500: "#9a8f65",
      600: "#7b7251",
      700: "#5d563c",
      800: "#3e3928",
      900: "#1f1d14",
      DEFAULT: "#9a8f65",
      foreground: "#f5f4f0"
    } as ColorScale,
    secondary: {
      50: "#f0f5f4",
      100: "#e1eae9",
      200: "#c2d6d3",
      300: "#a4c1bd",
      400: "#86aca7",
      500: "#679891",
      600: "#537974",
      700: "#3e5b57",
      800: "#293d3a",
      900: "#151e1d",
      DEFAULT: "#537974",
      foreground: "#f0f5f4"
    } as ColorScale,
    background: {
      50: "#f3f3f1",
      100: "#e8e8e3",
      200: "#d0d0c8",
      300: "#b9b9ac",
      400: "#a1a191",
      500: "#8a8a75",
      600: "#6e6e5e",
      700: "#535346",
      800: "#37372f",
      900: "#1c1c17",
      DEFAULT: "#f3f3f1",
      foreground: "#37372f"
    } as ColorScale,
    foreground: {
      50: "#f2f2f2",
      100: "#e6e6e6",
      200: "#cccccc",
      300: "#b3b3b3",
      400: "#999999",
      500: "#808080",
      600: "#666666",
      700: "#4d4d4d",
      800: "#333333",
      900: "#1a1a1a",
      DEFAULT: "#4d4d4d",
      foreground: "#e6e6e6"
    } as ColorScale,
    ...STATUS_COLORS
  }
};

const DARK_THEME = {
  colors: {
    default: {
      50: "#0e0e0b",
      100: "#1b1c17",
      200: "#36382e",
      300: "#515445",
      400: "#6c705c",
      500: "#878c73",
      600: "#9fa38f",
      700: "#b7baab",
      800: "#cfd1c7",
      900: "#e7e8e3",
      DEFAULT: "#9fa38f",
      foreground: "#e7e8e3"
    } as ColorScale,
    primary: {
      50: "#0f0e0a",
      100: "#1f1d14",
      200: "#3e3928",
      300: "#5d563c",
      400: "#7b7251",
      500: "#9a8f65",
      600: "#aea584",
      700: "#c3bca2",
      800: "#d7d2c1",
      900: "#ebe9e0",
      DEFAULT: "#9a8f65",
      foreground: "#ebe9e0"
    } as ColorScale,
    secondary: {
      50: "#0a0f0f",
      100: "#151e1d",
      200: "#293d3a",
      300: "#3e5b57",
      400: "#537974",
      500: "#679891",
      600: "#86aca7",
      700: "#a4c1bd",
      800: "#c2d6d3",
      900: "#e1eae9",
      DEFAULT: "#679891",
      foreground: "#f0f5f4"
    } as ColorScale,
    background: {
      50: "#0e0e0c",
      100: "#1c1c17",
      200: "#37372f",
      300: "#535346",
      400: "#6e6e5e",
      500: "#8a8a75",
      600: "#a1a191",
      700: "#b9b9ac",
      800: "#d0d0c8",
      900: "#e8e8e3",
      DEFAULT: "#0e0e0c",
      foreground: "#d0d0c8"
    } as ColorScale,
    foreground: {
      50: "#0d0d0d",
      100: "#1a1a1a",
      200: "#333333",
      300: "#4d4d4d",
      400: "#666666",
      500: "#808080",
      600: "#999999",
      700: "#b3b3b3",
      800: "#cccccc",
      900: "#e6e6e6",
      DEFAULT: "#f2f2f2",
      foreground: "#1a1a1a"
    } as ColorScale,
    ...STATUS_COLORS
  }
};

const config: Config = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#1b1c17"
      }
    }
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: LIGHT_THEME,
        dark: DARK_THEME
      }
    })
  ]
};
export default config;
