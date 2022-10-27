import React, { useCallback, useRef, useState } from "react"
import { View } from "react-native"
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

interface Props {
}

const TradeRegistration = React.memo((props: Props) => {
  const { ekycStore } = useStores()
  const modalizeRef = useRef<Modalize>(null)
  const [image, setImage] = useState()

  const onOpen = React.useCallback(() => {
    modalizeRef.current?.open()
  }, [])

  const onClose = React.useCallback(() => {
    modalizeRef.current?.close()
  }, [])

  const kycMio = useCallback(() => {
    const param = {
      ...ekycStore.user,
      urlSignature: ekycStore.signature?.url
    }
    ekycStore.kycMio(param).then(res=>{
      navigate(ScreenNames.INVEST_OTP)
    })
  },[image])

  const handleConfirm = React.useCallback(() => {
    kycMio()
  }, [])

  const navigateToPhotoPicker = useCallback(() => {
    const onConfirm = (photoSelected: any) => {
      setImage(photoSelected)
      ekycStore.uploadImage("signature", photoSelected)
      kycMio()
    }
    navigate(ScreenNames.PHOTO_PICKER, {
      onConfirm,
    })
  }, [image])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Giấy ĐKGD"} isBlue />
      <View style={styles.body}>
        <View style={{ flex: 1 }}>
          <View style={[ROW, SPACE_BETWEEN, styles.box]}>
            <View style={[ROW, ALIGN_CENTER]}>
              <FastImage source={images.vinacapital} style={{ width: s(34), height: s(34) }} />
              <AppText value={"VINACAPITAL"} style={FONT_BOLD_14} />
            </View>
            <View style={[ROW, ALIGN_CENTER]}>
              <AppText value={"Chưa ký"} color={color.palette.deepGray} />
              <FastImage source={images.common_circle_checked} style={styles.icon} />
            </View>
          </View>
        </View>
        <Signature modalizeRef={modalizeRef} handleConfirm={handleConfirm} closeModal={onClose} />
        <DualButton leftTitle={"Tải ảnh lên"} rightTitle={"Ký điện tử"} rightPress={onOpen}
                    leftPress={navigateToPhotoPicker} />
      </View>

    </View>
  )
})

export default TradeRegistration

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: "16@s",
    paddingBottom: "24@s",
  },
  box: {
    borderWidth: 1,
    borderRadius: "8@s",
    borderColor: "#E9EBEF",
    padding: "12@s",
  },
  icon: {
    width: "24@s",
    height: "24@s",
  },
})
