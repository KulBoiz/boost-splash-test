import React from "react"
import { View, ViewStyle } from "react-native"
import { ALIGN_CENTER, FONT_REGULAR_12, MARGIN_BOTTOM_8, ROW } from "../styles/common-style"
import FastImage from "react-native-fast-image"
import { images } from "../assets/images"
import { AppText } from "./app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  style?: ViewStyle | any
  content: string
}

const NoteItem = React.memo(({ style, content }: Props) => {
  return (
    <View style={[ROW, ALIGN_CENTER, MARGIN_BOTTOM_8, style]}>
      <FastImage source={images.yellow_caution} style={styles.icon} />
      <AppText value={content} style={FONT_REGULAR_12}/>
    </View>
  )
});

export default NoteItem;

const styles = ScaledSheet.create({
  icon: {
    width: "16@s",
    height: "16@s",
    marginRight: "4@s",
  },
});
