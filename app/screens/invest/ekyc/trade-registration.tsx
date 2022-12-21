import React, { useCallback, useEffect, useRef, useState } from "react"
import { Alert, DeviceEventEmitter, Linking, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { Modalize } from "react-native-modalize"
import DualButton from "../../../components/app-button/dual-button"
import Signature from "./components/signature"
import { s, ScaledSheet } from "react-native-size-matters"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { AppText } from "../../../components/app-text/AppText"
import { ALIGN_CENTER, FONT_BOLD_14, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { useStores } from "../../../models"
import { color } from "../../../theme"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import SuccessModalize from "./success-modalize"
import { useIsFocused } from "@react-navigation/native"
import { COMMON_ERROR, OTP_TIME } from "../../../constants/variable"
import { observer } from "mobx-react-lite"
import WebView from "react-native-webview"
import * as FileSystem from "expo-file-system"
import { openFile } from "../../../utils/file"
import { find } from "../../../utils/lodash-utils"

interface Props {
}

const lineColor = "#E9EBEF"

const TradeRegistration = observer((props: Props) => {
  const { ekycStore, investStore, appStore } = useStores()
  const modalizeRef = useRef<Modalize>(null)
  const modalizeSuccessRef = useRef<Modalize>(null)
  const isFocused = useIsFocused()
  const [contractLink, setContractLink] = useState('https://')
  const [isSigned,setIsSigned] = useState<boolean | string | number>(false)
  const hasContractLink = contractLink !== 'https://'

  useEffect(()=> {
    ekycStore.checkContractStatus().then(res => {
      const isFullSubmission = res?.isFullSubmission
      const contractFileUrl = res?.contractFileUrl
      setIsSigned(isFullSubmission)
      if (contractFileUrl){
        setContractLink(contractFileUrl)
      }
    })
  },[isFocused])

  const openLink = React.useCallback(()=> {
    const localPath = FileSystem.cacheDirectory + 'contract'
    const fileExists = find(appStore?.filesDownloaded, (f) => f === localPath)
    if (fileExists) {
      openFile(fileExists)
    }
    else {
      FileSystem.downloadAsync(contractLink, localPath)
        .then(({ uri }) => {
          appStore?.addFileDownloaded(localPath)
          openFile(uri)
        })
        .catch(()=> {
          Linking.openURL(contractLink)
        })
    }
  },[contractLink])

  const onOpen = React.useCallback(() => {
    modalizeRef.current?.open()
  }, [])

  const onOpenSuccess = React.useCallback(() => {
    modalizeSuccessRef.current?.open()
  }, [])

  const onClose = React.useCallback(() => {
    modalizeRef.current?.close()
  }, [])

  const onCloseSuccess = React.useCallback(() => {
    modalizeSuccessRef.current?.close()
  }, [])

  const onSubmit = useCallback((otpCode)=> {
    ekycStore.verifySignContractOtp(otpCode)
      .then(res=> {
        if (res?.error){
          DeviceEventEmitter.emit('errorOtp', {error: res?.error?.message ?? COMMON_ERROR})
          return
        }
        navigate(ScreenNames.TRADE_REGISTRATION)
        onOpenSuccess()
        investStore.getKycPhone()
      })
  },[])

  const onResend = useCallback(()=> {
    ekycStore.resendSignContractOtp()
      .then(res=> {
        if (res?.error){
          Alert.alert(res?.error?.message)
          return
        }
        DeviceEventEmitter.emit('resend')
      })
  },[])

  const kycMio = useCallback(() => {
    const urlSignature = ekycStore.signature?.url

    ekycStore.signContractMio(urlSignature).then(res => {
      if (!res?.error) {
        navigate(ScreenNames.INVEST_OTP, {onSubmit, onResend, otpTime: OTP_TIME.SIGN_CONTRACT})
        return
      }
      Alert.alert(res?.error?.message)
    })
  }, [])

  const handleConfirm = React.useCallback(() => {
    kycMio()
  }, [])

  const handleCancel = useCallback(() => {
    navigate(ScreenNames.HOME)
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Giấy ĐKGD"} isBlue onLeftPress={handleCancel}/>
      <View style={styles.body}>
        <View style={styles.box}>
          <View style={[ROW, SPACE_BETWEEN, styles.underline]}>
            <View style={[ROW, ALIGN_CENTER]}>
              <FastImage source={images.vinacapital} style={{ width: s(34), height: s(34) }} />
              <AppText value={"VINACAPITAL"} style={FONT_BOLD_14} />
            </View>
            <View style={[ROW, ALIGN_CENTER]}>
              <AppText value={isSigned ? 'Đã ký' : "Chưa ký"} color={isSigned ? color?.palette.green : color.palette.deepGray} />
              <FastImage source={images.common_circle_checked} style={styles.icon} tintColor={isSigned ? color.palette.green : ''}/>
            </View>
          </View>
          <AppText value={isSigned ? 'Tải hợp đồng đã ký' : 'XEM GIẤY ĐKGD'} textAlign={"center"} underline color={color.primary} onPress={openLink}/>
        </View>
        {!hasContractLink &&<View style={{ flex: 1 }} />}
        {hasContractLink && <WebView source={{ uri: contractLink }} style={styles.webViewContainer}/>}

        <SuccessModalize modalizeRef={modalizeSuccessRef} closeModal={onCloseSuccess} />
        <Signature modalizeRef={modalizeRef} handleConfirm={handleConfirm} closeModal={onClose} />
        {!isSigned && <DualButton leftTitle={"Lưu và thoát"} rightTitle={"Ký tên"} rightPress={onOpen}
                    leftPress={handleCancel} /> }
      </View>

    </View>
  )
})

export default TradeRegistration

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  body: {
    flex: 1,
    padding: "16@s",
    paddingBottom: "24@s",
  },
  webViewContainer: {
    marginTop: '6@s',
    marginBottom: '20@s',
    height: '80%',
    flex:1,
    borderWidth: 1,
    borderColor: lineColor,
    borderRadius: '8@s'
  },
  underline: {
    borderBottomWidth: 1,
    paddingBottom: '12@s',
    marginBottom: '12@s',
    borderBottomColor: lineColor
  },
  box: {
    borderWidth: 1,
    borderRadius: "8@s",
    borderColor: lineColor,
    padding: "12@s",
  },
  icon: {
    width: "24@s",
    height: "24@s",
  },
})
