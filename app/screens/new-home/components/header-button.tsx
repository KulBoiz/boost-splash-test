import React from 'react';
import { View, StyleSheet, Pressable } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import FastImage from "react-native-fast-image"

interface Props{
  title: string
  image: number
  isSelect: boolean
  handleSelect(e: any): void
}
const blurBlack = 'rgba(0,0,0,0.15)'

const HeaderButton = React.memo((props: Props) => {
  const {title, image, isSelect, handleSelect} = props
  return (
    <View style={styles.container}>
      <Pressable onPress={handleSelect} style={[styles.box, { backgroundColor: isSelect ? color.background : blurBlack }]}>
        <FastImage source={image} style={styles.image} tintColor={isSelect ? color.palette.blue : color.palette.white}/>
      </Pressable>
      <AppText value={title} style={styles.text}/>
    </View>
  )
});

export default HeaderButton;

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    width: '20%'
  },
  box: {
    width: '56@s',
    height: '56@s',
    borderRadius: '12@s',
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: '28@s',
    height: '28@s'
  },
  text: {
    fontSize: '16@ms',
    color: color.palette.white,
    fontFamily: fontFamily.semiBold,
    marginTop: '8@s'
  }
});
