import React, { useRef } from "react"
import { Alert, DeviceEventEmitter, View } from "react-native"
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
import { Modalize } from "react-native-modalize"
import SuccessModalize from "./success-modalize"
import { COMMON_ERROR, OTP_TIME } from "../../../constants/variable"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface Props {
}

const SyncAccount = React.memo((props: Props) => {
  const { ekycStore, authStoreModel, investStore } = useStores()
  const modalizeSuccessRef = useRef<Modalize>(null)

  const validationSchema = Yup.object().shape({
    tel: Yup.string().required(i18n.t("errors.requirePhone")),
    idNumber: Yup.string().required(i18n.t("errors.requireCitizenIdentification")),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const onOpenSuccess = React.useCallback(() => {
    modalizeSuccessRef.current?.open()
  }, [])

  console.log(modalizeSuccessRef.current)

  const onCloseSuccess = React.useCallback(() => {
    modalizeSuccessRef.current?.close()
  }, [])

  const onSubmit = React.useCallback( (otpCode) => {
    ekycStore.verifySyncMioOtp(otpCode)
      .then(async res => {
        if (res?.error) {
          Alert.alert(res?.error?.message)
          return
        }
        navigate(ScreenNames.SYNC_ACCOUNT)
        onOpenSuccess()
        await authStoreModel.getFullInfoUser()
        await investStore.getKycPhone()
      })
  }, [])

  const onResend = React.useCallback(() => {
    ekycStore.resendSignContractOtp()
      .then(res => {
        if (res?.error) {
          Alert.alert(res?.error?.message)
          return
        }
        DeviceEventEmitter.emit('resend')
      })
  }, [])

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
        navigate(ScreenNames.INVEST_OTP, { onResend, onSubmit, phone: data.tel, otpTime: OTP_TIME.SYNC_ACCOUNT })
      })
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText="Đồng bộ tài khoản" isBlue />
      <KeyboardAwareScrollView bounces={false} style={styles.body}>
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
      </KeyboardAwareScrollView>
      <SuccessModalize type={"sync"} modalizeRef={modalizeSuccessRef} closeModal={onCloseSuccess} />

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
