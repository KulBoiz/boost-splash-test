import React, { useState } from 'react';
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { s, ScaledSheet } from "react-native-size-matters"
import FormInput from "../../../components/form-input/form-input"
import { Control } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { color } from "../../../theme"
import { ALIGN_CENTER, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import Checkbox from '../../../components/checkbox/checkbox';
import { truncate } from 'lodash';
import FormDatePicker from '../../../components/form-date-time';
import i18n from 'i18n-js';

interface Props {
  control: Control,
  errors: FieldErrors<FieldValues>,
  type?: string,
  setValue: any,
  getValues: any
}

const InputCustomer = React.memo((props: Props) => {
  const { control, errors, type, setValue, getValues } = props
  const [checkboxState, setCheckboxState] = useState(true)

  const onChangeText = (value: any, key: string) => {
    const name = key + 'Customer'
    setValue(key, value)

    if (checkboxState) {
      setValue(name, value)
    }
  }

  const setValueDatePicker = (key, value) => {
    const name = key + 'Customer'
    setValue(key, value)

    if (checkboxState) {
      setValue(name, value)
    }
  }

  const resetCustomer = () => {
    ['emailCustomer',
      'fullNameCustomer',
      'dateOfBirthCustomer',
      'sexCustomer',
      'citizenIdentificationCustomer',
      'dateRangeCustomer',
      'issuedByCustomer',
      'contactAddressCustomer',
      'phoneCustomer'].forEach(el => {
        setValue(el, '')
      })
  }

  const setCustomer = () => {
    ['email',
      'fullName',
      'dateOfBirth',
      'sex',
      'citizenIdentification', // cmnd
      'dateRange', // ngày cấp
      'issuedBy', // nơi cấp
      'contactAddress', // địa chỉ cụ thể
      'phone'].forEach(el => {
        const key = el + 'Customer'
        setValue(key, getValues[el])
      })
  }

  return (
    <>
      <View style={styles.container}>
        <AppText value={'Thông tin người mua bảo hiểm'} style={styles.title} />
        <FormInput
          {...{
            name: 'fullName',
            labelTx: 'label.fullName',
            placeholderTx: 'placeholder.fullName',
            control,
            error: errors?.fullName?.message,
            onChangeText: (value) => onChangeText(value, 'fullName')
          }}
        />
        <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER]}>
          <FormDatePicker
            {...{
              style: { flex: 1, marginRight: 5 },
              name: 'dateOfBirth',
              label: i18n.t('label.dateOfBirth'),
              placeholder: 'DD/MM/YYYY',
              setValue: (key, value) => setValueDatePicker(key, value),
              control,
              error: errors?.dateOfBirth?.message
            }}
          />
          <FormInput
            {...{
              style: { flex: 1 },
              name: 'sex',
              labelTx: 'label.sex',
              placeholderTx: 'placeholder.sex',
              control,
              error: errors?.sex?.message,
              onChangeText: (value) => onChangeText(value, 'sex')
            }}
          />
        </View>
        <FormInput
          {...{
            name: 'citizenIdentification',
            labelTx: 'label.citizenIdentification',
            placeholderTx: 'placeholder.citizenIdentification',
            control,
            error: errors?.citizenIdentification?.message,
            keyboardType: 'number-pad',
            onChangeText: (value) => onChangeText(value, 'citizenIdentification')
          }}
        />
        <View style={[ROW, SPACE_BETWEEN]}>
          <FormDatePicker
            {...{
              style: { flex: 1, marginRight: 5 },
              name: 'dateRange',
              label: i18n.t('label.dateRange'),
              placeholder: 'DD/MM/YYYY',
              setValue: (key, value) => setValueDatePicker(key, value),
              control,
              error: errors?.dateRange?.message
            }}
          />
          <FormInput
            {...{
              style: { flex: 1 },
              name: 'issuedBy',
              labelTx: 'label.issuedBy',
              placeholderTx: 'placeholder.issuedBy',
              control,
              error: errors?.issuedBy?.message,
              onChangeText: (value) => onChangeText(value, 'issuedBy')
            }}
          />
        </View>
        <FormInput
          {...{
            name: 'contactAddress',
            labelTx: 'label.contactAddress',
            placeholderTx: 'placeholder.address',
            control,
            error: errors?.contactAddress?.message,
            onChangeText: (value) => onChangeText(value, 'contactAddress')
          }}
        />
        <FormInput
          {...{
            name: 'phone',
            labelTx: 'label.phoneInsurance',
            placeholderTx: 'placeholder.phone',
            control,
            error: errors?.phone?.message,
            keyboardType: 'number-pad',
            onChangeText: (value) => onChangeText(value, 'phone')
          }}
        />
        <FormInput
          {...{
            name: 'email',
            labelTx: 'label.emailInsurance',
            placeholderTx: 'placeholder.email',
            autoCapitalize: 'none',
            control,
            error: errors?.email?.message,
            onChangeText: (value) => onChangeText(value, 'email')
          }}
        />
      </View>
      <View style={styles.container}>
        <AppText value={'Thông tin người được bảo hiểm'} style={styles.title} />
        <Checkbox
          textComponent={<AppText value={"Người mua là người được bảo hiểm"} style={{ marginLeft: s(8) }} />}
          checkboxState={checkboxState}
          setCheckboxState={(value) => {
            // const
            setCheckboxState(value)
            if (value === false) {
              resetCustomer()
            } else {
              setCustomer()
            }
          }}
        />

        <FormInput
          {...{
            name: 'fullNameCustomer',
            labelTx: 'label.fullName',
            placeholderTx: 'placeholder.fullName',
            control,
            error: errors?.fullNameCustomer?.message
          }}
        />
        <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER]}>
          <FormDatePicker
            {...{
              style: { flex: 1, marginRight: 5 },
              name: 'dateOfBirthCustomer',
              label: i18n.t('label.dateOfBirth'),
              placeholder: 'DD/MM/YYYY',
              setValue: setValue,
              control,
              error: errors?.dateOfBirthCustomer?.message
            }}
          />
          <FormInput
            {...{
              style: { flex: 1 },
              name: 'sexCustomer',
              labelTx: 'label.sex',
              placeholderTx: 'placeholder.sex',
              control,
              error: errors?.sexCustomer?.message
            }}
          />
        </View>
        <FormInput
          {...{
            name: 'citizenIdentificationCustomer',
            labelTx: 'label.citizenIdentification',
            placeholderTx: 'placeholder.citizenIdentification',
            control,
            error: errors?.citizenIdentificationCustomer?.message,
            keyboardType: 'number-pad'
          }}
        />
        <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER]}>
          <FormDatePicker
            {...{
              style: { flex: 1, marginRight: 5 },
              name: 'dateRangeCustomer',
              label: i18n.t('label.dateRange'),
              placeholder: 'DD/MM/YYYY',
              setValue: setValue,
              control,
              error: errors?.dateRangeCustomer?.message
            }}
          />
          <FormInput
            {...{
              style: { flex: 1 },
              name: 'issuedByCustomer',
              labelTx: 'label.issuedBy',
              placeholderTx: 'placeholder.issuedBy',
              control,
              error: errors?.issuedByCustomer?.message
            }}
          />
        </View>
        <FormInput
          {...{
            name: 'contactAddressCustomer',
            labelTx: 'label.contactAddress',
            placeholderTx: 'placeholder.address',
            control,
            error: errors?.contactAddressCustomer?.message
          }}
        />
        <FormInput
          {...{
            name: 'phoneCustomer',
            labelTx: 'label.phoneInsurance',
            placeholderTx: 'placeholder.phone',
            control,
            error: errors?.phoneCustomer?.message,
            keyboardType: 'number-pad'
          }}
        />
        <FormInput
          {...{
            name: 'emailCustomer',
            labelTx: 'label.emailInsurance',
            placeholderTx: 'placeholder.email',
            autoCapitalize: 'none',
            control,
            error: errors?.emailCustomer?.message
          }}
        />
      </View>
    </>
  )
});

export default InputCustomer;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@ms',
    backgroundColor: color.background,
    marginTop: '24@s',
    paddingVertical: '24@s'
  },
  title: {
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold,
    textAlign: "center",
    marginBottom: '8@s'
  },
});
