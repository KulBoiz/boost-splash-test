import React from 'react';
import { View, Animated, TouchableOpacity } from "react-native"
import { Header } from "../../../components"
import { BellSvg, BookSvg, SearchSvg } from "../../../assets/svgs"
import { presets } from "../../../constants/presets"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import LoginCard from "./LoginCard"
import Wallet from "./Wallet"
import { isIphoneX } from "react-native-iphone-x-helper"
import { s ,ScaledSheet} from "react-native-size-matters"
import { color } from "../../../theme"

import { ROW } from "../../../styles/common-style"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props{
  animatedValue: Animated.Value
}

const HeaderCard = React.memo(({ animatedValue }: Props) => {
  const MIN_HEIGHT = isIphoneX() ? s(110) : s(90)
  const MAX_HEIGHT = isIphoneX() ? s(200) : s(180)

  const animatedHeaderHeight = animatedValue.interpolate({
    inputRange: [0, MAX_HEIGHT - MIN_HEIGHT],
    outputRange: [MAX_HEIGHT, MIN_HEIGHT],
    extrapolate: 'clamp'
  })
  const animatedHeaderBarHeight = animatedValue.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -50],
    extrapolate: 'clamp'
  })
  const animatedHeaderOpacity= animatedValue.interpolate({
    inputRange: [0,90],
    outputRange: [1,0],
    extrapolate: 'clamp'
  })

  return (
    <><Animated.View style={[styles.header, { height: animatedHeaderHeight }]}>
      <Header style={{ top: animatedHeaderBarHeight }} headerText={"FINA"} renderRightIcon={<SearchSvg />}
              titleStyle={[presets.secondary, presets.bold, { color: "white" }]} />
      <FastImage source={images.headerDecor} style={styles.image} />
      <View style={styles.wrapContent}>
        <LoginCard />
        <View style={ROW}>
          <TouchableOpacity onPress={()=> navigate(ScreenNames.PROFILE_DETAIL)}>
            <BookSvg />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigate(ScreenNames.NOTICE)}>
            <BellSvg />
          </TouchableOpacity>
        </View>
      </View>

    </Animated.View>
      {/*<Animated.View style={[styles.wallet, { opacity: animatedHeaderOpacity }]}>*/}
      {/*  <Wallet />*/}
      {/*</Animated.View>*/}
    </>
  )
});

export default HeaderCard;

const styles = ScaledSheet.create({
    container: {},
  wrapContent: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    top:20,
    width: 420, height: 500,
    position: 'absolute'
  },
  header: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: color.palette.blue
  },
  wallet: {
    flexDirection: 'row',
    paddingHorizontal: '16@s',
    alignItems: 'center',
    alignSelf: 'center',
    height: '50@s',
    width: '90%',
    borderRadius: '8@s',
    backgroundColor: color.palette.white,
    marginTop: '-25@s'
  },
});
