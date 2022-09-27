import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormItemPicker from "../../../../components/form-item-picker"
import FormInput from "../../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { ALIGN_CENTER, ROW } from "../../../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  control: Control
  errors: FieldErrors<any>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}
const testData = [
  {
    label:'FINA Flex',
    value: 'FINA Flex'
  },{
    label:'FINA Sip',
    value: 'FINA Sip'
  },
]
const MarketBuyForm = React.memo((props: Props) => {
  const { control, errors, setValue, watch, clearErrors } = props

  return (
    <View style={styles.container}>
      <FormItemPicker
        {...{
          name: "program",
          label: "Chọn chương trình",
          placeholder: "Chọn chương trình",
          control,
          setValue,
          error: errors?.program?.message,
          data: testData,
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
            label: "Số lượng ước tính",
            placeholder: "Nhập số lượng",
            keyboardType: "number-pad",
            control,
            error: errors?.estimatedQuantity?.message,
          }}
        />
        <FormInput
        {...{
          style:{flex:1},
          name: "purchaseFee",
          label: "Phí mua",
          placeholder: "Phí mua",
          keyboardType: "number-pad",
          control,
          error: errors?.purchaseFee?.message,
        }}
      />
      </View>
    </View>
  )
});

export default MarketBuyForm;

const styles = ScaledSheet.create({
    container: {},
  rowInput: {
      flex:1,
    marginRight: '4@s'
  }
});
