import React, { useEffect } from "react"
import { View } from "react-native"
import FormItemPicker from "../../../../components/form-item-picker"
import FormInput from "../../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW } from "../../../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { filter, get } from "lodash"
import { formatData, formatDate, numberWithCommas, truncateString } from "../../../../constants/variable"
import { createNumberMask, useMaskedInputProps } from "react-native-mask-input"
import FastImage from "react-native-fast-image"
import { AppText } from "../../../../components/app-text/AppText"
import { images } from "../../../../assets/images"

interface Props {
  control: Control
  errors: FieldErrors<any>
  setError: any
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  navs: any
  bondsDetail: any
  setIsSip(e: boolean): void
}

const MarketBuyForm = React.memo((props: Props) => {
  const { control, errors, setError, setValue, watch, clearErrors, navs, bondsDetail, setIsSip } = props
  const currentNav = get(navs[0], "nav", "")
  const nextOrderMatchingSession = bondsDetail?.info?.nextOrderMatchingSession
  const productDetails = bondsDetail?.productDetails
  const nav = numberWithCommas(currentNav)
  const date = formatDate(nextOrderMatchingSession)
  const minBuyValue = filter(productDetails, { id: watch("program") })?.[0]?.buyMinValue
  const checkIsSip = filter(productDetails, { id: watch("program") })?.[0]?.productSchemeIsAutoBuy

  const currencyMask = createNumberMask({
    delimiter: ",",
    precision: 0,
  })

  useEffect(()=> {
    setIsSip(checkIsSip)
  },[checkIsSip])

  const currencyInputProps = useMaskedInputProps({
    value: watch("amount"),
    onChangeText: (value) => {
      setValue("amount", value)
      const valueParse = parseFloat(value.replace(/,/g, ''))
      
      if (valueParse === 0) {
        setError('amount', {message: `Số tiền đầu tư cần lớn hơn 0`})
      }

      if (valueParse > 9999999999999) {
        setError('amount', {message: `Số tiền chuyển khoản quá lớn`})
      } else {
        clearErrors("amount")
      }
    },
    mask: currencyMask,
  })

  const estimatedQuantity = watch('amount') ? numberWithCommas((+(watch('amount')?.replace(/,/g, '')) / currentNav).toFixed(2)) : 0

  return (
    <View style={styles.container}>
      <FormItemPicker
        {...{
          required: true,
          name: "program",
          label: "Chọn chương trình",
          placeholder: "Chọn chương trình",
          control,
          setValue,
          clearErrors,
          error: errors?.program?.message,
          data: formatData(productDetails),
        }}
      />
      <FormInput
        {...{
          required: true,
          name: "amount",
          label: "Số tiền bạn muốn đầu tư",
          placeholder: "Bắt đầu từ 100,000 vnđ",
          keyboardType: "number-pad",
          ...currencyInputProps,
          control,
          error: errors?.amount?.message,
        }}
      />
      {minBuyValue &&
      <View style={[ROW, ALIGN_CENTER, MARGIN_BOTTOM_8]}>
        <FastImage source={images.yellow_caution} style={styles.icon} />
        <AppText value={`Số tiền đầu tư tối thiểu ${numberWithCommas(minBuyValue)} vnđ`} />
      </View>
      }
      <View style={[ROW, ALIGN_CENTER]}>
        <FormInput
          {...{
            value: truncateString(estimatedQuantity.toString(), 17),
            editable: false,
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
            value: '0',
            editable: false,
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
      {checkIsSip === 'true' &&
        <FormInput
          {...{
            required: true,
            style: styles.rowInput,
            name: "date",
            label: "Ngày đầu tư định kỳ",
            placeholder: "Nhập ngày đầu tư định kỳ",
            keyboardType: "number-pad",
            control,
            error: errors?.date?.message,
          }}
        />
      }
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
  icon: {
    width: "16@s",
    height: "16@s",
    marginRight: "4@s",
  },
})
