import React, { useState } from "react"
import { Pressable, StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { s, ms } from "react-native-size-matters"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { images } from "../../assets/images"

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
const PRESS : ViewStyle = {
  marginLeft: s(13),
}
const EYE : ImageStyle = {
  width: s(18),
  height: s(15)
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  flex: 1,
  fontFamily:'Inter-Medium',
  color: color.palette.black,
  minHeight: s(40),
  fontSize: ms(14),
}
const LABEL: TextStyle = {
  fontFamily: 'Inter-SemiBold',
  color: color.palette.black,
  fontSize: ms(12),
  marginBottom: s(13)
}
const ERROR: TextStyle = {
  fontFamily: 'Inter-Medium',
  color: color.palette.angry,
  fontSize: ms(13),
  marginTop: s(10)
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
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

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any

  errorMessage?: string

  showIcon?:boolean

}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
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
    showIcon = false,
    ...rest
  } = props
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const labelStyles = [LABEL, labelStyleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const errorMessageStyles = [ERROR, errorStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  const _handleShowPass = ()=> {
    setShowPassword(!showPassword)
  }

  return (
    <View style={containerStyles}>
      {(label || labelTx) && <Text preset="fieldLabel" tx={labelTx} text={label} style={labelStyles}/>}
      <View style={WRAP_INPUT}>
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.placeholder}
          underlineColorAndroid={color.transparent}
          secureTextEntry={showIcon ? showPassword : false}
          {...rest}
          style={inputStyles}
          ref={forwardedRef}
        />
        {showIcon &&
          <>{showPassword ?
            <Pressable onPress={_handleShowPass} style={PRESS}>
              <FastImage source={images.close_eye} style={EYE}/>
            </Pressable>
            :
            <Pressable onPress={_handleShowPass} style={PRESS}>
              <FastImage source={images.close_eye} style={EYE}/>
            </Pressable>}
          </>
        }
      </View>

      {!!errorMessage &&  <Text tx={errorTx} text={errorMessage} style={errorMessage ? errorMessageStyles : null}/>}
    </View>
  )
}
