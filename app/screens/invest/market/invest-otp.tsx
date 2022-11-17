import React, { useCallback, useEffect, useRef, useState } from "react"
import { AppState, DeviceEventEmitter, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_BOLD_12, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { color } from "../../../theme"
import OtpField from "../../../components/otp-field/otp-field"
import AppButton from "../../../components/app-button/AppButton"
import { useStores } from "../../../models"
import { RouteProp, useIsFocused, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../../navigators/params-list"
import { ScreenNames } from "../../../navigators/screen-names"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { OTP_TIME } from "../../../constants/variable"
import AppModal from "../../../components/app-modal/app-modal"

interface Props {
}

const InvestOtp = React.memo((props: Props) => {
  const {
    params: {
      onSubmit,
      onResend,
      phone,
      otpTime = OTP_TIME.SYNC_ACCOUNT,
    },
  } = useRoute<RouteProp<NavigatorParamList, ScreenNames.INVEST_OTP>>()
  const [value, setValue] = useState("")
  const { ekycStore, authStoreModel } = useStores()
  const tel = phone ?? ekycStore.user?.tels?.[0]?.tel ?? authStoreModel?.user?.tels?.[0]?.tel ?? ''
  const [time, setTime] = useState(otpTime)
  const [isStartCheck, setStartCheck] = useState<boolean>(true)
  const [resendModal, setResendModal] = useState<boolean>(false)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  const _handleAppStateChange = (nextAppState: any) => {
    appState.current = nextAppState
    setAppStateVisible(appState.current)
  }

  useEffect(() => {
    AsyncStorage.setItem("otpTime", moment().toISOString())
    setValue("")
    setStartCheck(true)
    AppState.addEventListener("change", _handleAppStateChange)
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange)
    }
  }, [])

  useEffect(() => {
    DeviceEventEmitter.addListener("resend", (e) => {
      setResendModal(true)
      setTime(otpTime)
      AsyncStorage.setItem("otpTime", moment().toISOString())
      setStartCheck(true)
    })
    return () => {
      DeviceEventEmitter.removeListener("resend", ()=>{
        //
      })
    }
  }, [])

  useEffect(() => {
    const initOtpTime = async () => {
      if (appStateVisible === "active") {
        const createdAt = await AsyncStorage.getItem("otpTime")
        if (createdAt) {
          const timePassed = moment().diff(createdAt, "milliseconds")
          if (timePassed >= otpTime) {
            setTime(0)
            setStartCheck(false)
          } else {
            setTime(otpTime - timePassed)
          }
        }
      }
    }
    initOtpTime()
  }, [appStateVisible])

  useEffect(() => {
    if (isStartCheck) {
      const timeout = setInterval(() => {
        if (time > 0) {
          setTime(time > 1000 ? time - 1000 : 0)
        }
        if (time === 0) {
          setStartCheck(false)
          clearInterval(timeout)
        }
      }, 1000)
      return () => {
        clearInterval(timeout)
      }
    }
  }, [isStartCheck, time])

  const handleConfirm = useCallback(() => {
    onSubmit(value)
  }, [value])


  const handleResend = useCallback(async () => {
    if (time > 0) return
    setValue("")
    onResend()
  }, [value, time])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Xác thực OTP"} isBlue />
      <View style={styles.body}>
        <AppText value={"Mã OTP đã được gửi qua số điện thoại"} />
        <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
          <AppText value={tel} fontSize={ms(18)} fontFamily={fontFamily.bold} />
        </View>
        <OtpField {...{ value, setValue }} />
        <View style={[ROW, ALIGN_CENTER]}>
          <AppText value={"Gửi lại OTP "} underline style={FONT_BOLD_12}
                   color={time > 0 ? color.palette.grayChateau : color.palette.orange}
                   onPress={handleResend}
          />
          {time > 0 &&
            <AppText value={`(${moment(time).format("mm:ss")})`} />
          }
        </View>
      </View>

      <View style={styles.wrapBtn}>
        <AppButton title={"Xác nhận"} onPress={handleConfirm} disable={value.length < 6}/>
      </View>
      <AppModal visible={resendModal} closeModal={() => setResendModal(false)} content={"Gửi lại mã thành công"} />
    </View>
  )
})

export default InvestOtp

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },
  body: {
    flex: 1,
    paddingVertical: "24@s",
    paddingHorizontal: "16@s",
  },
  wrapBtn: {
    paddingVertical: "24@s",
    paddingHorizontal: "16@s",
  },
})
