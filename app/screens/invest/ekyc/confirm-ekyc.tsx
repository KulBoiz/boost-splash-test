import React, { useState } from "react"
import { Alert, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { FONT_REGULAR_14, MARGIN_BOTTOM_4, MARGIN_TOP_24 } from "../../../styles/common-style"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InformationForm from "./components/information-form"
import { color } from "../../../theme"
import IdInfoForm from "./components/id-info-form"
import DualButton from "../../../components/app-button/dual-button"
import BankForm from "./components/bank-form"
import AddressForm from "./components/address-form"
import RenderFlatStep from "../../../components/render-flat-step"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { useStores } from "../../../models"
import { COMMON_ERROR } from "../../../constants/variable"
import moment from "moment"
import SignKycModal from "./components/sign-modal"
import ConfirmModal from "../../../components/app-modal/confirm-modal"

interface Props {
}

const ConfirmEkyc = React.memo((props: Props) => {
  const { ekycStore, authStoreModel } = useStores()
  const [position, setPosition] = useState(0)
  const [visible, setVisible] = useState(false)
  const [syncModal, setSyncModal] = useState(false)
  const firstValidationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(i18n.t("errors.requireEmail"))
      .email(i18n.t("errors.invalidEmail")),
    tel: Yup.string().required(i18n.t("errors.requirePhone")),
  })

  const secondValidationSchema = Yup.object().shape({
    bankAccountHolder: Yup.string().required("Nhập tên chủ tài khoản"),
    bankId: Yup.string().required("Chọn ngân hàng"),
    bankAccount: Yup.string().required("Nhập số tài khoản"),
  })
  const thirdValidationSchema = Yup.object().shape({
    commune: Yup.string().required("Chọn phường/ xã"),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: position === 0 ? yupResolver(firstValidationSchema) : position === 1 ? yupResolver(secondValidationSchema) : yupResolver(thirdValidationSchema),
    reValidateMode: "onChange",
  })


  const handleContinue = React.useCallback(data => {
    const param = {
      address: data.address,
      avatar: ekycStore.portraitImage?.url,
      banks: [{ bankAccount: data.bankAccount, bankAccountHolder: data.bankAccountHolder, bankId: data.bankId }],
      birthday: moment(data.birthday, "DD-MM-YYYY").toISOString(),
      districtId: data.district,
      emails: [{ email: data.email }],
      fatca:{fatca1: 'false', fatca2: 'false', fatca3: 'false'},
      fullName: data.fullName,
      gender: data.gender,
      idNumber: data.idNumber,
      identification: {
        issuedOn: moment(data.issuedOn, "DD-MM-YYYY").toISOString(),
        placeOfIssue: data.placeOfIssue,
        frontPhoto: ekycStore.frontImage,
        backSidePhoto: ekycStore.backImage,
      },
      stateId: data.province,
      subDistrictId: data.commune,
      tels: [{ tel: data.tel }],
    }

    if (position < 2) {
      setPosition(position + 1)
      return
    }
    ekycStore.kycMio(param).then((res) => {
      const message = res?.error?.message
      const code = res?.error?.code
      if (res?.error || res?.kind !== "ok") {
        if (code ===  40035 || code === 40026 || code === 40025 ) {
          setSyncModal(true)
          return
        }
        Alert.alert(message ?? COMMON_ERROR)
        return
      }
      ekycStore.updateUser(param)
      setVisible(true)
      authStoreModel.getFullInfoUser()
    })
  }, [position])

  const handleCancel = React.useCallback(() => {
    navigate(ScreenNames.HOME)
  }, [position])

  const pressContinue = React.useCallback(() => {
    setVisible(false)
    navigate(ScreenNames.TRADE_REGISTRATION)
    authStoreModel.getFullInfoUser(authStoreModel?.userId)
  }, [])

  const renderStep = React.useCallback(() => {
    switch (position) {
      case 0: {
        return (
          <View>
            <InformationForm {...{ control, errors: { ...errors }, setValue, clearErrors }} />
            <IdInfoForm {...{ control, errors: { ...errors }, setValue, clearErrors, watch }} />
          </View>
        )
      }
      case 1: {
        return <BankForm {...{ control, errors: { ...errors }, setValue, clearErrors, watch }} />
      }
      case 2: {
        return <AddressForm {...{ control, errors: { ...errors }, setValue, clearErrors, watch }} />
      }
    }
  }, [position])

  const closeModal = React.useCallback(() => {
    setVisible(false)
    navigate(ScreenNames.HOME)
  }, [])

  const handleSync = React.useCallback(()=> {
    setSyncModal(false)
    navigate(ScreenNames.SYNC_ACCOUNT)
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"EKYC"} isBlue />
      <RenderFlatStep currentPosition={position} stepCount={3} style={styles.step} />
      <KeyboardAwareScrollView>
        <AppText value={"Xác nhận lại thông tin"} style={[MARGIN_BOTTOM_4, MARGIN_TOP_24]} fontSize={ms(20)}
                 fontFamily={fontFamily.regular} textAlign={"center"} />
        <AppText value={"Vui lòng xem lại và xác nhận các thông tin dưới đây chính xác"} textAlign={"center"}
                 style={FONT_REGULAR_14} />
        {renderStep()}
      </KeyboardAwareScrollView>
      <DualButton leftTitle={"Huỷ"} rightTitle={"Tiếp tục"} style={styles.btn}
                  rightPress={handleSubmit(handleContinue)}
                  leftPress={handleCancel} />
      <SignKycModal visible={visible} closeModal={closeModal} onPress={pressContinue} />
      <ConfirmModal visible={syncModal} closeModal={() => setSyncModal(false)}
                    onPress={handleSync} title={'Thông tin tài khoản đã tồn tại\nvui lòng đồng bộ tài khoản'} />
    </View>
  )
})

export default ConfirmEkyc

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingBottom: "24@s",
  },
  step: {
    paddingHorizontal: "16@s",
  },
  btn: {
    paddingHorizontal: "16@s",
  },
})
