import React, { useEffect, useState } from "react"
import { View, StyleSheet } from 'react-native';
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../components/form-input/form-input"
import FormItemPicker from "../../../components/form-item-picker"
import { useStores } from "../../../models"

interface Props {
  control: Control
  errors: FieldErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
}

const AgentForm = React.memo((props: Props) => {
  // @ts-ignore
  const { bankStore } = useStores()
  const { control, errors, setValue } = props
  const [bank, setBank] = useState([])

  useEffect(() => {
    bankStore.getBankList()
  }, [])

  // useEffect(() => {
  //   console.log('1');
    
  //   setValue('bankBranch', '')
  //   setReloadBankBranch(true)

  //   bankStore.getBankBranch(watch('bank')).then(() => {
  //     setReloadBankBranch(false)
  //   })
  // }, [watch('bank')])

  const listBank = () => {
    const banks = bankStore?.banks ?? []
    return banks?.map((val) => ({
      value: val.id,
      label: val.name
    }))
  }

  const listBankBranch = () => {
    return bankStore?.bankBranches?.map((val) => ({
      value: val.id,
      label: val.name
    }))
  }

  const handleSelectBank = (bank) => {
    setValue('bankBranch', '');
    
    bankStore.getBankBranch(bank?.value).then((res) => {
      setBank(res?.data?.map((val) => ({
        value: val.id,
        label: val.name
      })))
    })
  }

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
          error: errors?.bank?.message,
          data: listBank(),
          handleSelectBank
        }}
      />
      {bank && bank.length > 0 && <FormItemPicker
        {...{
          data: listBankBranch(),
          name: 'bankBranch',
          label: 'Chi nhánh ngân hàng',
          placeholder: 'Chọn chi nhánh ngân hàng',
          control,
          setValue,
          error: errors?.banks?.message
        }}
      />}

    </View>
  )
});

export default AgentForm;

const styles = StyleSheet.create({
  container: {},
});
