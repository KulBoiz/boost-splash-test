import React, { useCallback, useRef, useState } from "react"
import { Platform, View } from "react-native"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import AppHeader from "../../components/app-header/AppHeader"
import { s, ScaledSheet } from "react-native-size-matters"
import RenderStepAgent from "./components/render-step"
import ImageTutorialItem from "./components/image-tutorial-item"
import { images } from "../../assets/images"
import { AppText } from "../../components/app-text/AppText"
import AppButton from "../../components/app-button/AppButton"
import ActionItem from "./components/action-item"
import { ThunderSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { width } from "../../constants/variable"
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
interface Props {}

const CaptureId = React.memo((props: Props) => {
  const cameraRef = useRef<Camera>(null)
  const [imageType, setImageType] = React.useState<"front" | "back">("front")
  const [frontImage, setFrontImage] = React.useState("")
  const [backImage, setBackImage] = React.useState("")
  const [hasPermission, setHasPermission] = React.useState(false)
  const [flash, setFlash] = useState<"off" | "on">("off")
  const devices = useCameraDevices()
  const device = devices.back

  // React.useEffect(() => {
  //   (async () => {
  //     const cameraPermission = await Camera.getCameraPermissionStatus();
  //     if (cameraPermission === 'not-determined') {
  //       await Camera.requestCameraPermission();
  //     }
  //     setHasPermission(cameraPermission === 'authorized');
  //   })();
  // }, []);
  React.useEffect(() => {
    ;(async () => {
      const status = await Camera.requestCameraPermission()
      setHasPermission(status === "authorized")
    })()
  }, [])

  const onFlashPressed = useCallback(async () => {
    setFlash((f) => (f === "off" ? "on" : "off"))
  }, [])

  const takePhoto = useCallback(async () => {
    // @ts-ignore
    const data = await cameraRef.current.takePhoto({
      skipMetadata: true,
    })
    let filePath = data.path
    if (Platform.OS === "android") {
      filePath = `file://${filePath}`
    }
    const imageWidth = Math.min(data.height, data.width)
    const imageHeight = Math.max(data.height, data.width)
    const manipResult = await manipulateAsync(
      filePath,
      [
        {
          crop: {
            width: imageWidth * 0.8,
            height: imageWidth * 0.5,
            originX: imageWidth * 0.1,
            originY: imageHeight * 0.45,
          },
        },
      ],
      {
        compress: 1,
        format: SaveFormat.PNG,
      },
    )
    if (imageType === "front") {
      setFrontImage(manipResult.uri)
      setImageType("back")
    } else {
      setBackImage(manipResult.uri)
    }
  }, [imageType, cameraRef])

  return (
    <View style={styles.container}>
      {device != null && hasPermission ? (
        <Camera
          style={styles.camera}
          ref={cameraRef}
          device={device}
          isActive={true}
          photo={true}
          torch={flash}
          preset="hd-1280x720"
          orientation="portrait"
        />
      ) : (
        <View style={styles.camera} />
      )}
      <AppHeader isBlue headerText={"Chụp ảnh CMND / CCCD / HC"} />
      <RenderStepAgent currentPosition={1} style={styles.stepContainer} />
      <View style={styles.idContainer}>
        <ImageTutorialItem
          image={frontImage ? { uri: frontImage } : images.id_front}
          imageStyle={styles.previewStyle as any}
          type={"big"}
          text={"Mặt trước"}
        />
        <View style={styles.previewSpaceStyle} />
        <ImageTutorialItem
          image={backImage ? { uri: backImage } : images.id_back}
          imageStyle={styles.previewStyle as any}
          type={"big"}
          text={"Mặt sau"}
        />
      </View>
      <View style={styles.wrapFrame}>
        <View style={styles.frame}>
          <View style={styles.frameBorderTopLeft} />
          <View style={styles.frameBorderTopRight} />
          <View style={styles.frameBorderBottomLeft} />
          <View style={styles.frameBorderBottomRight} />
        </View>
      </View>
      <View style={styles.wrapAction}>
        <ActionItem
          onPress={onFlashPressed}
          icon={<ThunderSvg />}
          text={flash === "on" ? "Tắt đèn flash" : "Bật đèn flash"}
        />
        <AppText value={"|"} color={color.text} fontSize={s(20)} />
        <ActionItem onPress={onFlashPressed} icon={<ThunderSvg />} text={"Thư viện ảnh"} />
      </View>

      <View style={styles.btnContainer}>
        <AppButton title={"Chụp"} onPress={takePhoto} />
      </View>
    </View>
  )
})

export default CaptureId

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
    backgroundColor: "black",
  },
  wrapFrame: {
    // position: "absolute",
    // borderBottomRightRadius: 16,
    // borderTopEndRadius: 16,
    // borderTopStartRadius: 16,
    // borderLeftWidth: (width - 346) / 2,
    // borderRightWidth: (width - 346) / 2,
    // borderTopWidth: (height - 216) / 2,
    // borderBottomWidth: (height - 216) / 2,
    // borderColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  frameBorderTopLeft: {
    width: 80,
    height: 80,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    position: "absolute",
    top: 0,
    left: 0,
    borderTopLeftRadius: 16,
    borderTopColor: "white",
    borderLeftColor: "white",
  },
  frameBorderTopRight: {
    width: 80,
    height: 80,
    borderTopWidth: 3,
    borderRightWidth: 3,
    position: "absolute",
    top: 0,
    right: 0,
    borderTopRightRadius: 16,
    borderTopColor: "white",
    borderRightColor: "white",
  },
  frameBorderBottomLeft: {
    width: 80,
    height: 80,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    position: "absolute",
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 16,
    borderBottomColor: "white",
    borderLeftColor: "white",
  },
  frameBorderBottomRight: {
    width: 80,
    height: 80,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    position: "absolute",
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 16,
    borderBottomColor: "white",
    borderRightColor: "white",
  },
  frame: {
    width: width * 0.8,
    height: width * 0.5,
  },
  previewStyle: {
    width: "124@s",
    height: "81@s",
  },
  previewSpaceStyle: {
    width: "24@s",
  },
  idContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: "16@ms",
  },
  wrapAction: {
    backgroundColor: "#080706",
    marginHorizontal: "16@ms",
    borderRadius: "16@s",
    paddingVertical: "20@s",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  btnContainer: {
    paddingVertical: "24@s",
    paddingHorizontal: "16@ms",
  },
})
