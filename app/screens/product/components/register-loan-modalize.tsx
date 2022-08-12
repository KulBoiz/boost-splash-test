import React, { Ref } from "react"
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import LoanDetailItem from "../../loan/components/loan-detail-item"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import RegisterLoanForm from "./register-loan-form"

interface Props{
  modalizeRef: Ref<any>
}

const RegisterLoanModalize = React.memo(({ modalizeRef }: Props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(i18n.t('errors.requireEmail'))
      .email(i18n.t('errors.invalidEmail')),
    fullName: Yup.string()
      .trim()
      .required(i18n.t('errors.customerFullName')),
    phone: Yup.string()
      .trim()
      .required(i18n.t('errors.requirePhone'))
  })
  const { control, handleSubmit, formState: { errors } } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  return (
    <Modalize ref={modalizeRef}>
      <LoanDetailItem />
      <RegisterLoanForm control={control} errors={{...errors}} />
    </Modalize>
  )
});

export default RegisterLoanModalize;

const styles = StyleSheet.create({
    container: {},
});
