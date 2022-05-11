import React, { useState } from "react"
import { Pressable, StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { s, ms } from "react-native-size-matters"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { images } from "../../assets/images"
import { ROW } from "../../styles/common-style"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}
const WRAPPER: ViewStyle = {
  borderWidth: 1,
  borderRadius: s(12),
  paddingHorizontal: ms(16),
  paddingVertical: ms(12),
  justifyContent: "center"
}
const WRAPPER_PADDING: ViewStyle = {
  borderWidth: 1,
  borderRadius: s(12),
  paddingHorizontal: ms(16),
  paddingVertical: ms(21),
  justifyContent: "center"
}
const WRAP_INPUT: ViewStyle = {
  flexDirection: 'row',
  alignItems: "center",
}
const PRESS : ViewStyle = {
  marginLeft: s(13),
}
const MULTILINE : ViewStyle = {
  paddingTop: s(12),
  minHeight: s(90),
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
  // minHeight: s(40),
  fontSize: ms(14),
}
const LABEL: TextStyle = {
  fontFamily: 'Inter-Medium',
  fontSize: ms(12),
  marginBottom: s(4),
  textTransform: 'capitalize'
}
const OPTIONAL: TextStyle = {
  fontFamily: 'Inter-Medium',
  color: color.palette.deepGray,
  fontSize: ms(12),
}
const ERROR: TextStyle = {
  fontFamily: 'Inter-Medium',
  color: color.palette.angry,
  fontSize: ms(13),
  marginTop: s(10)
}

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

  labelStyle?: StyleProp<TextStyle>

  errorStyle?: StyleProp<TextStyle>

  preset?: keyof typeof PRESETS

  forwardedRef?: any

  errorMessage?: string

  showIcon?:boolean

  isOptional?:boolean

  multiline?:boolean
}

export function NewTextField(props: TextFieldProps) {
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
    multiline,
    showIcon = false,
    isOptional = false,
    ...rest
  } = props
  const [showPassword, setShowPassword] = useState<boolean>(true)
  const containerStyles = [CONTAINER, PRESETS[preset], styleOverride]
  const optionalStyles = [OPTIONAL]
  const labelStyles = [LABEL, labelStyleOverride]
  const inputStyles = [INPUT, inputStyleOverride]
  const errorMessageStyles = [ERROR, errorStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder

  const _handleShowPass = ()=> {
    setShowPassword(!showPassword)
  }

  return (
    <View style={containerStyles}>
      <View style={[WRAPPER, {borderColor: !!errorMessage ? color.palette.angry : color.palette.blue}, !(label || labelTx || isOptional)? WRAPPER_PADDING : {}]}>
      <View style={ROW}>
        {(label || labelTx) &&
          <Text preset="fieldLabel" tx={labelTx} text={label}
                style={[{ color: !!errorMessage ? color.palette.angry : color.palette.blue }, labelStyles ]}/>
        }
        {isOptional && <Text text={' (Optional)'} style={optionalStyles}/>}
      </View>
      <View style={WRAP_INPUT}>
        <TextInput
          placeholder={actualPlaceholder}
          placeholderTextColor={color.placeholder}
          underlineColorAndroid={color.transparent}
          secureTextEntry={showIcon ? showPassword : false}
          {...rest}
          multiline={multiline}
          style={[inputStyles, multiline ? MULTILINE : {}]}
          textAlignVertical={multiline ? 'top' : "bottom"}
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
      </View>
      {!!errorMessage &&  <Text tx={errorTx} text={errorMessage} style={errorMessage ? errorMessageStyles : null}/>}
    </View>
  )
}
