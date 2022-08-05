import React from 'react'
import { ScrollView, View } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { ScaledSheet } from 'react-native-size-matters'
import BottomView from '../../../components/bottom-view'
import AdsNews from './components/ads-news'
import OthersInsurance from './components/others-Insurance'
import { Header } from './header'

const InsuranceTab = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        scrollEventThrottle={16}>
        <View style={[{ height: 1000 }]}>
          <OthersInsurance />
          <AdsNews />
          <BottomView height={100} />
        </View>
      </ScrollView>
    </View>
  )
}

export default InsuranceTab

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    marginTop: isIphoneX() ? "255@s" : "240@s",
  },
})
