import React, { useRef } from "react"
import { Alert, View } from "react-native"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import FormInput from "../../../components/form-input/form-input"
import AppHeader from "../../../components/app-header/AppHeader"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import { presets } from "../../../constants/presets"
import DualButton from "../../../components/app-button/dual-button"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { useStores } from "../../../models"
import { COMMON_ERROR } from "../../../constants/variable"
import { Modalize } from "react-native-modalize"
import SuccessModalize from "./success-modalize"

interface Props {
}

const SyncAccount = React.memo((props: Props) => {
  const { ekycStore } = useStores()
  const modalizeSuccessRef = useRef<Modalize>(null)

  const validationSchema = Yup.object().shape({
    tel: Yup.string().required(i18n.t("errors.requirePhone")),
    idNumber: Yup.string().required(i18n.t("errors.requireCitizenIdentification")),
  })
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  const onOpenSuccess = React.useCallback(() => {
    modalizeSuccessRef.current?.open()
  }, [])

  const onCloseSuccess = React.useCallback(() => {
    modalizeSuccessRef.current?.close()
  }, [])

  const onSubmit = React.useCallback((otpCode) => {
    ekycStore.verifySyncMioOtp(otpCode)
      .then(res=> {
        if (res?.error){
          Alert.alert(res?.error?.message)
          return
        }
        navigate(ScreenNames.SYNC_ACCOUNT)
        onOpenSuccess()
      })
  }, [])

  const onResend = React.useCallback(() => {
    ekycStore.resendSignContractOtp()
      .then(res=> {
        if (res?.error){
          Alert.alert(res?.error?.message)
        }
      })  }, [])

  const leftPress = React.useCallback(() => {
    navigate(ScreenNames.HOME)
  }, [])

  const rightPress = React.useCallback((data) => {
    ekycStore.syncAccount(data.tel, data.idNumber)
      .then(res => {
        if (res?.error || res?.kind !== 'ok') {
          Alert.alert(res?.error?.message ?? COMMON_ERROR)
          return
        }
        navigate(ScreenNames.INVEST_OTP, { onResend, onSubmit })
      })
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText="Đồng bộ tài khoản" isBlue />
      <View style={styles.body}>
        <AppText value={"Thông tin tài khoản"} style={presets.label} />
        <FormInput
          {...{
            required: true,
            name: "tel",
            labelTx: "label.phoneNumber",
            placeholderTx: "placeholder.phone",
            control,
            error: errors?.tel?.message,
          }}
        />
        <FormInput
          {...{
            required: true,
            name: "idNumber",
            labelTx: "label.citizenIdentification",
            placeholderTx: "placeholder.citizenIdentification",
            control,
            error: errors?.idNumber?.message,
          }}
        />
      </View>
      <SuccessModalize type={'sync'} modalizeRef={modalizeSuccessRef} closeModal={onCloseSuccess} />

      <DualButton leftTitle={"Hủy bỏ"} rightTitle={"Xác nhận"} leftPress={leftPress}
                  rightPress={handleSubmit(rightPress)} style={styles.btn} />
    </View>
  )
})

export default SyncAccount

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingBottom: "24@s",
  },
  body: {
    flex: 1,
    paddingTop: "24@s",
    paddingHorizontal: "16@s",
  },
  btn: {
    paddingHorizontal: "16@s",
  },
})
