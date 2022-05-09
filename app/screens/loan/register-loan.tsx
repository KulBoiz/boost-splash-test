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

interface Props{}

const RegisterLoan = observer((props: Props) => {
  const [modal, setModal] = useState<boolean>(false)
  const [type, setType] = useState<string>(PRODUCT_TYPE.LOAN)
  const {authStoreModel, loanStore} = useStores()
  const user: any = authStoreModel.user
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("Please enter your email or phone number")
      .email("This is not a valid email"),
    fullName: Yup.string()
      .trim()
      .required("Please enter the customer full name"),
    phone: Yup.string()
      .trim()
      .required("Please enter the phone number")
  })
  const {control, handleSubmit, formState: {errors}, setValue} = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  // useEffect(()=> {
  //   setValue('fullName',user?.fullName)
  //   setValue('email',user?.emails[0].email)
  //   setValue('phone',user?.tels[0].tel)
  // },[])
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
            labelStyle: [styles.label, FONT_MEDIUM_12],
            label: 'họ và tên người mua'
          }}
        /><FormInput
          {...{
            name: 'email',
            control,
            error: errors?.email?.message,
            labelStyle: [styles.label, FONT_MEDIUM_12],
            label: 'địa chỉ Email'
          }}
        /><FormInput
          {...{
            name: 'phone',
            control,
            error: errors?.phone?.message,
            labelStyle: [styles.label, FONT_MEDIUM_12],
            label: 'Số điện thoại',
            keyboardType: 'number-pad'
          }}
        />
        <ProductTypePicker value={type} setValue={setType} />
        <FormInput
          {...{
            name: 'note',
            control,
            error: errors?.note?.message,
            labelStyle: [styles.label, FONT_MEDIUM_12],
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
    textTransform: 'capitalize'
  },
  label: {
    color: color.palette.lighterGray,
    textTransform: 'capitalize'
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
