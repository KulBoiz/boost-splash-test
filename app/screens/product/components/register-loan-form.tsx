import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormInput from "../../../components/form-input/form-input"
import { Control } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
}

const RegisterLoanForm = React.memo((props: Props) => {
  const {control, errors} = props
  return (
    <View style={styles.container}>
      <FormInput
        {...{
          name: 'fullName',
          control,
          error: errors?.fullName?.message,
          label: 'Họ và tên người mua',
          placeholder: 'Nhập họ và tên'
        }}
      /><FormInput
      {...{
        name: 'email',
        control,
        error: errors?.email?.message,
        label: 'Địa chỉ Email',
        placeholderTx: 'placeholder.email',
        autoCapitalize: 'none',
      }}
    /><FormInput
      {...{
        name: 'phone',
        control,
        error: errors?.phone?.message,
        label: 'Số điện thoại',
        placeholderTx: 'placeholder.phone',
        keyboardType: 'number-pad'
      }}
    />
      {/* <ProductTypePicker value={type} setValue={setType} /> */}
      <FormInput
        {...{
          name: 'note',
          control,
          error: errors?.note?.message,
          label: 'Ghi chú',
          multiline: true
        }}
      />
    </View>
  )
});

export default RegisterLoanForm;

const styles = StyleSheet.create({
    container: {},
});
