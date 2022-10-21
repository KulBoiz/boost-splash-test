import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Control, UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../../components/form-input/form-input"
import { GENDER } from "../../../../constants/gender"
import FormItemPicker from "../../../../components/form-item-picker"
import { AppText } from "../../../../components/app-text/AppText"
import { presets } from "../../../../constants/presets"
import { color } from "../../../../theme"
import { ScaledSheet } from "react-native-size-matters"

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
      <AppText value={'Thông tin giấy tờ'} style={presets.label_16} color={color.primary}/>

      <FormInput
        {...{
          required: true,
          name: 'fullName',
          label: 'Số CMND/CCCD',
          placeholder: 'Nhập số CMND/CCCD',
          control,
          keyboardType:"number-pad",
          error: errors?.fullName?.message,
        }}
      />
      <FormItemPicker
        {...{
          required: true,
          name: "gender",
          label: "Nơi cấp",
          placeholder: "Chọn nơi cấp",
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

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@s'
  },
});
