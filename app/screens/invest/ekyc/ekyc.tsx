import React from "react"
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
import InformationForm from "./information-form"
import AddressForm from "./address-form"
import { ScrollView } from "native-base"

interface Props {
}

const note = "Để thực hiện tính năng này, quý khách cần xác thực thông tin sau đây"

const EKYC = React.memo((props: Props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(i18n.t("errors.requireEmail"))
      .email(i18n.t("errors.invalidEmail")),
    address: Yup.string().required(i18n.t("errors.requireAddress")),
    phone: Yup.string().required(i18n.t("errors.requirePhone")),
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
  return (
    <View style={styles.container}>
      <AppHeader headerText={"EKYC"} isBlue />
      <ScrollView>
        <View style={styles.noteContainer}>
          <AppText value={note} style={styles.noteText} textAlign={"center"} />
        </View>
        <InformationForm {...{ control, errors: { ...errors }, setValue, clearErrors }} />
        <AddressForm {...{ control, errors: { ...errors }, setValue, clearErrors, watch }} />
      </ScrollView>

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
})
