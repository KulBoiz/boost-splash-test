import React from 'react';
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { ScaledSheet } from "react-native-size-matters"
import FormInput from "../../../components/form-input/form-input"
import { Control } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { color } from "../../../theme"
import { ROW, SPACE_BETWEEN } from "../../../styles/common-style"

interface Props{
  control: Control,
  errors: FieldErrors<FieldValues>
}

const InputCustomer = React.memo((props: Props) => {
  const {control, errors} = props
  return (
    <View style={styles.container}>
      <AppText value={'Thông tin người được bảo hiểm'} style={styles.title}/>
      <FormInput
        {...{
          name: 'fullName',
          labelTx: 'label.fullName',
          placeholderTx: 'placeholder.fullName',
          control,
          error: errors?.email?.fullName
        }}
      />
      <View style={[ROW,SPACE_BETWEEN]}>
      <FormInput
        {...{
          style: {flex:1, marginRight: 5},
          name: 'dateOfBirth',
          labelTx: 'label.dateOfBirth',
          placeholderTx: 'placeholder.dateOfBirth',
          control,
          error: errors?.email?.dateOfBirth
        }}
      />
      <FormInput
        {...{
          style: {flex: 1},
          name: 'sex',
          labelTx: 'label.sex',
          placeholderTx: 'placeholder.sex',
          control,
          error: errors?.email?.sex
        }}
      />
      </View>
      <FormInput
        {...{
          name: 'citizenIdentification',
          labelTx: 'label.citizenIdentification',
          placeholderTx: 'placeholder.citizenIdentification',
          control,
          error: errors?.email?.citizenIdentification,
          keyboardType: 'number-pad'
        }}
      />
      <View style={[ROW,SPACE_BETWEEN]}>
      <FormInput
        {...{
          style: {flex:1, marginRight: 5},
          name: 'dateRange',
          labelTx: 'label.dateRange',
          placeholderTx: 'placeholder.dateRange',
          control,
          error: errors?.email?.dateRange
        }}
      />
      <FormInput
        {...{
          style: {flex:1},
          name: 'issuedBy',
          labelTx: 'label.issuedBy',
          placeholderTx: 'placeholder.issuedBy',
          control,
          error: errors?.email?.issuedBy
        }}
      />
      </View>
      <FormInput
        {...{
          name: 'contactAddress',
          labelTx: 'label.contactAddress',
          placeholderTx: 'placeholder.address',
          control,
          error: errors?.email?.address
        }}
      />
      <FormInput
        {...{
          name: 'phone',
          labelTx: 'label.phoneInsurance',
          placeholderTx: 'placeholder.phone',
          control,
          error: errors?.email?.phone,
          keyboardType: 'number-pad'
        }}
      />
      <FormInput
        {...{
          name: 'email',
          labelTx: 'label.emailInsurance',
          placeholderTx: 'placeholder.email',
          control,
          error: errors?.email?.email
        }}
      />
    </View>
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
