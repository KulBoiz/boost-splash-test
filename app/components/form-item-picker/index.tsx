import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { Controller, UseControllerProps } from "react-hook-form"
import { Control, UseFormSetValue } from "react-hook-form/dist/types/form"
import ItemPicker from "./item-picker"
import NewItemPicker from "./new-item-picker"
import { FieldValues } from "react-hook-form/dist/types/fields"

export interface FormItemPickerProps extends UseControllerProps{
  name: string,
  label?: string,
  placeholder?: string,
  control: Control,
  setValue: UseFormSetValue<FieldValues>,
  error: string,
  style?: ViewStyle | any,
  defaultValue?: string,
  data: any[]
}

const FormItemPicker = React.memo((props: FormItemPickerProps) => {
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
    data = [],
  } = props

  return (
    <View style={[styles.container, style]}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <NewItemPicker {...{
            setValue: setValue,
            value,
            name,
            errorMessage:error,
            label,
            placeholder,
            data
            }}
          />
        )}
      />
    </View>
  )
});

export default FormItemPicker;


const styles = StyleSheet.create({
  container: {},
});
