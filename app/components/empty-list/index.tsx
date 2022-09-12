import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { NoDataSvg } from "../../assets/svgs"
import { AppText } from "../app-text/AppText"
import { s } from "react-native-size-matters"
import { MARGIN_BOTTOM_24 } from "../../styles/common-style"
import { color } from "../../theme"
import { hexToRgbA } from "../../constants/variable"

interface Props {
  style?: ViewStyle | any
  text?: string
  styleText?: ViewStyle | any
  emptyIcon?: any
}

const EmptyList = React.memo(({ style, text, styleText, emptyIcon }: Props) => {
  return (
    <View style={[styles.container, style]}>
      {
        emptyIcon ?? <NoDataSvg />
      }
      <View>
        <AppText value={text || "Không có dữ liệu"} fontSize={s(16)} style={[styles?.text, styleText]} />
      </View>
    </View>
  )
})

export default EmptyList

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: color.palette.white,
  },
  text: {
    color: hexToRgbA(color.palette.black, 0.5),
    marginTop: 24,
  },
})
