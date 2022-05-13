import React from 'react';
import { View, Pressable, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
import { AppText } from "./app-text/AppText"
import { images } from "../assets/images"
import { color } from "../theme"
import { fontFamily } from "../constants/font-family"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  style?: ViewStyle | any
  onPress?(): void
}

const ViewDetail = React.memo(({ onPress, style }: Props) => {

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.row} onPress={onPress}>
        <AppText tx={"loan.viewDetail"} style={styles.detailText} capitalize/>
        <FastImage source={images.arrowLeft} style={styles.backIcon} tintColor={color.palette.blue}/>
      </Pressable>
    </View>
  )
});

export default ViewDetail;

const styles = ScaledSheet.create({
  container: {},
  backIcon: {
    marginLeft: '8@ms',
    width: '12@s',
    height: '12@s',
    transform: [{rotate: '180deg'}]
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailText: {
    fontFamily: fontFamily.semiBold,
    fontSize: '12@ms',
    color: color.palette.blue
  },
});
