import React, { Ref } from "react"
import { Alert } from "react-native"
import { Modalize } from 'react-native-modalize';
import LoanDetailItem from "../../loan/components/loan-detail-item"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import RegisterLoanForm from "./register-loan-form"
import { ScaledSheet } from "react-native-size-matters"
import AppButton from "../../../components/app-button/AppButton"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props{
  modalizeRef: Ref<any>
}

const RegisterLoanModalize = React.memo(({ modalizeRef }: Props) => {
  const {loanStore} = useStores()
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

  const sendInfo = async (data: any) => {
    const send = await loanStore.requestCounselling(
      data.fullName,
      data.email,
      data.phone,
      data.note,
    )
    if (send.kind === 'ok') {
      navigate(ScreenNames.SUCCESS_SCREEN)
    }
    else Alert.alert('Something went wrong')
  }

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modal}
      handlePosition={'inside'}
      adjustToContentHeight
    >

      <AppText value={'Đăng ký gói vay'} center style={styles.title}/>
      <KeyboardAwareScrollView>
        <LoanDetailItem />
        <RegisterLoanForm control={control} errors={{...errors}} />
      </KeyboardAwareScrollView>
      <AppButton title={"Gửi Thông tin"} onPress={handleSubmit(sendInfo)} containerStyle={styles.btn} />
    </Modalize>
  )
});

export default RegisterLoanModalize;

const styles = ScaledSheet.create({
  container: {},
  title: {
    fontSize: '16@ms',
    marginBottom: '24@s',
    fontFamily: fontFamily.bold
  },
  modal: {
    paddingVertical: '24@s',
    paddingHorizontal: '16@s'
  },
  btn: {
    marginTop: '15@s',
    marginBottom: '30@s'
  }
});
