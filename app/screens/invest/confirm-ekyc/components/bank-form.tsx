import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
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
import { formatData } from "../../../../constants/variable"

interface Props {
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>

}

const BankForm = React.memo((props: Props) => {
  const { control, errors, setValue, clearErrors, watch } = props
  const { authStoreModel, bankStore } = useStores()
  const [bankBranch, setBankBranch] = useState([])

  useEffect(() => {
    console.log(1111111)
    bankStore.getBankList()
  }, [])

  const listBank = () => {
    const banks = bankStore?.banks ?? []
    return formatData(banks)
  }

  const handleSelectBank = (bank) => {
    clearErrors("bank")
    setValue("bankBranch", "")
    bankStore.getBankBranch(bank?.value).then((res) => {
      setBankBranch(formatData(res?.data))
    })
  }

  const onChangeSearchBank = (value) => {
    bankStore.getBankList(value)
  }

  const listBankBranch = () => {
    return formatData(bankStore?.bankBranches)
  }

  const onChangeSearchBankBranch = (value) => {
    bankStore.getBankBranch(watch("bank"), value).then((res) => {
      setBankBranch(formatData(res?.data))
    })
  }

  return (
    <View style={styles.container}>
      <AppText value={"Thông tin ngân hàng"} style={presets.label_16} color={color.primary} />
      <FormItemPicker
        {...{
          required: true,
          name: "bank",
          label: "Ngân hàng",
          placeholder: "Chọn nơi cấp",
          control,
          setValue,
          error: errors?.bank?.message,
          data: listBank(),
          handleSelect: handleSelectBank,
          onChangeSearchText: onChangeSearchBank,
          clearErrors,
        }}
      />
      <FormInput
        {...{
          required: true,
          name: "bankNumber",
          label: "Số tài khoản",
          placeholder: "Nhập số tài khoản",
          control,
          keyboardType: "number-pad",
          error: errors?.bankNumber?.message,
        }}
      />
      <FormItemPicker
        {...{
          required: true,
          data: listBankBranch(),
          name: "bankBranch",
          label: "Chi nhánh ngân hàng",
          placeholder: "Chọn chi nhánh ngân hàng",
          control,
          setValue,
          error: errors?.bankBranch?.message,
          onChangeSearchText: onChangeSearchBankBranch,
        }}
      />
    </View>
  )
})

export default BankForm

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@s",
  },
})
