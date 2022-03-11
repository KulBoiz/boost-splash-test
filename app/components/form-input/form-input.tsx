import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { TextField, TextFieldProps } from "../text-field/text-field"
import { Controller, UseControllerProps } from "react-hook-form"
import { Control } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"

export interface FormInputProps extends TextFieldProps, UseControllerProps{
  name: string,
  label?: string,
  placeholder: string,
  control: Control<FieldValues, object>,
  error: string | undefined,
  style?: ViewStyle | any,
  defaultValue?: string,
  showIcon?: boolean
}

const FormInput = React.memo((props: FormInputProps) => {
  const {
    name,
    label,
    placeholder,
    control,
    error,
    style,
    rules,
    defaultValue,
    showIcon = false,
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
            label={label}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={error}
            showIcon={showIcon}
            {...rest}
          />
        )}
      />
    </View>
  )
});

export default FormInput;

const styles = StyleSheet.create({
    container: {},
});
