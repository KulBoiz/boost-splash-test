import React, { Ref } from "react"
import { Modalize } from "react-native-modalize"
import { AppText } from "../../../components/app-text/AppText"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import FastImage from "react-native-fast-image"
import AppButton from "../../../components/app-button/AppButton"
import { images } from "../../../assets/images"
import { View } from "react-native"
import { color } from "../../../theme"
import { MARGIN_BOTTOM_8 } from "../../../styles/common-style"

interface Props {
  modalizeRef: Ref<any>
  type?: 'kyc' | 'sync'
  closeModal(): void
}

const SuccessModalize = React.memo(({ modalizeRef, closeModal, type = 'kyc' }: Props) => {
  const isKyc = type === 'kyc'
  const handlePress = React.useCallback(() => {
    closeModal()
    navigate(ScreenNames.HOME)
  }, [])

  const onClosed = () => {
    if (!isKyc){
      navigate(ScreenNames.HOME)
    }
  }

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modal}
      handlePosition={"inside"}
      adjustToContentHeight
      onClosed={onClosed}
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
    >
      <View style={styles.body}>
        <AppText value={"Thông báo"} center style={styles.title} />
        <FastImage source={images.invest_success} style={styles.image} />
        <AppText value={isKyc ? "Hoàn thành quá trình EKYC" : 'Đồng bộ tài khoàn thành công'} fontSize={ms(14)} fontFamily={fontFamily.medium} />
        <AppText value={"Cảm ơn quý khách"} fontSize={ms(24)} fontFamily={fontFamily.bold} color={color.primary}
                 style={MARGIN_BOTTOM_8} />
        {isKyc && <AppText value={"Nhân viên FINA đã nhận được yêu cầu từ bạn và sẽ phản hồi khi có kết quả EKYC"}
                  fontSize={ms(14)} color={color.palette.grayChateau} textAlign={"center"} />}
        <AppButton title={"Quay lại trang chủ"} onPress={handlePress} containerStyle={styles.btn} />
      </View>
    </Modalize>
  )
})

export default SuccessModalize

const styles = ScaledSheet.create({
  modal: {
    paddingVertical: "24@s",
    paddingHorizontal: "16@s",
  },
  body: {
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: "16@ms",
    marginBottom: "24@s",
    fontFamily: fontFamily.bold,
  },
  btn: {
    marginTop: "30@s",
    marginBottom: "30@s",
  },
  image: {
    width: "141@s",
    height: "126@s",
    marginBottom: "40@s",
  },
})
