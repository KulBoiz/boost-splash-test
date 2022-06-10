import React, { useEffect } from "react"
import { View } from 'react-native';
import { Control, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../components/form-input/form-input"
import { ScaledSheet } from "react-native-size-matters"
import FormDatePicker from "../../../components/form-date-time"
import { get } from "lodash"
import { useStores } from "../../../models"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const IdForm = React.memo((props: Props) => {
  const {authStoreModel} = useStores()
  const {control, errors ,setValue} = props
  const fullName = get(authStoreModel?.user,'fullName')

  useEffect(() => {
    if (fullName){
      setValue('fullName', fullName)
    }

  }, [])
  return (
    <View style={styles.container}>
      <FormInput
        {...{
          name: 'fullName',
          labelTx: 'label.fullName',
          placeholderTx: 'placeholder.fullName',
          control,
          error: errors?.fullName?.message
        }}
      />
      <FormInput
        {...{
          name: 'citizenIdentification',
          labelTx: 'label.citizenIdentification',
          placeholderTx: 'placeholder.citizenIdentification',
          control,
          keyboardType: 'number-pad',
          error: errors?.citizenIdentification?.message
        }}
      />
      <FormDatePicker
        label={'Ngày cấp'}
        name={'dateRange'}
        placeholder={'Ngày cấp'}
        setValue={setValue}
        control={control}
        error={errors?.dateRange?.message}
      />
      <FormInput
        {...{
          name: 'issuedBy',
          labelTx: 'label.issuedBy',
          placeholderTx: 'placeholder.issuedBy',
          control,
          error: errors?.issuedBy?.message
        }}
      />

    </View>
  )
});

export default IdForm;

const styles = ScaledSheet.create({
  container: {
  },
});
