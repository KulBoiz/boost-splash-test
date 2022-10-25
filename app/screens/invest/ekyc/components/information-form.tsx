import React, { useEffect } from "react"
import { View } from 'react-native';
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import FormInput from "../../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormDatePicker from "../../../../components/form-date-time"
import FormItemPicker from "../../../../components/form-item-picker"
import { GENDER } from "../../../../constants/gender"
import { LEFT_INPUT, ROW } from "../../../../styles/common-style"
import { presets } from "../../../../constants/presets"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../../models"
import { get } from "lodash"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const InformationForm = React.memo((props: Props) => {
  const {control, errors, setValue, clearErrors} = props
  const {authStoreModel} = useStores()
  const {user} = authStoreModel
  const email = get(user, 'emails[0].email')
  const tel = get(user, 'tels[0].tel')

  useEffect(()=> {
    setValue('fullName', user?.fullName)
    setValue('birthday', user?.birthday)
    setValue('email', email)
    setValue('tel', tel)
    setValue('gender', user?.gender)
  },[])

  return (
    <View style={styles.container}>
      <AppText value={'Thông tin cá nhân'} style={presets.label_16} color={color.primary}/>
      <FormInput
        {...{
          required: true,
          name: 'fullName',
          labelTx: 'label.fullName',
          placeholderTx: 'placeholder.fullName',
          control,
          error: errors?.fullName?.message,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: 'phoneNumber',
          labelTx: 'label.phoneNumber',
          placeholderTx: 'placeholder.phoneNumber',
          control,
          error: errors?.phoneNumber?.message,
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
      <FormDatePicker
        style={LEFT_INPUT}
        required
        label={'Ngày sinh'}
        name={'birthday'}
        placeholder={'Chọn ngày sinh'}
        setValue={setValue}
        control={control}
        clearErrors={clearErrors}
        error={errors?.birthday?.message}
      />
      <FormItemPicker
        {...{
          style:{flex: 1},
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
