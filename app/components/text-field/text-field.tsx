import React, { useState } from "react"
import { Keyboard, StyleProp, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { TextInput } from "react-native-paper"
import { color, spacing } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { s, ms } from "react-native-size-matters"
import { images } from "../../assets/images"
import { fontFamily } from "../../constants/font-family"
import { isIos } from "../../constants/variable"

// the base styling for the container
const CONTAINER: ViewStyle = {
  marginVertical: spacing[3],
}
const WRAP_INPUT: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const ICON: ViewStyle = {
  // marginTop: s(12),
  // width: s(25),
  // height: s(18),
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  flex: 1,
  fontFamily: fontFamily.medium,
  color: color.palette.black,
  fontSize: ms(13),
  backgroundColor: color.background,
  // height: isIos ? ms(44) : undefined,
  height: undefined,
}

const MULTILINE: TextStyle = {
  flex: 1,
  fontFamily: fontFamily.medium,
  color: color.palette.black,
  fontSize: ms(13),
  backgroundColor: color.background,
  minHeight: s(80),
  maxHeight: s(200),
}

const ERROR: TextStyle = {
  // position: "absolute",
  fontFamily: fontFamily.medium,
  color: color.palette.angry,
  fontSize: ms(12),
  // marginTop: 4,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {

  required?: boolean

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

  showIcon?: boolean

  multiline?: boolean
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
    multiline = false,
    showIcon = false,
    required = false,
    ...rest
  } = props
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const errorMessageStyles = [ERROR, errorStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
  const actualLabel = labelTx ? translate(labelTx) : label

  const _handleShowPass = React.useCallback(() => {
    setShowPassword(!showPassword)
  },[showPassword])

  return (
    <View style={containerStyles}>
      <View style={WRAP_INPUT}>
        <TextInput
          label={
            <Text style={{backgroundColor: color.background}}>
              {required && <Text color={color.palette.angry}>* </Text> }
              {actualLabel ?? ""}
            </Text>
           }
          // label={actualLabel ?? ""}
          underlineColor='#fff'
          theme={{colors: {text: color.palette.black, primary: 'transparent'}}}
          mode={"outlined"}
          placeholder={actualPlaceholder ?? ""}
          secureTextEntry={showIcon ? showPassword : false}
          {...rest}
          dense
          multiline={multiline}
          style={multiline ? MULTILINE : inputStyles}
          ref={forwardedRef}
          right={
            showIcon && (
              <TextInput.Icon
                name={showPassword ? images.close_eye : images.open_eye}
                onPress={_handleShowPass}
                style={ICON}
              />
            )
          }
          error={!!errorMessage}
          activeOutlineColor={color.palette.blue}
        />
      </View>
      <View>
        {!!errorMessage && (
          <Text tx={errorTx} text={errorMessage} style={errorMessage ? errorMessageStyles : null} />
        )}
      </View>
    </View>
  )
}
