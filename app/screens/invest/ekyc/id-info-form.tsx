import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Control, UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../components/form-input/form-input"
import { GENDER } from "../../../constants/gender"
import FormItemPicker from "../../../components/form-item-picker"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const IdInfoForm = React.memo((props: Props) => {
  const {control, errors, setValue, clearErrors} = props

  return (
    <View style={styles.container}>
      <FormInput
        {...{
          required: true,
          name: 'fullName',
          labelTx: 'label.fullName',
          placeholderTx: 'placeholder.fullName',
          control,
          error: errors?.fullName?.message,
        }}
      />
      <FormItemPicker
        {...{
          required: true,
          name: "gender",
          label: "Giới tính",
          placeholder: "Chọn giới tính",
          control,
          setValue,
          error: errors?.gender?.message,
          data: GENDER,
          clearErrors
        }}
      />
    </View>
  )
});

export default IdInfoForm;

const styles = StyleSheet.create({
    container: {},
});
