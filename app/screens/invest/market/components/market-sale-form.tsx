import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormInput from "../../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { ALIGN_CENTER, ROW } from "../../../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import FormDatePicker from "../../../../components/form-date-time"

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
const MarketSaleForm = React.memo((props: Props) => {
  const { control, errors, setValue, watch, clearErrors } = props

  return (
    <View style={styles.container}>
      <FormInput
        {...{
          name: "amount",
          label: "Số lượng CQQ cần bán",
          placeholder: "Số lượng CQQ cần bán",
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
            label: "NAV kỳ gần nhất",
            placeholder: "NAV kỳ gần nhất",
            keyboardType: "number-pad",
            control,
            error: errors?.estimatedQuantity?.message,
          }}
        />
        <FormDatePicker
          style={{flex:1}}
          label={'Phiên khớp lệnh'}
          name={'dateRange'}
          placeholder={'Phiên khớp lệnh'}
          setValue={setValue}
          control={control}
          error={errors?.dateRange?.message}
        />
      </View>
      <FormInput
        {...{
          name: "purchaseFee",
          label: "Giá trị tương ứng",
          placeholder: "Giá trị tương ứng",
          keyboardType: "number-pad",
          control,
          error: errors?.purchaseFee?.message,
        }}
      />
    </View>
  )
});

export default MarketSaleForm;

const styles = ScaledSheet.create({
    container: {},
  rowInput: {
      flex:1,
    marginRight: '4@s'
  }
});
