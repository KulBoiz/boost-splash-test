import { TextStyle } from "react-native"
import { color, typography } from "../theme"
import {s} from 'react-native-size-matters'

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { fontWeight: "700" } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: s(44), fontWeight: "700", color: color.lightBlack } as TextStyle,
  secondary: { ...BASE, fontSize: s(18), color: color.lightBlack, lineHeight: s(25) } as TextStyle,
  boldContent: {...BASE, fontWeight: '700', fontSize: s(18)} as TextStyle,
  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,
  note: { ...BASE, fontSize: s(12), color: color.palette.gray,lineHeight: s(15) } as TextStyle,

  /**
   * A smaller piece of secondary information.
   */
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
