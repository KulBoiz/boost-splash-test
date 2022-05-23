import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { Controller, UseControllerProps } from "react-hook-form"
import { Control } from "react-hook-form/dist/types/form"
import DatePicker from "./date-time-picker"

export interface FormItemPickerProps extends UseControllerProps{
  name: string,
  label?: string,
  placeholder?: string,
  control: Control,
  error: string,
  style?: ViewStyle | any,
  defaultValue?: string,
}

const FormDatePicker = React.memo((props: FormItemPickerProps) => {
  const {
    name,
    label,
    placeholder,
    control,
    error,
    style,
    defaultValue,
    rules,
  } = props

  return (
    <View style={[styles.container, style]}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <DatePicker {...{
            setValue: onChange,
            value,
            errorMessage:error,
            label,
            placeholder
            }}
          />
        )}
      />
    </View>
  )
});

export default FormDatePicker;


const styles = StyleSheet.create({
  container: {},
});
