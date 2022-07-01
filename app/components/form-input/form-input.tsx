import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { TextField, TextFieldProps } from "../text-field/text-field"
import { Controller, UseControllerProps } from "react-hook-form"
import { Control } from "react-hook-form/dist/types/form"
import { TxKeyPath } from "../../i18n"
import i18n from "i18n-js"

export interface FormInputProps extends TextFieldProps, UseControllerProps {
  name: string
  label?: string
  placeholder?: string
  placeholderTx?: any
  labelTx?: any
  txOptions?: i18n.TranslateOptions
  control: Control
  error: string | undefined
  style?: ViewStyle | any
  defaultValue?: string
  showIcon?: boolean
  multiline?: boolean
}

const FormInput = React.memo((props: FormInputProps) => {
  const {
    name,
    label,
    labelTx,
    placeholder,
    placeholderTx,
    control,
    error,
    style,
    rules,
    defaultValue = "",
    showIcon = false,
    multiline,
    ...rest
  } = props

  return (
    <View style={[styles.container, style]}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <TextField
            forwardedRef={ref}
            label={label}
            labelTx={labelTx}
            placeholder={placeholder}
            placeholderTx={placeholderTx}
            onChangeText={onChange}
            onBlur={onBlur}
            style={style}
            value={value}
            multiline={multiline}
            errorMessage={error}
            showIcon={showIcon}
            {...rest}
          />
        )}
      />
    </View>
  )
})

export default FormInput

FormInput.displayName = "FormInput"

const styles = StyleSheet.create({
  container: {},
})
