import { extendTheme } from "native-base"
import { palette } from "./palette"

export const theme = extendTheme({
  colors: {
    primary: palette.blue,
    ...palette,
  },
  fontConfig: {
    Inter: {
      100: {
        normal: "Inter-Light",
      },
      200: {
        normal: "Inter-Thin",
      },
      300: {
        normal: "Inter-Thin",
      },
      400: {
        normal: "Inter-Regular",
      },
      500: {
        normal: "Inter-Regular",
      },
      600: {
        normal: "Inter-SemiBold",
      },
      700: {
        normal: "Inter-Bold",
      },
      800: {
        normal: "Inter-Bold",
      },
      900: {
        normal: "Inter-Bold",
      },
    },
    Montserrat: {
      700: {
        normal: "Mulish-Bold",
      },
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Inter",
    button: "Inter",
  },
  config: {
    initialColorMode: "dark",
  },
})
