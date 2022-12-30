import React from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { MARGIN_TOP_8 } from "../../../styles/common-style"
import DualButton from "../../../components/app-button/dual-button"

interface Props {
  visible: boolean,
  onPress(): void
  closeModal(): void
}

const SyncFailModal = React.memo((props: Props) => {
  const { visible, onPress, closeModal } = props
  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      onBackdropPress={closeModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.body}>
        <FastImage source={images.commission_cancel} style={styles.image} />
        <AppText value={'Đồng bộ tài khoản không thành công'} fontSize={ms(18)} color={color.primary} fontFamily={fontFamily.bold}/>
        <AppText value={'Vui lòng thử lại hoặc tạo tài khoản ngay để\nhoàn tất quá trình đăng ký'} textAlign={"center"} fontSize={ms(16)} style={MARGIN_TOP_8}/>
        <DualButton leftTitle={'Tạo tài khoản'} rightTitle={'Thử lại'} rightPress={closeModal} leftPress={onPress} style={styles.btn}/>
      </View>
    </Modal>
  )
})

export default SyncFailModal

const styles = ScaledSheet.create({
  container: {
    position: "relative", margin: 0, paddingHorizontal: "12@s",
  },
  body: {
    backgroundColor: color.background,
    borderRadius: "8@s",
    paddingTop: "32@s",
    paddingBottom:'16@s',
    alignItems: "center",
  },
  image: {
    width: '80@s',
    height: '80@s',
    marginBottom: '12@s'
  },
  btn: {
    marginTop: '24@s',
    paddingHorizontal: '16@s'
  }
})
