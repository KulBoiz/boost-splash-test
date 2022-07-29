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

interface Props{
  control: Control
  setValue: UseFormSetValue<FieldValues>
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}

const UserForm = React.memo((props: Props) => {
  const {control, setValue, errors, clearErrors } = props
  return (
    <View style={styles.container}>
      <FormInput
        {...{
          name: "fullName",
          labelTx: "label.fullName",
          placeholderTx: "placeholder.insurance.fullName",
          control,
          error: errors?.fullName?.message,
          editable: false,
        }}
      />

      <FormInput
        {...{
          name: "email",
          labelTx: "label.email",
          placeholderTx: "placeholder.insurance.fullName",
          control,
          error: errors?.fullName?.message,
          editable: false,
        }}
      />

      <FormInput
        {...{
          name: "phone",
          labelTx: "label.phoneNumber",
          placeholderTx: "placeholder.insurance.fullName",
          control,
          error: errors?.fullName?.message,
          editable: false,
        }}
      />

      <FormDatePicker
        {...{
          clearErrors,
          name: "dateOfBirth",
          labelTx: "placeholder.insurance.dateOfBirth",
          placeholderTx: "placeholder.insurance.dateOfBirth",
          setValue: setValue,
          control,
          error: errors?.dateOfBirth?.message,
        }}
      />
    </View>
  )
});

export default UserForm;

const styles = StyleSheet.create({
    container: {},
});
