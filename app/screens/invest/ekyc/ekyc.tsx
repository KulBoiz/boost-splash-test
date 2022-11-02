import React, { useState } from "react"
import { View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import AppHeader from "../../../components/app-header/AppHeader"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import InformationForm from "./components/information-form"
import AddressForm from "./components/address-form"
import { ScrollView } from "native-base"
import IdInfoForm from "./components/id-info-form"
import BankForm from "./components/bank-form"
import IdentityCard from "./components/identity-card"
import { useStores } from "../../../models"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import SettingAuthScreen from "../../../components/app-view-no-auth"
import { observer } from "mobx-react-lite"

interface Props {
}

const note = "Để thực hiện tính năng này, quý khách cần xác thực thông tin sau đây"

const EKYC = observer((props: Props) => {
  const {ekycStore, authStoreModel} = useStores()
  const [images, setImages] = useState({front: '', back: '', portrait: ''})
  const [errorText, setErrorText] = useState({identity: '', portrait: ''})
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(i18n.t("errors.requireEmail"))
      .email(i18n.t("errors.invalidEmail")),
    birthday: Yup.string().required(i18n.t("errors.requireDateOfBirth")),
    gender: Yup.string().required(i18n.t("errors.requireSex")),
    idNumber: Yup.string().required(i18n.t("errors.requireCitizenIdentification")),
    placeOfIssue: Yup.string().required(i18n.t("errors.requireIssuedBy")),
    address: Yup.string().required(i18n.t("errors.requireAddress")),
    tel: Yup.string().required(i18n.t("errors.requirePhone")),
    bank: Yup.string().required("Chọn địa ngân hàng"),
    bankNumber: Yup.string().required("Nhập số tài khoản ngân hàng"),
    province: Yup.string().required("Chọn tỉnh / thành phố"),
    district: Yup.string().required("Chọn quận / huyện"),
    commune: Yup.string().required("Chọn phường xã"),
  })
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onSubmit",
  })


  const handlePress = (data) => {
    if (!(images.front || images.back)){
      setErrorText({...errorText, identity: 'Vui lòng chụp ảnh CMND/CCCD'})
      return
    }
    if (!images.portrait) {
      setErrorText({...errorText, portrait: 'Vui lòng chụp ảnh chân dung'})
      return
    }
    const param = {
      fullName: data?.fullName,
      gender: data?.gender,
      birthday: data?.birthday,
      address: data?.address,
      districtId: data?.district,
      stateId: data?.province,
      subDistrictId: data?.commune,
      emails: [{email: data?.email}],
      tels: [{tel: data?.tel}],
      identification:{
        backSidePhoto:ekycStore?.backImage,
        frontPhoto:ekycStore?.frontImage,
        idNumber: data?.idNumber,
        issuedOn: data?.issuedOn,
        placeOfIssue: data?.placeOfIssue,
      }
    }
    ekycStore.updateUser(param)
    navigate(ScreenNames.TRADE_REGISTRATION)
  }
  return (
    <View style={styles.container}>
      <AppHeader headerText={"EKYC"} isBlue />
      {
        authStoreModel.isLoggedIn ?
          <ScrollView>
            <View style={styles.noteContainer}>
              <AppText value={note} style={styles.noteText} textAlign={"center"} />
            </View>
            <IdentityCard {...{images, setImages, errorText, setErrorText}}/>
            <InformationForm {...{ control, errors: { ...errors }, setValue, clearErrors }} />
            <AddressForm {...{ control, errors: { ...errors }, setValue, clearErrors, watch }} />
            <IdInfoForm {...{ control, errors: { ...errors }, setValue, clearErrors, watch }} />
            <BankForm {...{ control, errors: { ...errors }, setValue, clearErrors, watch }} />
            <View style={styles.btnContainer}>
              <AppButton tx={'common.continue'} onPress={handleSubmit(handlePress)} disable={!isValid}/>
            </View>
          </ScrollView>
          :
          <SettingAuthScreen />
      }
    </View>
  )
})

export default EKYC

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },
  noteText: {
    fontSize: "16@ms",
    fontFamily: fontFamily.medium,
  },
  noteContainer: {
    marginTop: "12@s",
    backgroundColor: color.palette.offWhite,
    paddingVertical: "8@s",
    paddingHorizontal: "16@s",
  },
  btnContainer: {
    paddingHorizontal: '16@s',
    paddingTop: '12@s',
    paddingBottom:'24@s'
  }
})
