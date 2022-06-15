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
        normal: "Inter-Thin",
      },
      200: {
        normal: "Inter-Thin",
      },
      300: {
        normal: "Inter-Light",
      },
      400: {
        normal: "Inter-Regular",
      },
      500: {
        normal: "Inter-Medium",
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
    initialColorMode: "light",
  },
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
        borderRadius: 8,
        height: 51,
        _text: { fontWeight: "600", fontSize: 16 },
      },
      defaultProps: {
        colorScheme: "transparent",
      },
    },
    Text: {
      baseStyle: {
        color: "black",
      },
      // defaultProps: {
      //   size: "lg",
      // },
      sizes: {
        medium12: {
          fontSize: 12,
          linHeight: 17,
          fontWeight: "500",
        },
        semiBold12: {
          fontSize: 12,
          linHeight: 17,
          fontWeight: "600",
        },
        semiBold14: {
          fontSize: 14,
          linHeight: 20,
          fontWeight: "600",
        },
        bold14: {
          fontSize: 14,
          linHeight: 20,
          fontWeight: "700",
        },
      },
    },
  },
})
