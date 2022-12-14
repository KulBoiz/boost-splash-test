import React, { useEffect } from "react"
import { View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import FormInput from "../../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormItemPicker from "../../../../components/form-item-picker"
import { GENDER } from "../../../../constants/gender"
import { LEFT_INPUT, ROW } from "../../../../styles/common-style"
import { presets } from "../../../../constants/presets"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../../models"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}
const convertGender = (gender) => {
  if (gender === 'nam') {
    return 'male'
  }
  if (gender === 'nữ') {
    return 'female'
  }
  return 'male'
}
const InformationForm = React.memo((props: Props) => {
  const {control, errors, setValue, clearErrors} = props
  const {ekycStore} = useStores()
  const {user} = ekycStore

  useEffect(()=> {
    setValue('fullName', user?.fullName)
    setValue('birthday', user?.birthday)
    setValue('gender', convertGender(user?.gender))
  },[])

  return (
    <View style={styles.container}>
      <AppText value={'I. Thông tin nhà đầu tư'} style={presets.label} />
      <FormInput
        {...{
          required: true,
          name: 'fullName',
          labelTx: 'label.fullName',
          placeholderTx: 'placeholder.fullName',
          control,
          editable: false,
          error: errors?.fullName?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: 'tel',
          labelTx: 'label.phoneNumber',
          placeholderTx: 'placeholder.phone',
          control,
          keyboardType: 'number-pad',
          error: errors?.tel?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: 'email',
          labelTx: 'label.email',
          placeholderTx: 'placeholder.email',
          control,
          error: errors?.email?.message,
        }}
      />
      <View style={ROW}>
      <FormInput
        style={LEFT_INPUT}
        required
        label={'Ngày sinh'}
        name={'birthday'}
        placeholder={'Chọn ngày sinh'}
        editable={false}
        control={control}
        error={errors?.birthday?.message}
      />
      <FormItemPicker
        {...{
          style:{flex: 1},
          editable:false,
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
    </View>
  )
});

export default InformationForm;

const styles = ScaledSheet.create({
    container: {
      marginTop: '16@s',
      paddingHorizontal: '16@s'
    },
});
