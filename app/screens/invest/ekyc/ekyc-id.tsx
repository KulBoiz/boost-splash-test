import React, { FC, useCallback, useRef, useState } from "react"
import { Alert, Image, Linking, Platform, View } from "react-native"
import { Camera, useCameraDevices } from "react-native-vision-camera"
import AppHeader from "../../../components/app-header/AppHeader"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { CaptureButtonSvg, PhotoSvg, ThunderSvg } from "../../../assets/svgs"
import { color } from "../../../theme"
import { COMMON_ERROR, height, isAndroid, width } from "../../../constants/variable"
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
import { ScreenNames } from "../../../navigators/screen-names"
import { goBack, navigate } from "../../../navigators"
import { RNHoleView } from "react-native-hole-view"
import { useStores } from "../../../models"
import { useIsFocused } from "@react-navigation/native"
import ActionItem from "../../agent/components/action-item"
import { ALIGN_CENTER, FONT_BOLD_14, MARGIN_TOP_24 } from "../../../styles/common-style"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { EKYCStackParamList } from "../../../navigators/ekyc-stack"
import AppButton from "../../../components/app-button/AppButton"
import { presets } from "../../../constants/presets"
import { CARD_TYPE } from "../constants"
import { get } from "lodash"

const frameWidth = width * 0.8
const frameHeight = width * 0.5
const frameX = width * 0.1
const frameY = height * 0.25
const textColor = "#407BFF"

interface Props {
}

const EKYCId: FC<StackScreenProps<EKYCStackParamList, ScreenNames.EKYC_ID>> = observer(({ route }) => {
  const { ekycStore } = useStores()
  const isFocused = useIsFocused()
  const cameraRef = useRef<any>(null)
  const [imageType, setImageType] = React.useState<"front" | "back">("front")
  const [frontImage, setFrontImage] = React.useState<string | null>(null)
  const [backImage, setBackImage] = React.useState<string | null>(null)
  const [hasPermission, setHasPermission] = React.useState(false)
  const [flash, setFlash] = useState<"off" | "on">("off")
  const devices = useCameraDevices()
  const device = devices.back

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission()
      setHasPermission(status === "authorized")
      if (status === "denied") {
        Alert.alert("Để sử dụng chức năng này vui lòng cấp quyền cho ứng dụng", "",
          [
            {
              text: "Hủy",
              onPress: goBack,
              style: "cancel",
            },
            { text: "OK", onPress: () => Linking.openSettings() },
          ])
      }
    })()
  }, [isFocused])

  const onFlashPressed = useCallback(async () => {
    setFlash((f) => (f === "off" ? "on" : "off"))
  }, [])

  const setPhoto = useCallback(
    async (photo) => {
      if (imageType === "front") {
        setFrontImage(photo)
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
        format: SaveFormat.JPEG,
      },
    )
    setPhoto(manipResult.uri)
  }, [frontImage, backImage, cameraRef, setPhoto])

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
      if (imageType === "front") {
        setFrontImage(null)
      } else {
        setBackImage(null)
      }
    },
    [frontImage, backImage, imageType],
  )

  const getIdentityInfo = useCallback(() => {
    ekycStore.getIdentityInfo().then(res => {
      const type = get(res, "data[0].type")
      if (res?.length === 2) {
        const param = {
          ...res[0], ...res[1], identification: {
            ...res[0]?.identification, ...res[1]?.identification,
          },
        }
        ekycStore.updateUser(param)
        navigate(ScreenNames.EKYC_PORTRAIT)
      }
      if (type === CARD_TYPE.front) {
        setBackImage(null)
        Alert.alert("Ảnh mặt sau không hợp lệ")
      }
      if (type === CARD_TYPE.back) {
        setFrontImage(null)
        Alert.alert("Ảnh mặt trước không hợp lệ")
      }
      if (res?.data?.type === "") {
        Alert.alert("Ảnh không hợp lệ")
      }
    })
  }, [])

  const onContinue = useCallback(() => {
    if (frontImage && backImage && imageType === "back") {
      ekycStore.uploadImage("back", backImage).then(() => {
        getIdentityInfo()
      }).catch(() => Alert.alert(COMMON_ERROR))
    }
    if (frontImage && imageType === "front" && !backImage) {
      ekycStore.uploadImage("front", frontImage)
        .then((res) => {
          if (res?.temporary || res.kind === "server") {
            Alert.alert(COMMON_ERROR)
            return
          }
          setImageType("back")
        })
        .catch(() => Alert.alert(COMMON_ERROR))
    }
    if (frontImage && backImage && imageType === "front") {
      ekycStore.uploadImage("front", frontImage).then(() => {
        getIdentityInfo()
      }).catch(() => Alert.alert(COMMON_ERROR))
    }
  }, [frontImage, backImage])

  const checkValidImage = React.useMemo(() => {
    if (imageType === "front") {
      return !!frontImage
    }
    return !!backImage
  }, [imageType, frontImage, backImage])


  return (
    <View style={styles.container}>
      {device != null && hasPermission ? (
        checkValidImage ?
          <Image source={{ uri: imageType === "front" ? frontImage : backImage }} style={styles.image} /> :
          <Camera
            style={styles.camera}
            ref={cameraRef}
            device={device}
            isActive={isFocused}
            photo={true}
            torch={flash}
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

      <AppHeader isBlack headerText={"Ảnh CMND/CCCD"} showBorderWidth={false} />
      <View style={styles.idContainer}>
        <AppText value={`MẶT ${imageType === "front" ? "TRƯỚC" : "SAU"} CMND/ CCCD`} style={FONT_BOLD_14}
                 color={textColor} />
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
        {checkValidImage ? <View style={[ALIGN_CENTER, { width: "100%" }]}>
            <AppText value={"Chụp lại"} underline color={color.primary} style={presets.label_16} onPress={onReTake} />
            <AppButton
              disable={!hasPermission || ekycStore.loading}
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
    backgroundColor: color.palette.black,
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
  image: {
    position: "absolute",
    marginLeft: frameX - (isAndroid ? ms(0.5) : 0),
    marginTop: frameY - (isAndroid ? ms(1) : ms(0)),
    width: frameWidth,
    height: frameHeight,
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
