import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { IconTypes } from "../icon/icons"
import { TxKeyPath } from "../../i18n"

export interface HeaderProps {
  /**
   * Main header, e.g. POWERED BY IGNITE
   */
  headerTx?: TxKeyPath

  /**
   * header non-i18n
   */
  headerText?: string

  /**
   * Icon that should appear on the left
   */
  leftIcon?: IconTypes

  renderLeftIcon?: JSX.Element

  /**
   * What happens when you press the left icon
   */
  onLeftPress?(): void

  /**
   * Icon that should appear on the right
   */
  rightIcon?: IconTypes

  renderRightIcon?: JSX.Element


  /**
   * What happens when you press the right icon
   */
  onRightPress?(): void

  /**
   * Container style overrides.
   */
  style?: StyleProp<ViewStyle> | any

  /**
   * Title style overrides.
   */
  titleStyle?: StyleProp<TextStyle>
}
