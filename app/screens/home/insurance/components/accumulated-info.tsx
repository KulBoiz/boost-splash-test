import React from 'react'
import { View } from 'react-native'
import { s, ScaledSheet } from 'react-native-size-matters'
import { HeadArrowRight } from '../../../../assets/svgs'
import { AppText } from '../../../../components/app-text/AppText'
import { fontFamily } from '../../../../constants/font-family'
import { ROW } from '../../../../styles/common-style'
import { color } from '../../../../theme'

const AccumulatedInfo = () => {
  return (
    <View style={styles.buttonAccumulated}>
      <AppText value={"Tiền tích luỹ"} />
      <View style={{ ...ROW, alignItems: "center" }}>
        <AppText value={"2.254.055.012"} color={color.palette.blue} style={{ fontFamily: fontFamily.bold }} />
        <AppText value={"  vnđ"} color={color.palette.blue} />
        <HeadArrowRight style={{ marginHorizontal: s(12) }} />
      </View>
    </View>
  )
}

export default AccumulatedInfo

const styles = ScaledSheet.create({
  buttonAccumulated: {
    ...ROW,
    zIndex: 70,
    borderRadius: "8@s",
    backgroundColor: color.palette.white,
    justifyContent: "space-between",
    marginHorizontal: "16@s",
    alignItems: "center",
    paddingHorizontal: "16@s",
    paddingVertical: "16@s"
  },
})