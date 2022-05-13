import React, { useEffect, useState } from "react"
import { View, ScrollView, Alert } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import { AppText } from "../../components/app-text/AppText"
import { item } from "../home/constants"
import { ScaledSheet } from "react-native-size-matters"
import {
  CONTAINER_PADDING,
  FONT_MEDIUM_12,
  FONT_SEMI_BOLD_14,
  MARGIN_BOTTOM_24,
  MARGIN_BOTTOM_8,
  PARENT,
} from "../../styles/common-style"
import { color } from "../../theme"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import FormInput from "../../components/form-input/form-input"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
import AppButton from "../../components/app-button/AppButton"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import SuccessModal from "../../components/success-modal"
import ProductTypePicker from "./components/product-type-picker"
import { PRODUCT_TYPE } from "./constants"
import i18n from "i18n-js"

interface Props{}

const RegisterLoan = observer((props: Props) => {
  const [modal, setModal] = useState<boolean>(false)
  const [type, setType] = useState<string>(PRODUCT_TYPE.LOAN)
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
  const {control, handleSubmit, formState: {errors}} = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const sendInfo = async (data: any) => {
    const send =  await loanStore.createRequestCounselling(data.email, data.fullName, data.phone,data.note)
    if (send.kind === 'ok'){
      setModal(true)
    }
    else Alert.alert('Something went wrong')
  }
const pressModal = () => {
  setModal(false)
  setTimeout(()=> navigate(ScreenNames.APP),300)
}
  return (
    <View style={PARENT}>
      <AppHeader headerText={'Đăng ký gói vay'} isBlue/>
      <ScrollView style={CONTAINER_PADDING}>
        <View style={[styles.wrapName, MARGIN_BOTTOM_24]}>
          <AppText value={'Thông tin gói vay'} style={[FONT_MEDIUM_12, styles.title, MARGIN_BOTTOM_8]}/>
          <AppText value={loanStore?.productDetail?.product?.name} style={FONT_SEMI_BOLD_14}/>
        </View>
        <AppText value={'Thông tin khách hàng'} style={[FONT_MEDIUM_12, styles.title, MARGIN_BOTTOM_8]}/>
        <FormInput
          {...{
            name: 'fullName',
            control,
            error: errors?.fullName?.message,
            label: 'họ và tên người mua',
            placeholder: 'Họ và tên người mua'
          }}
        /><FormInput
          {...{
            name: 'email',
            control,
            error: errors?.email?.message,
            label: 'địa chỉ Email',
            placeholderTx: 'placeholder.email'

          }}
        /><FormInput
          {...{
            name: 'phone',
            control,
            error: errors?.phone?.message,
            label: 'Số điện thoại',
            placeholder:'Vui lòng nhập số điện thoại',
            keyboardType: 'number-pad'
          }}
        />
        <ProductTypePicker value={type} setValue={setType} />
        <FormInput
          {...{
            name: 'note',
            control,
            error: errors?.note?.message,
            label: 'ghi chú',
            multiline: true
          }}
        />
        <AppButton title={'Gửi thông tin'} onPress={handleSubmit(sendInfo)} containerStyle={styles.btn}/>
        <View style={{height: 50}}/>

      </ScrollView>
      <SuccessModal visible={modal} onPress={pressModal} title={'Gửi thông tin'}/>
    </View>
  )
});

export default RegisterLoan;

const styles = ScaledSheet.create({

  title: {
    color: color.palette.blue,
  },
  label: {
    color: color.palette.lighterGray,
  },
  wrapName: {
    paddingVertical: '24@s',
    borderBottomWidth: 1,
    borderBottomColor: color.line
  },
  btn: {
    backgroundColor: color.palette.orange,
    alignSelf: "center",
    marginTop: '40@s'
  }
});
