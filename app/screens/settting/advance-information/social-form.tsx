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

const SocialForm = React.memo((props: Props) => {
  const {control, setValue, errors, clearErrors, editable } = props
  return (
    <View style={styles.container}>
      <FormInput
        {...{
          name: "facebook",
          label: "Facebook",
          placeholder: "Facebook",
          control,
          error: errors?.facebook?.message,
          editable: editable,
        }}
      />

      <FormInput
        {...{
          name: "zalo",
          label: "Zalo",
          placeholder: "Zalo",
          control,
          error: errors?.zalo?.message,
          editable: editable,
        }}
      />

      <FormInput
        {...{
          name: "linkedIn",
          label: "LinkedIn",
          placeholder: "LinkedIn",
          control,
          error: errors?.linkedIn?.message,
          editable: editable,
        }}
      />
      <FormInput
        {...{
          name: "twitter",
          label: "Twitter",
          placeholder: "Twitter",
          control,
          error: errors?.twitter?.message,
          editable: editable,
        }}
      />
      <FormInput
        {...{
          name: "telegram",
          label: "Telegram",
          placeholder: "Telegram",
          control,
          error: errors?.telegram?.message,
          editable: editable,
        }}
      />


    </View>
  )
});

export default SocialForm;

const styles = StyleSheet.create({
    container: {},
});
