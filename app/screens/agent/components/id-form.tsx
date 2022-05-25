import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Control, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../components/form-input/form-input"
import FormItemPicker from "../../../components/form-item-picker"
import { ScaledSheet } from "react-native-size-matters"
import FormDatePicker from "../../../components/form-date-time"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const IdForm = React.memo((props: Props) => {
  const {control, errors ,setValue} = props
  return (
    <View style={styles.container}>
      <FormInput
        {...{
          name: 'fullName',
          labelTx: 'label.fullName',
          placeholderTx: 'placeholder.fullName',
          control,
          error: errors?.email?.message
        }}
      />
      <FormInput
        {...{
          name: 'phone',
          labelTx: 'label.phoneNumber',
          placeholderTx: 'placeholder.phone',
          control,
          keyboardType: 'number-pad',
          error: errors?.phone?.message
        }}
      />
      <FormDatePicker
        label={'Ngày cấp'}
        name={'dateRange'}
        placeholder={'Ngày cấp'}
        setValue={setValue}
        control={control}
        error={errors?.phone?.dateRange}
      />
      <FormInput
        {...{
          name: 'issuedBy',
          labelTx: 'label.issuedBy',
          placeholderTx: 'placeholder.issuedBy',
          control,
          error: errors?.phone?.message
        }}
      />

    </View>
  )
});

export default IdForm;

const styles = ScaledSheet.create({
  container: {
  },
});