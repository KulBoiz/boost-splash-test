import React from "react"
import { View, ViewStyle } from "react-native"
import { Controller, UseControllerProps } from "react-hook-form"
import { Control, UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import ItemPicker from "./item-picker"
import { translate, TxKeyPath } from "../../i18n"
import { ScaledSheet } from "react-native-size-matters"

interface DataProps {
  value: string
  label: string
}
export interface FormItemPickerProps extends UseControllerProps {
  name: string
  label?: string
  labelTx?: any
  placeholder?: string
  placeholderTx?: any
  control: Control
  setValue: UseFormSetValue<FieldValues>
  clearErrors?: UseFormClearErrors<FieldValues>;
  error: string | undefined
  style?: ViewStyle | any
  defaultValue?: string
  data: Array<DataProps>
  handleSelect?: any
  onChangeSearchText?: any
  disable?: boolean
}

const FormItemPicker = React.memo((props: FormItemPickerProps) => {
  const {
    name,
    label,
    labelTx,
    placeholder,
    placeholderTx,
    control,
    error,
    style,
    defaultValue,
    rules,
    setValue,
    handleSelect,
    clearErrors,
    data = [{ value: "", label: "" }],
    onChangeSearchText,
    disable = false
  } = props
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
  const actualLabel = labelTx ? translate(labelTx) : label
  return (
    <View style={[styles.container, style]}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, value, ref } }) => (
          <ItemPicker
            {...{
              value,
              setValue,
              name,
              errorMessage: error,
              label: actualLabel,
              placeholder: actualPlaceholder,
              data,
              handleSelect,
              onChangeSearchText,
              clearErrors,
              disable
            }}
          />
        )}
      />
    </View>
  )
})

export default FormItemPicker

const styles = ScaledSheet.create({
  container: {},
})
