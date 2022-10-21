import React from "react"
import { View } from "react-native"
import { CheckedSvg } from "../../../../assets/svgs"
import { AppText } from "../../../../components/app-text/AppText"
import {
  ALIGN_CENTER,
  FONT_MEDIUM_14,
  MARGIN_BOTTOM_16,
  MARGIN_RIGHT_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"
import { color } from "../../../../theme"
import { IDENTITY_GUIDE, IDENTITY_GUIDE_IMAGE } from "../../constants"
import { FastImage } from "../../../../components/fast-image/fast-image"
import { fontFamily } from "../../../../constants/font-family"
import { ScaledSheet } from "react-native-size-matters"
import AppButton from "../../../../components/app-button/AppButton"

interface Props {
}

interface ItemProps {
  text: string
}

interface ItemImageProps {
  text: string
  image: number
}

const textColor = "#FF7373"

const Item = React.memo(({ text }: ItemProps) => {
  return (
    <View style={[ROW, ALIGN_CENTER, MARGIN_BOTTOM_16]}>
      <CheckedSvg style={MARGIN_RIGHT_8} />
      <AppText value={text} style={[FONT_MEDIUM_14, { width: "90%" }]} color={color.palette.deepGray} />
    </View>
  )
})

const ItemImage = React.memo(({ image, text }: ItemImageProps) => {
  return (
    <View style={ALIGN_CENTER}>
      <FastImage source={image} style={styles.image} />
      <AppText value={text} color={textColor} fontFamily={fontFamily.medium} textAlign={"center"} />
    </View>
  )
})

const IdentityGuide = React.memo((props: Props) => {
  const handlePress = React.useCallback(() => {
    //
  }, [])

  return (
    <View style={styles.container}>
      {IDENTITY_GUIDE.map((val, index) => (
        <Item text={val} key={index} />
      ))}
      <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
        {IDENTITY_GUIDE_IMAGE.map((val, index) => (
          <ItemImage text={val.text} image={val.image} key={index} />
        ))}
      </View>
      <View style={{ flex: 1 }} />
      <AppButton onPress={handlePress} tx={"common.continue"} />
    </View>
  )
})

export default IdentityGuide

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    borderTopRightRadius: "16@s",
    borderTopLeftRadius: "16@s",
    paddingHorizontal: "16@s",
    paddingVertical: "20@s",
  },

  image: {
    width: "80@s",
    height: "51.5@s",
    marginBottom: "8@s",
  },
})
