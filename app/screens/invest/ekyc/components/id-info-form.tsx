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
  const {control, errors, setValue} = props
  const {ekycStore} = useStores()
  const identification = ekycStore.user?.identification

  useEffect(()=> {
    setValue('idNumber', identification?.idNumber)
    setValue('placeOfIssue', identification?.placeOfIssue)
    setValue('issuedOn', identification?.issuedOn)
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
          editable: false,
          keyboardType:"number-pad",
          error: errors?.idNumber?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: 'issuedOn',
          label: 'Ngày cấp',
          placeholder: '31/02/2020',
          control,
          editable: false,
          error: errors?.issuedOn?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: 'placeOfIssue',
          label: 'Nơi cấp',
          placeholder: 'Nơi cấp',
          editable: false,
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
