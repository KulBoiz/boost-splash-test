import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { Controller, UseControllerProps } from "react-hook-form"
import { Control } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { TxKeyPath } from "../../../i18n"
import i18n from "i18n-js"
import { PhoneInputFieldProps, PhoneInputFiled } from "./phone-input-field"

export interface PhoneInputProps extends PhoneInputFieldProps, UseControllerProps{
  name: string,
  prefix: string,
  label?: string,
  placeholder?: string,
  placeholderTx?: TxKeyPath
  labelTx?: TxKeyPath
  txOptions?: i18n.TranslateOptions
  control: Control<FieldValues, any>,
  error: string | undefined,
  style?: ViewStyle | any,
  defaultValue?: string,
  showIcon?: boolean
}

const PhoneInput = React.memo((props: PhoneInputProps) => {
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
    defaultValue,
    prefix,
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
          <PhoneInputFiled
            prefix={prefix}
            label={label}
            labelTx={labelTx}
            placeholder={placeholder}
            placeholderTx={placeholderTx}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={error}
            {...rest}
          />
        )}
      />
    </View>
  )
});

export default PhoneInput;

PhoneInput.displayName = 'FormInput'

const styles = StyleSheet.create({
    container: {},
});
