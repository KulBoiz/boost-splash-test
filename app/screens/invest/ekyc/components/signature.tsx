import React, { Ref, useCallback, useRef, useState } from "react"
import { Modalize } from "react-native-modalize"
import { AppText } from "../../../../components/app-text/AppText"
import { fontFamily } from "../../../../constants/font-family"
import { ms, ScaledSheet } from "react-native-size-matters"
import DualButton from "../../../../components/app-button/dual-button"
import { color } from "../../../../theme"
import SignatureCapture from "react-native-signature-capture"
import { MARGIN_BOTTOM_24, MARGIN_TOP_16 } from "../../../../styles/common-style"
import { useStores } from "../../../../models"
import { Alert } from "react-native"


interface Props {
  modalizeRef: Ref<any>
  closeModal(): void
  handleConfirm(): void
}

const Signature = React.memo((props: Props) => {
  const { modalizeRef, handleConfirm , closeModal} = props
  const {ekycStore} = useStores()
  const signRef = useRef(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [checkSign, setCheckSign] = useState<boolean>(false)

  const resetSign = React.useCallback(() => {
    setCheckSign(false)
    // @ts-ignore
    signRef?.current?.resetImage()
  }, [])

  const _onSaveEvent = React.useCallback((result) => {
    setLoading(true)
    ekycStore.uploadBase64(result?.encoded).then(() => {
      setLoading(false)
      handleConfirm()
    }).catch((err) => {
      setLoading(false)
      Alert.alert(err)
    })
  }, [])

  const _onDragEvent = useCallback(() => {
    setCheckSign(true)
  }, [])

  const onSubmit = () => {
    // @ts-ignore
    signRef?.current?.saveImage()
    closeModal()
  }

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modal}
      handlePosition={"inside"}
      adjustToContentHeight
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
    >
      <AppText value={"Chữ ký của bạn"} center style={styles.title} textAlign={"center"} />
      <SignatureCapture
        ref={signRef}
        style={styles.signature}
        strokeColor={color.palette.lightBlack}
        showTitleLabel={false}
        showNativeButtons={false}
        showBorder={false}
        minStrokeWidth={5}
        maxStrokeWidth={5}
        onSaveEvent={_onSaveEvent}
        onDragEvent={_onDragEvent}
      />
      <AppText value={"Ký tên của bạn ở giữa màn hình"} center fontSize={ms(16)} fontFamily={fontFamily.regular}
               textAlign={"center"} />

      <DualButton leftTitle={"Đặt lại"} rightTitle={"Xác nhận"} leftPress={resetSign} rightPress={onSubmit}
                  style={[MARGIN_BOTTOM_24, MARGIN_TOP_16]} />
    </Modalize>
  )
})

export default Signature

const styles = ScaledSheet.create({
  container: {},
  modal: {
    padding: "16@s",

  },
  signature: {
    height: "350@s",
  },
  title: {
    fontSize: "16@ms",
    fontFamily: fontFamily.semiBold,
  },
})
