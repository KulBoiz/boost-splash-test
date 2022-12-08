import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import IntroduceStepOne from "./components/introduce-step-one"
import IntroduceStepTwo from "./components/introduce-step-two"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { goBack } from "../../navigators"

interface Props{ }

const phoneRegExp = /^0[0-9]{9}$/gm

const RequestCounselling = React.memo((props: Props) => {
  const [step, setStep] = useState<number>(1)
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required(i18n.t("errors.requireFullName")),
    email: Yup.string()
      .trim()
      .required(i18n.t("errors.requireEmail"))
      .email("Không đúng định dạng email"),
    phone: Yup.string()
      .trim()
      .required(i18n.t("errors.requirePhone"))
      .matches(phoneRegExp, i18n.t("errors.requirePhone")),
    note: Yup.string().trim(),
  })

  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    delayError: 0,
    defaultValues: { fullName: '',email: '',phone: '', note: '' },
    resolver: yupResolver(validationSchema),
    reValidateMode: "onSubmit",
  })

  const handleGoBack = React.useCallback(() => {
    resetField('fullName')
    resetField('email')
    resetField('phone')
    resetField('note')
    goBack()
  },[])

  const nextStep = () => {
    setStep(2)
  }

  const preStep = () => {
    setStep(1)
  }

  const renderStep = () => {
    switch (step){
      case 1: {
        return <IntroduceStepOne {...{nextStep, control, handleSubmit, errors: { ...errors }, }}/>
      }
      case 2: {
        return <IntroduceStepTwo {...{preStep}}/>
      }
    }
  }
  return (
    <View style={styles.container}>
        <AppHeader headerTx={'header.requestCounselling'} onLeftPress={handleGoBack}/>
        {renderStep()}
    </View>
  )
});

export default RequestCounselling;

const styles = StyleSheet.create({
    container: {flex: 1},
});
