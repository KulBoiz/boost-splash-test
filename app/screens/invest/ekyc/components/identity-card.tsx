import React from "react"
import { View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { presets } from "../../../../constants/presets"
import ImageContainer from "./image-container"
import { color } from "../../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../../constants/font-family"
import { MARGIN_BOTTOM_16, MARGIN_TOP_24 } from "../../../../styles/common-style"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"
import { useStores } from "../../../../models"

interface Props {
  images: any
  setImages(e: any): void
}

const IdentityCard = React.memo((props: Props) => {
  const {ekycStore} = useStores()
  const {images, setImages} = props

  const handlePressFront = React.useCallback(() => {
    const onConfirm = (image) => {
      setImages({...images, front: image})
      ekycStore?.uploadImage('front', image)
    }
    navigate(ScreenNames.EKYC_ID, {type: 'front', onConfirm})
  }, [images])

  const handlePressBack = React.useCallback(() => {
    const onConfirm = (image) => {
      setImages({...images, back: image})
      ekycStore?.uploadImage('back', image)
    }
    navigate(ScreenNames.EKYC_ID, {type: 'back', onConfirm})
  }, [images])

  const handlePressPortrait = React.useCallback(() => {
    const onConfirm = (image) => {
      setImages({...images, portrait: image})
      ekycStore?.uploadImage('portrait', image)
    }
    navigate(ScreenNames.EKYC_PORTRAIT, {onConfirm})
  }, [images])

  return (
    <View style={styles.container}>
      <AppText style={presets.label_16} value={"Thông tin giấy tờ"} color={color.palette.blue} />
      <AppText fontFamily={fontFamily.bold} value={"Chụp mặt trước, mặt sau CMND/CCCD"} style={styles.subLabel} />
      <View style={styles.imageContainer}>
        <ImageContainer text={"Chụp ảnh mặt trước"} onPress={handlePressFront} haveImage={!!images.front} image={images.front}/>
        <View style={{ width: "3%" }} />
        <ImageContainer text={"Chụp ảnh mặt sau"} onPress={handlePressBack} haveImage={!!images.back} image={images.back}/>
      </View>
      <View style={{ width: "48.5%" }}>
        <AppText fontFamily={fontFamily.bold} value={"Chụp chân dung"} style={[MARGIN_TOP_24, MARGIN_BOTTOM_16]} />
        <ImageContainer text={"Chụp ảnh chân dung"} onPress={handlePressPortrait} haveImage={!!images.portrait} image={images.portrait}/>
      </View>

    </View>
  )
})

export default IdentityCard

const styles = ScaledSheet.create({
  container: {
    paddingTop: "12@s",
    paddingHorizontal: "16@s",
  },
  imageContainer: {
    flexDirection: "row",
  },
  subLabel: {
    marginTop: "12@s",
    marginBottom: "16@s",
  },
})
