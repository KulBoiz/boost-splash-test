import React, { useState } from "react"
import { View } from "react-native"
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

interface Props {
}

const ConfirmEkyc = React.memo((props: Props) => {
  const [position, setPosition] = useState(0)
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(i18n.t("errors.requireEmail"))
      .email(i18n.t("errors.invalidEmail")),
    birthday: Yup.string().required(i18n.t("errors.requireAddress")),
    gender: Yup.string().required(i18n.t("errors.gender")),
    idNumber: Yup.string().required(i18n.t("errors.gender")),
    placeOfIssue: Yup.string().required(i18n.t("errors.gender")),
    address: Yup.string().required(i18n.t("errors.requireAddress")),
    tel: Yup.string().required(i18n.t("errors.requirePhone")),
    bankName: Yup.string().required("Chọn địa ngân hàng"),
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
    reValidateMode: "onChange",
  })
  const handleContinue = React.useCallback(() => {
    setPosition(position + 1)
  }, [position])

  const renderStep = React.useCallback(() => {
    switch (position) {
      case 0: {
        return (
          <View>
            <InformationForm {...{ control, errors: { ...errors }, setValue, clearErrors }} />
            <IdInfoForm {...{ control, errors: { ...errors }, setValue, clearErrors }} />
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
      <DualButton leftTitle={"Huỷ"} rightTitle={"Tiếp tục"} style={styles.btn} rightPress={handleContinue} />
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
