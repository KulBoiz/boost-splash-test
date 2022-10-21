import React, { useCallback, useRef, useState } from "react"
import { Platform, View } from "react-native"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import AppHeader from "../../../components/app-header/AppHeader"
import { s, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import AppButton from "../../../components/app-button/AppButton"
import { CaptureButtonSvg, InfoSvg, PhotoSvg, ThunderSvg } from "../../../assets/svgs"
import { color } from "../../../theme"
import { height, width } from "../../../constants/variable"
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"
import { RNHoleView } from "react-native-hole-view"
import { useStores } from "../../../models"
import { useIsFocused } from "@react-navigation/native"
import RenderStepAgent from "../../agent/components/render-step"
import PreviewPhotoId from "../../agent/components/preview-photo-id"
import ActionItem from "../../agent/components/action-item"
import { FONT_BOLD_14 } from "../../../styles/common-style"

const frameWidth = width * 0.8
const frameHeight = width * 0.5
const frameX = width * 0.1
const frameY = height * 0.25
const textColor = '#407BFF'

interface Props {}

const EKYCId = React.memo((props: Props) => {
  const { agentStore } = useStores()
  const isFocused = useIsFocused()
  const cameraRef = useRef<any>(null)
  const [imageType, setImageType] = React.useState<"front" | "back">("front")
  const [frontImage, setFrontImage] = React.useState("")
  const [backImage, setBackImage] = React.useState("")
  const [hasPermission, setHasPermission] = React.useState(false)
  const [flash, setFlash] = useState<"off" | "on">("off")
  const devices = useCameraDevices()
  const device = devices.back

  React.useEffect(() => {
    ;(async () => {
      const status = await Camera.requestCameraPermission()
      setHasPermission(status === "authorized")
    })()
  }, [])

  const onFlashPressed = useCallback(async () => {
    setFlash((f) => (f === "off" ? "on" : "off"))
  }, [])

  const setPhoto = useCallback(
    async (photo) => {
      if (imageType === "front") {
        setFrontImage(photo)
        setImageType("back")
      } else {
        setBackImage(photo)
      }
    },
    [imageType],
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
                  height: imageWidth * 0.5,
                  originX: imageWidth * 0.1,
                  originY: imageHeight * 0.25,
                }
              : {
                  width: data.width * 0.8,
                  height: data.width * 0.5,
                  originX: data.width * 0.1,
                  originY: imageHeight * 0.25,
                },
        },
      ],
      {
        compress: 1,
        format: SaveFormat.PNG,
      },
    )
    setPhoto(manipResult.uri)
  }, [imageType, cameraRef, setPhoto])

  const navigateToPhotoPicker = useCallback(() => {
    const onConfirm = (photoSelected: any) => {
      setPhoto(photoSelected)
    }
    navigate(ScreenNames.PHOTO_PICKER, {
      onConfirm,
    })
  }, [setPhoto])

  const onReTake = useCallback(
    (type) => {
      if (type === "front") {
        setFrontImage("")
        setImageType("front")
      } else {
        setBackImage("")
        setImageType(frontImage ? "back" : "front")
      }
    },
    [frontImage],
  )

  const onContinue = useCallback(() => {
    agentStore.uploadFrontImage(frontImage)
    agentStore.uploadBackImage(backImage)
    navigate(ScreenNames.CHECK_INFO, {frontImage, backImage})
  }, [frontImage, backImage])

  return (
    <View style={styles.container}>
      {device != null && hasPermission ? (
        <Camera
          style={styles.camera}
          ref={cameraRef}
          device={device}
          isActive={isFocused}
          photo={true}
          torch={flash}
          preset="hd-1280x720"
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

      <AppHeader isBlack headerText={"Ảnh CMND/CCCD"} showBorderWidth={false} />
      <View style={styles.idContainer}>
        <AppText value={'MẶT TRƯỚC CMND/ CCCD'} style={FONT_BOLD_14} color={textColor}/>
      </View>

      <View style={{ flex: 1 }} />
      <View style={styles.wrapAction}>
        <ActionItem
          onPress={onFlashPressed}
          icon={<ThunderSvg />}
          text={flash === "on" ? "Tắt đèn flash" : "Bật đèn flash"}
        />
        <AppText value={"|"} color={color.text} fontSize={s(20)} />
        <ActionItem onPress={navigateToPhotoPicker} icon={<PhotoSvg />} text={"Thư viện ảnh"} />
      </View>

      <View style={styles.btnContainer}>
        {/* <AppButton */}
        {/*  disable={!hasPermission} */}
        {/*  title={frontImage && backImage ? "Tiếp tục" : "Chụp"} */}
        {/*  onPress={() => (frontImage && backImage ? onContinue() : takePhoto())} */}
        {/* /> */}
        <CaptureButtonSvg onPress={takePhoto}/>
      </View>
    </View>
  )
})

export default EKYCId

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  stepContainer: {
    backgroundColor: "transparent",
  },
  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: color.palette.black
  },
  wrapFrame: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  frameBorderTopLeft: {
    width: 40,
    height: 40,
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
    width: 40,
    height: 40,
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
    width: 40,
    height: 40,
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
    width: 40,
    height: 40,
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
  previewStyle: {
    width: "124@s",
    height: "81@s",
    borderRadius: "8@s",
  },
  previewSpaceStyle: {
    width: "24@s",
  },
  idContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: "16@ms",
    paddingTop: '30@s'
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
    alignItems:'center',
    paddingVertical: "24@s",
    paddingHorizontal: "16@ms",
  },
  previewWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  previewText: {
    marginTop: "4@vs",
  },
  holeView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,1)",
  },
})
