import React, { useCallback, useRef } from "react"
import { Alert, Image, Platform, View } from "react-native"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import AppHeader from "../../../components/app-header/AppHeader"
import { ms, ScaledSheet } from "react-native-size-matters"
import { CaptureButtonSvg, PhotoSvg } from "../../../assets/svgs"
import { color } from "../../../theme"
import { COMMON_ERROR, height, isAndroid, width } from "../../../constants/variable"
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"
import { RNHoleView } from "react-native-hole-view"
import { useStores } from "../../../models"
import { useIsFocused } from "@react-navigation/native"
import ActionItem from "../../agent/components/action-item"
import { AppText } from "../../../components/app-text/AppText"
import { ALIGN_CENTER, FONT_MEDIUM_14, MARGIN_TOP_24 } from "../../../styles/common-style"
import { presets } from "../../../constants/presets"
import AppButton from "../../../components/app-button/AppButton"
import { observer } from "mobx-react-lite"

const frameWidth = width * 0.8
const frameHeight = height * 0.5
const frameX = width * 0.1
const frameY = height * 0.15
const guide = "Xin đưa khuôn mặt của bạn vào giữa\nkhung hình và nhấn chụp ảnh."

const EKYCPortrait = observer(() => {
  const { ekycStore } = useStores()
  const isFocused = useIsFocused()
  const cameraRef = useRef<any>(null)
  const [image, setImage] = React.useState<string| null>(null)
  const devices = useCameraDevices()
  const device = devices.front

  const setPhoto = useCallback(
    (photo) => {
      setImage(photo)
    },
    [],
  )

  const takePhoto = useCallback(async () => {
    const options = { skipMetadata: true }
    const data =
      Platform.OS === "ios"
        ? await cameraRef.current.takePhoto(options)
        : await cameraRef.current.takeSnapshot(options)
    const imageWidth = Math.min(data.height, data.width)
    const imageHeight = Math.max(data.height, data.width)
    const manipResult = await manipulateAsync(
      data.path,
      [
        {
          crop:
            Platform.OS === "ios"
              ? {
                width: imageWidth * 0.8,
                height: imageHeight * 0.5,
                originX: imageWidth * 0.1,
                originY: imageHeight * 0.15,
              }
              : {
                width: data.width * 0.8,
                height: data.height * 0.5,
                originX: data.width * 0.1,
                originY: imageHeight * 0.15,
              },
        },
      ],
      {
        compress: 1,
        format: SaveFormat.PNG,
      },
    )
    setPhoto(manipResult.uri)
  }, [cameraRef, setPhoto])

  const navigateToPhotoPicker = useCallback(() => {
    const onConfirm = (photoSelected: any) => {
      setPhoto(photoSelected)
    }
    navigate(ScreenNames.PHOTO_PICKER, {
      onConfirm,
    })
  }, [setPhoto])

  const onReTake = useCallback(
    () => {
      setImage(null)
    },
    [image],
  )

  const onContinue = useCallback(() => {
    ekycStore.uploadImage("portrait", image)
      .then(() => navigate(ScreenNames.CONFIRM_EKYC))
      .catch(() => Alert.alert(COMMON_ERROR))
  }, [image])

  return (
    <View style={styles.container}>
      {device != null ? (
        image ? <Image source={{ uri: image }} style={styles.image} /> :
          <Camera
            style={styles.camera}
            ref={cameraRef}
            device={device}
            isActive={isFocused}
            photo={true}
            preset="high"
            orientation="portrait"
          />
      ) : (
        <View style={styles.camera} />
      )}
      <RNHoleView
        style={styles.holeView}
        holes={[
          {
            x: frameX,
            y: frameY,
            width: frameWidth,
            height: frameHeight,
            borderRadius: 16,
          },
        ]}
      ></RNHoleView>
      <View style={styles.wrapFrame}>
        <View style={styles.frame}>
          <View style={styles.frameBorderTopLeft} />
          <View style={styles.frameBorderTopRight} />
          <View style={styles.frameBorderBottomLeft} />
          <View style={styles.frameBorderBottomRight} />
        </View>
      </View>

      <AppHeader isBlack headerText={"Chụp chân dung"} showBorderWidth={false} />

      <View style={{ flex: 1 }} />
      <AppText value={guide} style={FONT_MEDIUM_14} color={color.text} textAlign={"center"} />
      {/* <View style={styles.wrapAction}> */}
      {/*  <ActionItem onPress={navigateToPhotoPicker} icon={<PhotoSvg />} text={"Thư viện ảnh"} /> */}
      {/* </View> */}

      <View style={styles.btnContainer}>
        {image ? <View style={[ALIGN_CENTER, { width: "100%" }]}>
            <AppText value={"Chụp lại"} underline color={color.primary} style={presets.label_16} onPress={onReTake} />
            <AppButton
              disable={ekycStore.loading}
              title={"Xác nhận"}
              onPress={onContinue}
              containerStyle={MARGIN_TOP_24}
              loading={ekycStore.loading}
            />
          </View>
          :
          <CaptureButtonSvg onPress={takePhoto} />
        }
      </View>
    </View>
  )
})

export default EKYCPortrait

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    backgroundColor: "transparent",
  },
  image: {
    position: "absolute",
    marginLeft: frameX - (isAndroid ? ms(0.5) : 0),
    marginTop: frameY - (isAndroid ? ms(1) : ms(0)),
    width: frameWidth,
    height: frameHeight,
  },
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: color.palette.black,
  },
  wrapFrame: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  frameBorderTopLeft: {
    width: 30,
    height: 30,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    position: "absolute",
    top: -15,
    left: -15,
    borderTopLeftRadius: 16,
    borderTopColor: color.primary,
    borderLeftColor: color.primary,
  },
  frameBorderTopRight: {
    width: 30,
    height: 30,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    position: "absolute",
    top: -15,
    right: -15,
    borderTopRightRadius: 16,
    borderTopColor: color.primary,
    borderRightColor: color.primary,
  },
  frameBorderBottomLeft: {
    width: 30,
    height: 30,
    borderBottomWidth: 1.5,
    borderLeftWidth: 1.5,
    position: "absolute",
    bottom: -15,
    left: -15,
    borderBottomLeftRadius: 16,
    borderBottomColor: color.primary,
    borderLeftColor: color.primary,
  },
  frameBorderBottomRight: {
    width: 30,
    height: 30,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    position: "absolute",
    bottom: -15,
    right: -15,
    borderBottomRightRadius: 16,
    borderBottomColor: color.primary,
    borderRightColor: color.primary,
  },
  frame: {
    marginLeft: frameX,
    marginTop: frameY,
    width: frameWidth,
    height: frameHeight,
  },
  idContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: "16@ms",
    paddingTop: "30@s",
  },
  wrapAction: {
    backgroundColor: "rgba(0,0,0,0.7)",
    marginHorizontal: "16@ms",
    borderRadius: "16@s",
    paddingVertical: "20@s",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btnContainer: {
    alignItems: "center",
    paddingVertical: "24@s",
    paddingHorizontal: "16@ms",
  },
  holeView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,1)",
  },
})
