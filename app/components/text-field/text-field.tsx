import React, { useState } from "react"
import { Pressable, StyleProp, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { TextInput } from 'react-native-paper';
import { color, spacing } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { s, ms } from "react-native-size-matters"
import { images } from "../../assets/images"

// the base styling for the container
const CONTAINER: ViewStyle = {
  marginVertical: spacing[3],
}
const WRAP_INPUT: ViewStyle = {
  flexDirection: 'row',
  alignItems: "center",
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  flex: 1,
  fontFamily:'Inter-Medium',
  color: color.palette.black,
  fontSize: ms(14),
  backgroundColor: color.background
}

const ERROR: TextStyle = {
  fontFamily: 'Inter-Medium',
  color: color.palette.angry,
  fontSize: ms(12),
  marginTop: s(10),
  position: "absolute",
  top: s(-7)
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {

  placeholderTx?: TxKeyPath

  placeholder?: string

  labelTx?: TxKeyPath

  errorTx?: TxKeyPath

  label?: string

  style?: StyleProp<ViewStyle>

  inputStyle?: StyleProp<TextStyle>

  errorStyle?: StyleProp<TextStyle>

  preset?: keyof typeof PRESETS

  forwardedRef?: any

  errorMessage?: string

  showIcon?:boolean

  multiline?:boolean
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
    inputStyle: inputStyleOverride,
    errorStyle: errorStyleOverride,
    forwardedRef,
    errorMessage,
    multiline,
    showIcon = false,
    ...rest
  } = props
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const errorMessageStyles = [ERROR, errorStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
  const actualLabel = labelTx ? translate(labelTx) : label

  const _handleShowPass = ()=> {
    setShowPassword(!showPassword)
  }

  return (
    <View style={containerStyles}>
      <View style={WRAP_INPUT}>
        <TextInput
          label={actualLabel ?? ''}
          mode={'outlined'}
          placeholder={actualPlaceholder ?? ''}
          secureTextEntry={showIcon ? showPassword : false}
          {...rest}
          multiline={multiline}
          style={inputStyles}
          ref={forwardedRef}
          right={showIcon &&
          <TextInput.Icon
            name={showPassword ? images.close_eye : images.open_eye}
            onPress={_handleShowPass}
          />}
          error={!!errorMessage}
          activeOutlineColor={color.palette.blue}
        />
      </View>
      <View>
        {!!errorMessage &&  <Text tx={errorTx} text={errorMessage} style={errorMessage ? errorMessageStyles : null}/>}
      </View>
    </View>
  )
}
