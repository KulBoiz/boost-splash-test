import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormInput from "../../../components/form-input/form-input"
import { Control } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
}

const ChangePasswordForm = React.memo((props: Props) => {
  const { control, errors } = props

  return (
    <View style={styles.container}>
      <FormInput
        {...{
          required: true,
          name: "oldPassword",
          label: "Mật khẩu cũ",
          placeholder: "Mật khẩu cũ",
          showIcon: true,
          control,
          error: errors?.oldPassword?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: "newPassword",
          label: "Mật khẩu mới",
          placeholder: "Mật khẩu mới",
          showIcon: true,
          control,
          error: errors?.newPassword?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: "confirmNewPassword",
          label: "Xác nhận mật khẩu",
          placeholder: "Xác nhận mật khẩu",
          showIcon: true,
          control,
          error: errors?.confirmNewPassword?.message,
        }}
      />
    </View>
  )
});

export default ChangePasswordForm;

const styles = ScaledSheet.create({
    container: {paddingHorizontal: '16@s'},
});
