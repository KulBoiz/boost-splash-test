import React, { useEffect, useState } from "react"
import { View } from "react-native"
import FormInput from "../../../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FastImage from "react-native-fast-image"
import { images } from "../../../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import NoteItem from "../../../components/note-item"
import { createNumberMask, useMaskedInputProps } from "react-native-mask-input"
import numeral from "numeral"

interface Props {
  watch: UseFormWatch<FieldValues>
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>;
  setValue: UseFormSetValue<FieldValues>
  bondsDetail: any
}

const ConvertBonds = React.memo((props: Props) => {
  const { control, errors, setValue, watch, bondsDetail, clearErrors} = props
  const [focused, setFocused] = useState(0)
  const price = bondsDetail?.info?.parValueShares

  useEffect(()=> {
    if (focused === 1){
      setValue('amount', (+(watch('amount').replace(/,/g,''))*price).toString())
      return
    }
    setValue('bonds', (+(watch('amount').replace(/,/g,''))/price).toFixed(1).toString())

  },[watch('bonds'), watch('amount')])

  const currencyMask = createNumberMask({
    delimiter: ",",
    precision: 0,
  })

  const currencyInputProps = useMaskedInputProps({
    value: watch("amount"),
    onChangeText: (value) => {setValue("amount", value); clearErrors("amount")},
    mask: currencyMask,
  })
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FormInput
          {...{
            style:{flex:1},
            required: true,
            ...currencyInputProps,
            name: "amount",
            label: "Số tiền đầu tư",
            placeholder: "Nhập số tiền đầu tư",
            control,
            onFocus:()=>setFocused(0),
            keyboardType: 'number-pad',
            error: errors?.amount?.message,
          }}
        />
         <FastImage source={images.swap} style={styles.icon} />
        <FormInput
          {...{
            style:{flex:1},
            onFocus:()=>setFocused(1),
            required: true,
            name: "bonds",
            label: "Số lượng trái phiếu",
            placeholder: "Nhập số lượng trái phiếu",
            control,
            keyboardType: 'number-pad',
            error: errors?.bonds?.message,
          }}
        />
      </View>
       <NoteItem note={"Số tiền đầu tư tối thiểu 100.000"} />
    </View>
  )
})

export default ConvertBonds

const styles = ScaledSheet.create({
  container: {},
  inputContainer:{
    flexDirection: "row",
    alignItems: "center",
    height: '85@s'
  },
  icon: {
    width: "24@s",
    height: "24@s",
    marginHorizontal: '5@s'
  },
})
