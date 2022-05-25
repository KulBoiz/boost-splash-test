import React from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import FastImage from "react-native-fast-image"
import { width } from "../../../constants/variable"

interface Props {
  visible: boolean
  image: string
  closeModal?(): void
  onPress?(): void
}

const PreviewModal = React.memo((props: Props) => {
  const { visible, image, closeModal, onPress } = props
  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={closeModal}
    >
      <View style={styles.body}>
        <FastImage source={{ uri: image }} style={styles.image} />
      </View>
    </Modal>
  )
})

export default PreviewModal

const styles = ScaledSheet.create({
  container: {
    position: "relative",
    margin: 0,
    paddingHorizontal: "16@ms",
  },
  body: {
    backgroundColor: color.background,
    borderRadius: "8@s",
    width: 346,
    alignSelf: "center",
  },
  image: {
    width: 346,
    height: 216,
    alignSelf: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: "48%",
    height: "40@s",
    borderRadius: "8@s",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: color.palette.blue,
    fontSize: "12@ms",
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: color.palette.blue,
    backgroundColor: color.background,
  },
  submitBtn: {
    backgroundColor: color.palette.blue,
  },
})
