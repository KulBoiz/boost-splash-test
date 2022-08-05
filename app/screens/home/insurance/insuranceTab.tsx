import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { AppText } from '../../../components/app-text/AppText'
import { ScaledSheet } from 'react-native-size-matters'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { Header } from './header'
import OthersInsurance from './components/others-Insurance'
import BottomView from '../../../components/bottom-view'

const InsuranceTab = () => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const lastOffsetY = useRef(0)
  const scrollDirection = useRef("")


  return (
    <View style={styles.container}>
      <Header animatedValue={animatedValue} />
      <ScrollView
        scrollEnabled
        contentContainerStyle={styles.scrollView}
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y
          scrollDirection.current = offsetY - lastOffsetY.current > 0 ? "down" : "up"
          lastOffsetY.current = offsetY
          animatedValue.setValue(offsetY)
        }}
        scrollEventThrottle={16}>
        <View style={[{ height: 1200 }]}>
          <OthersInsurance />
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
