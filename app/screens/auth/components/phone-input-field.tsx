import React from "react"
import {  StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing } from "../../../theme"
import { translate, TxKeyPath } from "../../../i18n"
import { s, ms } from "react-native-size-matters"
import { Text } from "../../../components"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}
const WRAP_INPUT: ViewStyle = {
  flexDirection: 'row',
  minHeight: s(40),
  backgroundColor: color.dim,
  borderRadius: s(8),
  alignItems: "center",
  paddingHorizontal: s(13)
}

const INPUT: TextStyle = {
  flex: 1,
  fontFamily: fontFamily.medium,
  color: color.palette.black,
  minHeight: s(40),
  fontSize: ms(14),
}
const LABEL: TextStyle = {
  fontFamily: fontFamily.semiBold,
  fontWeight: '500',
  color: color.palette.black,
  fontSize: ms(12),
  marginBottom: s(13)
}
const ERROR: TextStyle = {
  fontFamily: fontFamily.medium,
  color: color.palette.angry,
  fontSize: ms(13),
  marginTop: s(10)
}
const WRAP_PREFIX: ViewStyle = {
  borderRightWidth: 1,
    paddingRight: ms(10),
    borderColor: '#b0b0b0',
  marginRight: ms(10)
}
const PREFIX: TextStyle = {
  fontFamily: fontFamily.medium,
  color: color.palette.black,
  fontSize: ms(14),
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface PhoneInputFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  errorTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  labelStyle?: StyleProp<TextStyle>

  errorStyle?: StyleProp<TextStyle>

  prefix:string

  preset?: keyof typeof PRESETS

  forwardedRef?: any

  errorMessage?: string

}

/**
 * A component which has a label and an input together.
 */
export function PhoneInputFiled(props: PhoneInputFieldProps) {
  const {
    placeholderTx,
    placeholder,
    errorTx,
    labelTx,
    label,
    preset = "default",
    style: styleOverride,
    labelStyle: labelStyleOverride,
    inputStyle: inputStyleOverride,
    errorStyle: errorStyleOverride,
    forwardedRef,
    errorMessage,
    prefix,
    ...rest
  } = props

  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const labelStyles = [LABEL, labelStyleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const errorMessageStyles = [ERROR, errorStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  return (
    <View style={containerStyles}>
      {(label || labelTx) && <Text preset="fieldLabel" tx={labelTx} text={label} style={labelStyles}/>}
      <View style={WRAP_INPUT}>
        {!!prefix && <View style={WRAP_PREFIX}>
          <AppText value={`+${prefix}`} style={PREFIX}/>
        </View>}
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.placeholder}
          underlineColorAndroid={color.transparent}
          keyboardType={'number-pad'}
          {...rest}
          style={inputStyles}
          ref={forwardedRef}
        />
      </View>

      {!!errorMessage &&  <Text tx={errorTx} text={errorMessage} style={errorMessage ? errorMessageStyles : null}/>}
    </View>
  )
}
