import React from "react"
import { Pressable, View, Image } from "react-native"
import { UploadSvg } from "../../../../assets/svgs"
import { AppText } from "../../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { hexToRgbA } from "../../../../constants/variable"
import { color } from "../../../../theme"
import { FONT_REGULAR_12 } from "../../../../styles/common-style"
import { FastImage } from "../../../../components/fast-image/fast-image"
import { images } from "../../../../assets/images"

interface Props {
  text: string
  image?: string
  haveImage?: boolean
  onPress(): void
}

const ImageContainer = React.memo((props: Props) => {
  const { onPress, text, image, haveImage } = props
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {haveImage ?
          <View>
            <Image source={{ uri: image }} style={styles.image} resizeMode={'contain'}/>
            <View style={styles.blurContainer}>
            <FastImage source={images.common_upload} style={styles.icon} tintColor={color.text}/>
              <AppText value={'Chụp lại'} color={color.text} style={FONT_REGULAR_12}/>
            </View>
          </View>
        :
        <View style={styles.image}>
          <UploadSvg />
          <AppText value={text} style={FONT_REGULAR_12} />
        </View>
      }
    </Pressable>

  )
})

export default ImageContainer

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flexDirection: "row",
    width: '100%',
    height: "100@s",
    borderRadius: "8@s",
    alignItems:"center",
    justifyContent: "center",
    backgroundColor: hexToRgbA(color.palette.black, 0.4),
    position: "absolute",
  },
  icon: {
    width: '14@s',
    height: '14@s',
    marginRight: '12@s',
    tintColor: color.text
  },
  image: {
    flex: 1,
    height: "100@s",
    borderRadius: "8@s",
    backgroundColor: hexToRgbA(color.primary, 0.05),
    alignItems: "center", justifyContent: "center",
  },
})
