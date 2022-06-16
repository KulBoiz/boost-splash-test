import React from "react"
import { StyleSheet, Text, TextProps } from "react-native"
import type { FontWeight } from "react-native-svg"
import { ms } from "react-native-size-matters"
import { color } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import i18n from "i18n-js"

export type AppTextProps = {
  value?: string | number | TxKeyPath
  fontSize?: number
  color?: string
  fontWeight?: FontWeight
  underline?: boolean
  capitalize?: boolean
  tx?: TxKeyPath
  txOptions?: i18n.TranslateOptions
  fontFamily?: FontFamily
} & TextProps

export type FontFamily =
  | "SF-Pro-Display-Bold"
  | "SF-Pro-Display-Medium"
  | "SF-Pro-Display-Regular"
  | "SF-Pro-Display-SemiBold"
  | "SF-Pro-Display-Thin"
  | "SF-Pro-Display-Light"

const defaultProps: Partial<AppTextProps> = {
  fontSize: ms(13),
  color: color.palette.black,
  fontFamily: "SF-Pro-Display-Regular",
}

// eslint-disable-next-line react/display-name
export const AppText: React.SFC<AppTextProps> = React.memo(
  ({
    tx,
    txOptions,
    children,
    color,
    value,
    fontWeight,
    fontSize,
    underline,
    capitalize,
    fontFamily,
    ...props
  }) => {
    const i18nText = tx && translate(tx, txOptions)
    const content = i18nText || children
    return (
      <Text
        {...props}
        style={StyleSheet.flatten([
          {
            fontFamily,
            fontSize,
            color,
          },
          props.style,
          underline && { textDecorationLine: "underline" },
          capitalize && { textTransform: "capitalize" },
        ])}
      >
        {content || value}
      </Text>
    )
  },
)

AppText.defaultProps = defaultProps
