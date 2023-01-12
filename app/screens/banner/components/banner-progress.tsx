import React from 'react';
import { View, Pressable } from "react-native"
import { color } from "../../../theme"
import { width } from "../../../constants/variable"
import { goBack } from "../../../navigators"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import * as Progress from "react-native-progress"

interface Props{
  progress: number
  shareQr(): void
}

const BannerProgress = React.memo(({ progress, shareQr }: Props) => {
  return (
    <View style={styles.container}>
      <Progress.Bar
        unfilledColor={color.palette.BABABA}
        height={3}
        borderWidth={0}
        progress={progress}
        color={color.primary}
        width={width}
      />
      <View style={styles.wrapBottom}>
        <Pressable onPress={goBack}>
          <FastImage source={images.long_arrow_right} style={styles.arrow} tintColor={'#898989'} />
        </Pressable>
        <Pressable onPress={shareQr}>
          <FastImage source={images.common_share} style={styles.share} />
        </Pressable>
      </View>
    </View>
  )
});

export default BannerProgress;

const styles = ScaledSheet.create({
    container: {},
  wrapBottom: {
    height: "60@s",
    backgroundColor: color.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "24@s",
    paddingBottom: '15@s'
  },
  arrow: {
    transform: [
      { rotate: "180deg" },
    ],
    width: "24@s",
    height: "12@s",
  },
  share: {
    width: "20@s",
    height: "20@s",
  },
});
