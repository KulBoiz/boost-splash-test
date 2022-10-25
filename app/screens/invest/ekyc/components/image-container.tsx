import React from "react"
import { Pressable, View } from "react-native"
import { UploadSvg } from "../../../../assets/svgs"
import { AppText } from "../../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { hexToRgbA } from "../../../../constants/variable"
import { color } from "../../../../theme"
import { FONT_REGULAR_12 } from "../../../../styles/common-style"

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
          <FastImage source={{ uri: image }} style={styles.image} resizeMode={'contain'}/>
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
  image: {
    flex: 1,
    height: "100@s",
    borderRadius: "8@s",
    backgroundColor: hexToRgbA(color.primary, 0.05),
    alignItems: "center", justifyContent: "center",
  },
})
