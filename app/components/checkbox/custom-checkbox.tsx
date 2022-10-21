import React from 'react';
import { View, StyleSheet, Pressable } from "react-native"
import { AppText } from "../app-text/AppText"
import FastImage from 'react-native-fast-image'
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { FONT_SEMI_BOLD_14 } from "../../styles/common-style"

interface Props{
  isChecked: boolean
  onPress(): void
  text?: string
  size?: number
}

const CustomCheckbox = React.memo((props: Props) => {
  const {isChecked, text, onPress, size} = props
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, isChecked ? styles.checked : styles.unChecked]}>
        <FastImage source={images.check} style={styles.icon}/>
      </View>
      <AppText value={text} style={FONT_SEMI_BOLD_14}/>
    </Pressable>
  )
});

export default CustomCheckbox;

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  checkbox: {
    width: '16@s',
    height: '16@s',
    borderRadius: '4@s',
    marginRight: '5@ms',
    alignItems: "center",
    justifyContent: "center"
  },
  checked: {
    backgroundColor: color.palette.blue
  },
  unChecked: {
    borderWidth: 1.5,
    borderColor: color.palette.lightBlack
  },
  icon: {
    width: '8@s',
    height: '6@s'
  }
});
