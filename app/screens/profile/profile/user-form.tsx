import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormInput from "../../../components/form-input/form-input"
import {
  Control,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import FormDatePicker from "../../../components/form-date-time"
import Vcf from "../advance-information/vcf"

interface Props{
  editable: boolean
  control: Control
  setValue: UseFormSetValue<FieldValues>
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}

const UserForm = React.memo((props: Props) => {
  const {control, setValue, errors, clearErrors, editable } = props
  return (
    <View style={styles.container}>
      <Vcf />
      <FormInput
        {...{
          name: "fullName",
          labelTx: "label.fullName",
          placeholderTx: "placeholder.insurance.fullName",
          control,
          error: errors?.fullName?.message,
          editable: editable,
        }}
      />

      <FormInput
        {...{
          name: "email",
          labelTx: "label.email",
          placeholderTx: "placeholder.email",
          control,
          error: errors?.email?.message,
          editable: editable,
        }}
      />

      <FormInput
        {...{
          name: "tel",
          labelTx: "label.phoneNumber",
          placeholderTx: "placeholder.phoneNumber",
          control,
          error: errors?.tel?.message,
          editable: editable,
        }}
      />

      <FormDatePicker
        {...{
          clearErrors,
          name: "birthday",
          labelTx: "placeholder.insurance.dateOfBirth",
          placeholderTx: "placeholder.insurance.dateOfBirth",
          setValue: setValue,
          control,
          disable: !editable,
          error: errors?.birthday?.message,
        }}
      />
    </View>
  )
});

export default UserForm;

const styles = StyleSheet.create({
    container: {},
});
