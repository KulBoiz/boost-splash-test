import React, { useCallback, useEffect, useRef, useState } from "react"
import { Alert, AppState, DeviceEventEmitter, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_BOLD_12, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { color } from "../../../theme"
import OtpField from "../../../components/otp-field/otp-field"
import AppButton from "../../../components/app-button/AppButton"
import { useStores } from "../../../models"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../../navigators/params-list"
import { ScreenNames } from "../../../navigators/screen-names"
import AsyncStorage from "@react-native-async-storage/async-storage"
import moment from "moment"
import { OTP_TIME } from "../../../constants/variable"
import AppModal from "../../../components/app-modal/app-modal"
import { navigate } from "../../../navigators"

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
  const [disable, setDisable] = useState(false)
  const [errorCount, setErrorCount] = useState(0)
  const [errorModal, setErrorModal] = useState(false)
  const [value, setValue] = useState("")
  const { ekycStore, authStoreModel, investStore } = useStores()
  const [time, setTime] = useState(otpTime)
  const [isStartCheck, setStartCheck] = useState<boolean>(true)
  const [resendModal, setResendModal] = useState<boolean>(false)
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)
  const valid = value.length === 6
  const tel = phone ?? investStore?.phone ?? ekycStore.user?.tels?.[0]?.tel ?? authStoreModel?.user?.tels?.[0]?.tel ?? ""

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
      AppState.addEventListener("change", _handleAppStateChange).remove()
    }
  }, [])

  useEffect(() => {
    DeviceEventEmitter.addListener("resend", (e) => {
      setResendModal(true)
      setTime(otpTime)
      AsyncStorage.setItem("otpTime", moment().toISOString())
      setStartCheck(true)
    })

    DeviceEventEmitter.addListener("errorOtp", (e) => {
      setErrorCount(errorCount + 1)
      if (errorCount < 3){
        Alert.alert(e?.error)
      }
      if (errorCount === 3) {
        setErrorModal(true)
      }
    })
    return () => {
      DeviceEventEmitter.removeAllListeners()
    }
  }, [errorCount])

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

  const handleError = useCallback(()=> {
    setErrorModal(false)
    navigate(ScreenNames.HOME)
  },[])

  const handleConfirm = useCallback(() => {
    setDisable(true)
    onSubmit(value)
    setTimeout(()=>{
      setDisable(false)
    }, 5000)
  }, [value, disable])


  const handleResend = useCallback( () => {
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
        <View style={[ROW, ALIGN_CENTER, styles.resend]}>
          {time <= 0 &&
            <AppText value={"Gửi lại OTP "} underline style={FONT_BOLD_12}
                     color={color.palette.orange}
                     onPress={handleResend}
            />
          }
          {time > 0 &&
            <AppText value={`(${moment(time).format("mm:ss")})`} />
          }
        </View>
      </View>

      <View style={styles.wrapBtn}>
        <AppButton title={"Xác nhận"} onPress={handleConfirm} disabled={disable}  />
      </View>
      <AppModal visible={resendModal} closeModal={() => setResendModal(false)} content={"Gửi lại mã thành công"} />
      <AppModal visible={errorModal} closeModal={handleError} content={"Bạn đã nhập sai OTP quá 3 lần, vui lòng thử lại sau"} />
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
  resend: {
    justifyContent: "center",
  },
})
