import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { Controller, UseControllerProps } from "react-hook-form"
import { Control, UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import DatePicker from "./date-time-picker"
import { FieldValues } from "react-hook-form/dist/types/fields"

export interface FormItemPickerProps extends UseControllerProps {
  name: string
  label?: string
  placeholder?: string
  labelTx?: string
  placeholderTx?: string
  control: Control
  error: string
  style?: ViewStyle | any
  defaultValue?: string
  setValue?: UseFormSetValue<FieldValues>
  isMaximumDate?: boolean
  isMinimumDate?: boolean
  clearErrors?: UseFormClearErrors<FieldValues>;
  disable?: boolean,
  required?: boolean,

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
    setValue,
    isMaximumDate,
    isMinimumDate,
    labelTx,
    placeholderTx,
    clearErrors,
    required,
    disable
  } = props

  return (
    <View style={[styles.container, style]}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <DatePicker
            {...{
              name,
              setValue,
              value,
              errorMessage: error,
              label,
              required,
              placeholder,
              isMaximumDate,
              isMinimumDate,
              labelTx,
              placeholderTx,
              clearErrors,
              disable
            }}
          />
        )}
      />
    </View>
  )
})

export default FormDatePicker

const styles = StyleSheet.create({
  container: {},
})
