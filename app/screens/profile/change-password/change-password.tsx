import React from "react"
import { View, StyleSheet } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import i18n from "i18n-js"
import ChangePasswordForm from "./change-password-form"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import { ALIGN_CENTER, FONT_BOLD_14, FONT_REGULAR_12, MARGIN_TOP_16, ROW } from "../../../styles/common-style"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { presets } from "../../../constants/presets"

interface Props {
}

const Item = React.memo(({ text }: { text:string }) => {
  return (
    <View style={[ROW, ALIGN_CENTER, MARGIN_TOP_16]}>
      <FastImage source={images.common_circle_checked} style={styles.icon} tintColor={color.primary}/>
      <AppText value={text} style={FONT_REGULAR_12}/>
    </View>
  )
})

const ChangePassword = React.memo((props: Props) => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required(i18n
      .t("errors.requirePassword")).trim()
      .min(8, "Mật khẩu cần ít nhất 8 ký tự"),
    newPassword: Yup.string().required(i18n
      .t("errors.requirePassword")).trim()
      .min(8, "Mật khẩu cần ít nhất 8 ký tự"),
    confirmNewPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), null], i18n.t("errors.passwordNotMatch")),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const renderRightIcon = React.useMemo(()=> {
    return <AppText value={'Lưu'} style={presets.label_16} color={color.text}/>
  },[])
  
  return (
    <View style={styles.container}>
      <AppHeader headerText={"Đổi mật khẩu"} isBlue renderRightIcon={renderRightIcon} />
      <ChangePasswordForm {...{ control, errors: { ...errors } }} />
      <View style={styles.body}>
        <AppText value={"Mật khẩu phải bao gồm:"} style={FONT_BOLD_14} />
        <Item text={'Chiều dài tối thiểu là 8'}/>
        <Item text={'Bao gồm chữ thường (a-z) và chữ in hoa (A-Z)'}/>
        <Item text={'Chứa ít nhất một số (0-9) hoặc ký hiệu đặc biệt'}/>
      </View>
    </View>
  )
})

export default ChangePassword

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: color.background },
  body: {
    paddingHorizontal: '16@s',
    marginTop:"20@s"
  },
  icon: {
    width: "16@s",
    height: "16@s",
    marginRight: '8@s'
  },
})
