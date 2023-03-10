import React, { FC } from "react";
import { Animated, StatusBar } from "react-native"
import { hasNotch } from "react-native-device-info";
import { s, ScaledSheet } from "react-native-size-matters";
import { images } from "../../../assets/images";
import { SearchSvg } from "../../../assets/svgs";
import { Button } from "../../../components";
import { AppText } from "../../../components/app-text/AppText";
import { fontFamily } from "../../../constants/font-family";
import { color } from "../../../theme";
import AccumulatedInfo from "./accumulated-info";
import { UserInfo } from "./userInfo";
import { isIos } from "../../../constants/variable"

const MIN_HEIGHT = hasNotch() ? s(160) : s(150)
const MAX_HEIGHT = hasNotch() ? s(240) : s(220)
interface HeaderProps {
  animatedValue?: any
  children?: React.ReactNode
}
export const Header: FC<HeaderProps> = ({ animatedValue, children }) => {

  /* const containerMargin = {
    height: animatedValue.interpolate({
      inputRange: [0, 30],
      outputRange: [MAX_HEIGHT, MIN_HEIGHT],
      extrapolate: "clamp",
    }),
  }
  const animatedHeaderPadding = {
    paddingBottom: animatedValue.interpolate({
      inputRange: [0, 80],
      outputRange: [s(32), 0],
      extrapolate: 'clamp'
    })
  } */
  return (
    <Animated.View style={styles.container}>
      <StatusBar
        backgroundColor={'#2766D8'}
        barStyle={"light-content"}
      />
      <Animated.Image source={images.home_finance} style={styles.image} />
      {/* <Button style={styles.buttonSearch} > */}
      {/*  <SearchSvg /> */}
      {/*  <AppText value="Tìm kiếm" style={styles.textButtonSearch} /> */}
      {/* </Button> */}
      <UserInfo />
      {children}
      {/* <AccumulatedInfo /> */}
    </Animated.View>
  )
}
const styles = ScaledSheet.create({
  container: {
    zIndex: 1,
    paddingTop: hasNotch() ? "35@s" : "20@s",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: '24@s',
    borderBottomRightRadius: '24@s',
  },
  image: {
    width: '100%',
    // height: hasNotch() ? "155@s" : isIos ? "150@vs" : "145@vs",
    height: hasNotch() ? "120@s" : isIos ? "115@vs" : "110@vs",
    position: "absolute",
    borderBottomLeftRadius: '24@s',
    borderBottomRightRadius: '24@s',
  },
  buttonSearch: {
    height: "33@s",
    marginHorizontal: "16@s",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.23)",
    borderRadius: "45@s",
  },
  textButtonSearch: {
    fontFamily: fontFamily.medium,
    fontSize: "14@ms",
    lineHeight: "17@ms",
    color: color.palette.white,
    marginLeft: "8@s"
  },
})
