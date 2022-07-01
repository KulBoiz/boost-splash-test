import { extendTheme } from "native-base"
import { s } from "react-native-size-matters"
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
    heading: "SFProDisplay",
    body: "SFProDisplay",
    mono: "SFProDisplay",
    button: "SFProDisplay",
  },
  config: {
    initialColorMode: "light",
  },
  components: {
    Button: {
      defaultProps: {
        bg: "primary",
        borderRadius: 8,
        height: 51,
        _text: { fontWeight: "600", fontSize: 16 },
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
        medium16: {
          fontSize: 16,
          linHeight: 22,
          fontWeight: "500",
        },
        regular12: {
          fontSize: 12,
          linHeight: 17,
          fontWeight: "400",
        },
        regular14: {
          fontSize: 14,
          fontWeight: "400",
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
    Checkbox: {
      defaultProps: {
        borderWidth: 1,
        borderColor: "#0F172A",
        bg: "white",
        borderRadius: 4,
        _checked: { borderColor: "primary", bg: "primary" },
        _text: { ml: "1", fontSize: 12, fontWeight: "400", color: "#0F172A" },
      },
    },
    Radio: {
      defaultProps: {
        borderWidth: 1,
        borderColor: "#0F172A",
        width: s(16),
        height: s(16),
        bg: "white",
        borderRadius: "full",
        _checked: { borderColor: "primary" },
        _text: { ml: "1", fontSize: 12, fontWeight: "400", color: "#0F172A" },
      },
    },
  },
})

type CustomThemeType = typeof theme
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
