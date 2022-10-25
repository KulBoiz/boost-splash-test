import React, { useEffect } from "react"
import { View } from "react-native"
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

interface Props {
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const BankForm = React.memo((props: Props) => {
  const { control, errors, setValue, clearErrors } = props
  const { authStoreModel } = useStores()
  useEffect(() => {

  }, [])

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
          data: GENDER,
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
      <FormInput
        {...{
          required: true,
          name: "bankBranch",
          label: "Chi nhánh ngân hàng",
          placeholder: "Nhập chi nhánh",
          control,
          keyboardType: "number-pad",
          error: errors?.bankBranch?.message,
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
