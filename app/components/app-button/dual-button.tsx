import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"

interface Props {
  leftTitle: string
  rightTitle: string
  leftPress?(e?: any): void
  rightPress?(e?: any): void
  style?: ViewStyle | any
}

const DualButton = React.memo((props: Props) => {
  const { leftPress, leftTitle, rightPress, rightTitle, style } = props
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={leftPress} style={[styles.btn, styles.leftBtn]}>
        <AppText value={leftTitle} style={styles.text} color={color.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={rightPress} style={[styles.btn, styles.rightBtn]}>
        <AppText value={rightTitle} style={styles.text} color={color.text}/>
      </TouchableOpacity>
    </View>
  )
})

export default DualButton

const styles = ScaledSheet.create({
  container: {flexDirection: 'row', justifyContent: "space-between"},
  btn: {
    width: "48%",
    height: '50@s',
    borderRadius: "8@s",
    alignItems: "center",
    justifyContent: "center"
  },
  leftBtn: {
    borderWidth: 1,
    borderColor: color.primary,
  },
  rightBtn: {
    backgroundColor: color.primary,
  },
  text:{
    fontSize: '16@s',
    fontFamily: fontFamily.bold
  }
})
