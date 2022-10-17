import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { FONT_MEDIUM_12, MARGIN_BOTTOM_4 } from "../../../../styles/common-style"
import { color } from "../../../../theme"
import { hexToRgbA, numberWithCommas } from "../../../../constants/variable"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../../constants/font-family"

interface Props{
  title: string
  value: string
  style?: ViewStyle|any
}

const PriceItem = React.memo((props: Props) => {
  const {title,value,style} = props
  return (
      <View style={[styles.valueContainer, style]}>
        <AppText value={title} style={[FONT_MEDIUM_12, MARGIN_BOTTOM_4]} color={color.text} />
        <AppText value={value} fontSize={ms(24)} color={color.text}
                 fontFamily={fontFamily.bold} />
      </View>
  )
});

export default PriceItem;

const styles = ScaledSheet.create({
  valueContainer: {
    alignItems: "center",
    backgroundColor: hexToRgbA(color.primary, 0.9),
    paddingVertical: "16@s",
    borderRadius: "8@s",
  },
});
