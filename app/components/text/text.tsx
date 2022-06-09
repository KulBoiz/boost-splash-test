import * as React from "react"
import { Text as ReactNativeText, ITextProps } from "native-base"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export const Text = (props: TextProps & ITextProps) => {
  // grab the props
  const { tx, txOptions, text, children, ...rest } = props

  // figure out which content to use
  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  return <ReactNativeText {...rest}>{content}</ReactNativeText>
}
