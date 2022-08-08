import React from 'react'
import { ScrollView, View } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { ScaledSheet } from 'react-native-size-matters'
import BottomView from '../../../components/bottom-view'
import AdsNews from '../insurance/components/ads-news'
import OthersInsurance from '../insurance/components/others-Insurance'
import { color } from "../../../theme"

const InsuranceTab = () => {
  return (
    <View style={styles.container}>
      <OthersInsurance />
      <AdsNews />
      <BottomView height={100} />
    </View>
  )
}

export default InsuranceTab

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.lightGrey
  },
  scrollView: {
    marginTop: isIphoneX() ? "155@s" : "130@s",
  },
})
