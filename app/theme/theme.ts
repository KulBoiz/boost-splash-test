import { extendTheme } from "native-base"
import { palette } from "./palette"

export const theme = extendTheme({
  colors: {
    primary: palette.blue,
    ...palette,
  },
  fontConfig: {
    SFProDisplay: {
      100: {
        normal: "SF-Pro-Display-Light",
      },
      200: {
        normal: "SF-Pro-Display-Thin",
      },
      300: {
        normal: "SF-Pro-Display-Thin",
      },
      400: {
        normal: "SF-Pro-Display-Regular",
      },
      500: {
        normal: "SF-Pro-Display-Medium",
      },
      600: {
        normal: "SF-Pro-Display-SemiBold",
      },
      700: {
        normal: "SF-Pro-Display-Bold",
      },
      800: {
        normal: "SF-Pro-Display-Bold",
      },
      900: {
        normal: "SF-Pro-Display-Bold",
      },
    },
    Mulish: {
      700: {
        normal: "Mulish-Bold",
      },
    },
  },
  fonts: {
    heading: "SF-Pro-Display",
    body: "SF-Pro-Display",
    mono: "SF-Pro-Display",
    button: "SF-Pro-Display",
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
