import React, { useEffect } from "react"
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
import { useStores } from "../../../../models"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const IdInfoForm = React.memo((props: Props) => {
  const {control, errors, setValue, clearErrors} = props
  const {authStoreModel} = useStores()
  const identification = authStoreModel?.user?.identification
  useEffect(()=> {
    setValue('iudNumber', identification?.idNumber)
    setValue('placeOfIssue', identification?.placeOfIssue)
  },[])

  return (
    <View style={styles.container}>
      <AppText value={'II. Thông tin giấy tờ'} style={presets.label} />

      <FormInput
        {...{
          required: true,
          name: 'idNumber',
          label: 'Số CMND/CCCD',
          placeholder: 'Nhập số CMND/CCCD',
          control,
          keyboardType:"number-pad",
          error: errors?.fullName?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: 'dateOfIssue',
          label: 'Ngày cấp',
          placeholder: '31/02/2020',
          control,
          error: errors?.fullName?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: 'placeOfIssue',
          label: 'Nơi cấp',
          placeholder: 'Nơi cấp',
          control,
          error: errors?.placeOfIssue?.message,
        }}
      />
    </View>
  )
});

export default IdInfoForm;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@s',
    marginTop: '12@s'
  },
});
