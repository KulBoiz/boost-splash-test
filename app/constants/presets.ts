import { TextStyle } from "react-native"
import { color } from "../theme"
import {s, ms} from 'react-native-size-matters'

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: 'Inter-Medium',
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
  bold: { fontFamily: 'Inter-Bold' } as TextStyle,

  /**
   * Large headers.
   */
  header: { ...BASE, fontSize: ms(44), fontWeight: "700", color: color.lightBlack } as TextStyle,
  secondary: { ...BASE, fontSize: ms(18), color: color.lightBlack, lineHeight: s(25), fontFamily: 'Inter-Regular' } as TextStyle,
  boldContent: {...BASE, fontWeight: '700', fontSize: ms(18)} as TextStyle,
  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: ms(13), color: color.dim } as TextStyle,
  note: { ...BASE, fontSize: ms(12), color: color.palette.gray,lineHeight: s(15) } as TextStyle,

  /**
   * A smaller piece of secondary information.
   */
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets
