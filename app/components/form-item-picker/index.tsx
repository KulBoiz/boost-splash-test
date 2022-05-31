import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { Controller, UseControllerProps } from "react-hook-form"
import { Control, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import ItemPicker from "./item-picker"

interface DataProps{
  value: string
  label:string
}
export interface FormItemPickerProps extends UseControllerProps{
  name: string,
  label?: string,
  placeholder?: string,
  control: Control,
  setValue: UseFormSetValue<FieldValues>,
  error: string,
  style?: ViewStyle | any,
  defaultValue?: string,
  data: Array<DataProps>,
  handleSelect?: any
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
    handleSelect,
    data = [{value: '', label: ''}],
  } = props

  return (
    <View style={[styles.container, style]}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <ItemPicker {...{
            value,
            setValue,
            name,
            errorMessage:error,
            label,
            placeholder,
            data,
            handleSelect
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
