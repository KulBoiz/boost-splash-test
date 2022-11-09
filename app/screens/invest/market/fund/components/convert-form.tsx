import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../../../components/form-input/form-input"
import { LEFT_INPUT, ROW } from "../../../../../styles/common-style"
import { GENDER } from "../../../../../constants/gender"
import FormItemPicker from "../../../../../components/form-item-picker"

interface Props {
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
}
const ConvertForm = React.memo((props: Props) => {
  const { control, errors, setValue, clearErrors, watch } = props

  return (
    <View style={styles.container}>
      <FormInput
        {...{
          required: true,
          name: "amount",
          label: " Soó lượng chuyển đổi",
          placeholder: "Địa chỉ",
          control,
          error: errors?.amount?.message,
        }}
      />
      <View style={ROW}>
        <FormInput
          {...{
            required: true,
            name: "nav",
            label: "Số lượng chuyển đổi",
            placeholder: "Địa chỉ",
            control,
            error: errors?.nav?.message,
          }}
        />
        <FormInput
          {...{
            required: true,
            name: "price",
            label: "Giá trị tương ứng",
            placeholder: "Địa chỉ",
            control,
            error: errors?.price?.message,
          }}
        />
      </View>
      <View>
        <FormItemPicker
          {...{
            style:LEFT_INPUT,
            required: true,
            name: "gender",
            label: "CQQ mục tiêu",
            placeholder: "* CQQ mục tiêu",
            disable: true,
            control,
            setValue,
            error: errors?.gender?.message,
            data: GENDER,
            clearErrors
          }}
        />
        <FormItemPicker
          {...{
            style:{flex: 1},
            required: true,
            name: "gender",
            label: "Chương trình mục tiêu",
            placeholder: "Chương trình mục tiêu",
            disable: true,
            control,
            setValue,
            error: errors?.gender?.message,
            data: GENDER,
            clearErrors
          }}
        />
      </View>
      <View style={ROW}>
        <FormInput
          {...{
            required: true,
            name: "fee",
            style:LEFT_INPUT,
            label: " Phí chuyển đổi",
            placeholder: "Phí chuyển đổi",
            control,
            error: errors?.fee?.message,
          }}
        />
        <FormInput
          {...{
            required: true,
            name: "tax",
            style:{flex: 1},
            label: "Giá trị sau phí và thuế",
            placeholder: "Giá trị sau phí và thuế",
            control,
            error: errors?.tax?.message,
          }}
        />
      </View>
    </View>
  )
});

export default ConvertForm;

const styles = StyleSheet.create({
    container: {},
});
