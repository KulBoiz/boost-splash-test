import React, { useEffect } from "react"
import { View } from "react-native"
import FormItemPicker from "../../../../components/form-item-picker"
import FormInput from "../../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { ALIGN_CENTER, ROW } from "../../../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { FUND_PROGRAM_LIST } from "../../constants"
import { get } from "lodash"
import { formatDate, numberWithCommas } from "../../../../constants/variable"

interface Props {
  control: Control
  errors: FieldErrors<any>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  navs: any
  bondsDetail: any
}

const MarketBuyForm = React.memo((props: Props) => {
  const { control, errors, setValue, watch, clearErrors, navs, bondsDetail } = props
  const currentNav = get(navs[0], 'nav', '')
  const nextOrderMatchingSession = bondsDetail?.info?.nextOrderMatchingSession
  const nav = numberWithCommas(currentNav)
  const date = formatDate(nextOrderMatchingSession)

  return (
    <View style={styles.container}>
      <FormItemPicker
        {...{
          name: "program",
          label: "Chọn chương trình",
          placeholder: "Chọn chương trình",
          control,
          setValue,
          clearErrors,
          error: errors?.program?.message,
          data: FUND_PROGRAM_LIST,
        }}
      />
      <FormInput
        {...{
          name: "amount",
          label: "Số tiền bạn muốn đầu tư",
          placeholder: "Bắt đầu từ 100,000 vnđ",
          keyboardType: "number-pad",
          control,
          error: errors?.amount?.message,
        }}
      />
      <View style={[ROW, ALIGN_CENTER]}>
        <FormInput
          {...{
            style: styles.rowInput,
            name: "estimatedQuantity",
            label: "Số CCQ ước tính",
            placeholder: "Nhập số CCQ",
            keyboardType: "number-pad",
            control,
            error: errors?.estimatedQuantity?.message,
          }}
        />
        <FormInput
          {...{
            style: { flex: 1 },
            name: "purchaseFee",
            label: "Phí mua",
            placeholder: "Phí mua",
            keyboardType: "number-pad",
            control,
            error: errors?.purchaseFee?.message,
          }}
        />
      </View>
      <View style={[ROW, ALIGN_CENTER]}>
        <FormInput
          {...{
            style: styles.rowInput,
            name: "nav",
            label: "NAV kỳ gần nhất",
            placeholder: "NAV",
            keyboardType: "number-pad",
            control,
            editable: false,
            value: nav,
            error: errors?.nav?.message,
          }}
        />
        <FormInput
          {...{
            style: { flex: 1 },
            name: "orderSession",
            label: "Phiên khớp lệnh",
            placeholder: "Phiên khớp lệnh",
            control,
            editable: false,
            value: date,
            error: errors?.orderSession?.message,
          }}
        />
      </View>
    </View>
  )
})

export default MarketBuyForm

const styles = ScaledSheet.create({
  container: {},
  rowInput: {
    flex: 1,
    marginRight: "4@s",
  },
})
