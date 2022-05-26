import React, { useCallback, useState } from "react"
import { Image, View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { CardIdBackSvg, CardIdFrontSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import AppButton from "../../../components/app-button/AppButton"

interface Props {
  type: "front" | "back"
  image: string
  isSelect?: boolean
  onReTake?: (type) => void
}

const PreviewPhotoId = React.memo((props: Props) => {
  const { type = "front", image, isSelect } = props
  const [modalVisible, setModalVisible] = useState(false)

  const showModalConfirm = useCallback(() => setModalVisible(true), [])
  const hideModalConfirm = useCallback(() => setModalVisible(false), [])
  const onReTake = useCallback(() => {
    hideModalConfirm()
    props.onReTake?.(type)
  }, [type, props.onReTake])

  return (
    <TouchableOpacity
      onPress={showModalConfirm}
      activeOpacity={0.7}
      disabled={!image}
      style={[styles.previewWrap, { opacity: image || !isSelect ? 0.5 : 1 }]}
    >
      <View style={styles.previewWrap}>
        {image ? (
          <Image source={{ uri: image }} style={styles.previewStyle} />
        ) : type === "front" ? (
          <CardIdFrontSvg />
        ) : (
          <CardIdBackSvg />
        )}
        {!!image && (
          <View style={styles.reTakeButton}>
            <AppText
              value="Chụp lại"
              fontFamily="Inter-Bold"
              color={color.palette.BABABA}
              fontSize={s(10)}
            />
          </View>
        )}
      </View>
      <AppText
        value={type === "front" ? "Mặt trước" : "Mặt sau"}
        fontFamily="Inter-SemiBold"
        color={color.text}
        fontSize={s(12)}
        style={styles.previewText}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={hideModalConfirm}
        onBackButtonPress={hideModalConfirm}
      >
        <View style={styles.modal}>
          <AppText
            value={`Bạn muốn chụp lại ${
              type === "front" ? "mặt trước" : "mặt sau"
            } CMND / CCCD / Hộ chiếu?`}
            fontFamily="Inter-Medium"
            color={color.palette.lightBlack}
            fontSize={s(16)}
          />
          <View style={styles.modalRow}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={hideModalConfirm}
              activeOpacity={0.7}
            >
              <AppText
                value="Huỷ"
                fontFamily="Inter-SemiBold"
                color={color.palette.blue}
                fontSize={s(14)}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnConfirm} activeOpacity={0.7} onPress={onReTake}>
              <AppText
                value="Chụp lại"
                fontFamily="Inter-SemiBold"
                color={color.palette.white}
                fontSize={s(14)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  )
})

export default PreviewPhotoId

const styles = ScaledSheet.create({
  previewWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  previewText: {
    marginTop: "4@vs",
  },
  previewStyle: {
    width: "124@s",
    height: "81@s",
    borderRadius: "8@s",
  },
  reTakeButton: {
    width: "56@s",
    height: "22@s",
    borderRadius: 3,
    backgroundColor: color.palette.lightBlue,
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: "24@s",
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "24@s",
  },
  btnCancel: {
    flex: 1,
    height: 49,
    borderRadius: 8,
    backgroundColor: color.palette.lightBlue,
    borderWidth: 1,
    borderColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  btnConfirm: {
    flex: 1,
    height: 49,
    borderRadius: 8,
    backgroundColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "16@s",
  },
})
