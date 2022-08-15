import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { NoDataSvg } from "../../assets/svgs"
import { AppText } from "../app-text/AppText"
import { ms } from "react-native-size-matters"
import { MARGIN_BOTTOM_24 } from "../../styles/common-style"
import { color } from "../../theme"

interface Props{
  style?: ViewStyle | any
}

const EmptyList = React.memo(({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <NoDataSvg style={MARGIN_BOTTOM_24}/>
      <AppText value={'Không có dữ liệu'} fontSize={ms(16)} color={color.palette.grayChateau}/>
    </View>
  )
});

export default EmptyList;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex:1,
      justifyContent:'center'
    },
});
