import React, { useCallback, useEffect, useState } from "react"
import { Pressable, View } from "react-native"
import FormInput from "../../../../components/form-input/form-input"
import {
  Control,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { ALIGN_CENTER, FONT_REGULAR_12, LEFT_INPUT, MARGIN_BOTTOM_4, ROW } from "../../../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import FormItemPicker from "../../../../components/form-item-picker"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import NoteItem from "../../../../components/note-item"
import { debounce, filter } from "lodash"
import { useStores } from "../../../../models"
import { observer } from "mobx-react-lite"
import SaleFeeInfo from "./sale-fee-info"
import { convertToInt } from "../../../../constants/variable"
import AppModal from "../../../../components/app-modal/app-modal"
import { useIsFocused } from "@react-navigation/native"

interface Props {
  control: Control
  errors: FieldErrors<any>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setError: UseFormSetError<FieldValues>;
  data: any
  disable: boolean
  setIsValid(e: boolean): void
}

const selectData = [20, 50, 75, "Tất cả"]

const formatData = (array: any[] = []) => {
  return array.map((val) => ({
    value: val?.id ?? "",
    label: val?.name?.replace(/\t/g, "") ?? "",
  }))
}

const FastSelection = React.memo(({ title, onPress, disable }: { title: string | number, onPress(e: any): void, disable: boolean }) => {
  const isNumber = typeof title === "number"
  return (
    <Pressable onPress={onPress} style={[styles.itemContainer, {opacity: !disable ? 0.6 : 1}]} disabled={!disable}>
      <AppText value={`${title}${isNumber ? "%" : ""}`} style={FONT_REGULAR_12} color={color.text} />
    </Pressable>
  )
})

const MarketSaleForm = observer((props: Props) => {
  const { assetStore } = useStores()
  const [fundAmount, setFundAmount] = useState(0)
  const [fee, setFee] = useState([])
  const [visible, setVisible] = useState(false)
  const [errorText, setErrorText] = useState("")
  const { control, errors, setValue, watch, clearErrors, data, setError, setIsValid } = props
  const sellMinValue = filter(data?.productDetails, { idPartner: watch("program") })?.[0]?.sellMin
  const param = { volume: +watch("amount"), productId: data?.info?.idPartner, productProgramId: watch("program") }

  useEffect(()=> {
    const volume = assetStore.assetAmount.filter(e => e.id === watch("program"))?.[0]?.volumeAvailable
    if(volume && watch('amount')){
      setFundAmount(volume)
      if (volume - +watch('amount') === 0){
        setIsValid(false)
      }
    }
    clearErrors('amount')
  },[assetStore.assetAmount])

  const loadFee = useCallback(
    debounce(async param => {
      await assetStore.loadRedemptionFee(param).then(res => {
        if (res.error || res?.kind === "server") {
          setIsValid(false)
          setErrorText(res?.error?.message)
          setVisible(true)
          return
        }
        setIsValid(true)
        setFee(res?.details)
        setValue("value", convertToInt(res?.totalAmount))
        setValue("fee", convertToInt(res?.totalFee))
      })
      await assetStore.setInfoSellTransaction({
        ...param, ...data,
        value: watch("value").replace(/,/g, ""),
        fee: watch("fee").replace(/,/g, ""),
      })
    }, 700),
    [data],
  )

  useEffect(() => {
    if (+watch("amount") > fundAmount) {
      setIsValid(false)
      setError("amount", { message: "Số lượng CCQ vượt quá số lượng khả dụng" })
      return
    }
    if (watch("amount").length <= 0) {
      setIsValid(false)
      return
    }
    loadFee(param)
  }, [watch("amount"), fundAmount])

  const handlePress = React.useCallback((value) => {
    setIsValid(false)
    clearErrors("amount")
    if (!fundAmount) {
      setValue("amount", "0")
      return
    }
    const percentAmount = +((fundAmount * value) / 100).toFixed(2)
    if (typeof value === "number") {
      setValue("amount", percentAmount + "")
      loadFee(param)
      return
    }
    setValue("amount", +fundAmount.toFixed(2) + "")
    loadFee(param)
  }, [fundAmount])

  const handleSelect = React.useCallback((value) => {
    const volume = assetStore.assetAmount.filter(e => e.id === value.value)?.[0]?.volumeAvailable
    setFundAmount(volume)
  }, [])

  return (
    <View style={styles.container}>
      {assetStore.assetAmount.length > 0 &&
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
            data: formatData(assetStore.assetAmount),
            handleSelect: handleSelect,
          }}
        />
      }
      <FormInput
        {...{
          required: true,
          name: "amount",
          label: "Số lượng CQQ cần bán",
          placeholder: "Số lượng CQQ cần bán",
          keyboardType: "number-pad",
          control,
          editable: !!watch('program'),
          error: errors?.amount?.message,
        }}
      />
      <View style={[ROW, ALIGN_CENTER, MARGIN_BOTTOM_4]}>
        {
          selectData.map((value, index) => {
            return <FastSelection disable={!!watch('program')} title={value} key={index} onPress={() => handlePress(value)} />
          })
        }
      </View>
      {!!sellMinValue && <NoteItem content={`Số lượng bán tối thiểu là ${sellMinValue ?? 0}`} />}
      {!!watch('program') && <NoteItem content={`Số lượng khả dụng ${fundAmount}`} />}
      <SaleFeeInfo fee={fee} />
      <View style={[ROW, ALIGN_CENTER]}>
        <FormInput
          {...{
            style: LEFT_INPUT,
            name: "value",
            label: "Giá trị tương ứng",
            placeholder: "Giá trị tương ứng",
            keyboardType: "number-pad",
            editable: false,
            control,
            error: errors?.value?.message,
          }}
        />
        <FormInput
          {...{
            style: { flex: 1 },
            name: "fee",
            label: "Phí bán",
            placeholder: "Phí bán",
            keyboardType: "number-pad",
            editable: false,
            control,
            error: errors?.fee?.message,
          }}
        />
      </View>
      <NoteItem content={`Giá trị thực nhận phụ thuộc vào NAV của ngày phiên khớp lệnh`} />
      <AppModal visible={visible} closeModal={() => setVisible(false)} content={errorText} />
    </View>
  )
})

export default MarketSaleForm

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    width: "60@s",
    alignItems: "center",
    backgroundColor: color.primary,
    paddingVertical: "4@s",
    borderRadius: "20@s",
    marginRight: "8@s",
  },
})
