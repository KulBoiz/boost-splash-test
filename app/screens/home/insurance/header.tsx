import React, { FC } from "react";
import { Animated } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { s, ScaledSheet } from "react-native-size-matters";
import { images } from "../../../assets/images";
import { SearchSvg } from "../../../assets/svgs";
import { Button } from "../../../components";
import { AppText } from "../../../components/app-text/AppText";
import { fontFamily } from "../../../constants/font-family";
import { color } from "../../../theme";
import AccumulatedInfo from "./components/accumulated-info";
import { UserInfo } from "./components/userInfo";

const MIN_HEIGHT = isIphoneX() ? s(160) : s(150)
const MAX_HEIGHT = isIphoneX() ? s(240) : s(220)
interface HeaderProps {
  animatedValue?: any
}
export const Header: FC<HeaderProps> = ({ animatedValue }) => {

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
      <Animated.Image source={images.home_finance} style={[styles.image]} />
      <Button style={styles.buttonSearch} >
        <SearchSvg />
        <AppText value="Tìm kiếm" style={styles.textButtonSearch} />
      </Button>
      <UserInfo />
      {/* <AccumulatedInfo /> */}
    </Animated.View>
  )
}
const styles = ScaledSheet.create({
  container: {
    zIndex: 1,
    paddingTop: isIphoneX() ? "35@s" : "20@s",
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: color.background,
    borderBottomLeftRadius: '24@s',
    borderBottomRightRadius: '24@s',
    marginBottom: 0
  },
  image: {
    width: '100%',
    height: '240@s',
    position: "absolute",
    borderBottomLeftRadius: '24@s',
    borderBottomRightRadius: '24@s',
    zIndex: 1,
  },
  buttonSearch: {
    height: "33@s",
    marginHorizontal: "16@s",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.23)",
    zIndex: 70,
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