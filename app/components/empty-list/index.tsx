import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { NoDataSvg } from "../../assets/svgs"
import { AppText } from "../app-text/AppText"
import { s } from "react-native-size-matters"
import { MARGIN_BOTTOM_24 } from "../../styles/common-style"
import { color } from "../../theme"

interface Props {
  style?: ViewStyle | any
  text?: string
  styleText?: ViewStyle | any
}

const EmptyList = React.memo(({ style, text, styleText }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <NoDataSvg style={MARGIN_BOTTOM_24} />
      <View>
        <AppText value={text || 'Không có dữ liệu'} fontSize={s(16)} style={styleText || styles?.text} />
      </View>
    </View>
  )
});

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    backgroundColor: color.palette.white,
  },
  text: {
    color: color.palette.white
  }
});
