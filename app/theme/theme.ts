import { extendTheme } from "native-base"
import { s } from "react-native-size-matters"
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
        regular12: {
          fontSize: 12,
          linHeight: 17,
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
