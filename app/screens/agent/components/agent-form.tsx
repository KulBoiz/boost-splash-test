import React, { useEffect } from "react"
import { View, StyleSheet } from 'react-native';
import { Control, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../components/form-input/form-input"
import FormItemPicker from "../../../components/form-item-picker"
import { useStores } from "../../../models"

interface Props{
  control: Control
  errors: FieldErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const AgentForm = React.memo((props: Props) => {
  const {bankStore} = useStores()
  const {control, errors, setValue} = props
  useEffect(()=> {
    bankStore.getBankList()
  },[])
  console.log('bank list',bankStore.banks)
  return (
    <View style={styles.container}>
      <FormInput
        {...{
          name: 'email',
          label: 'Email',
          placeholderTx: 'placeholder.email',
          control,
          error: errors?.email?.message
        }}
      />
      <FormInput
        {...{
          name: 'phone',
          labelTx: 'label.phoneNumber',
          placeholderTx: 'placeholder.phone',
          control,
          error: errors?.phone?.message
        }}
      />
      <FormItemPicker
        {...{
          name: 'bank',
          label: 'Tên ngân hàng',
          placeholder: 'Chọn ngân hàng',
          control,
          setValue,
          error: errors?.bank?.message
        }}
      />
      <FormItemPicker
        {...{
          name: 'banks',
          label: 'Chi nhánh ngân hàng',
          placeholder: 'Chọn chi nhánh ngân hàng',
          control,
          setValue,
          error: errors?.banks?.message
        }}
      />

    </View>
  )
});

export default AgentForm;

const styles = StyleSheet.create({
    container: {},
});
