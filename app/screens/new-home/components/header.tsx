import React  from "react"
import {Animated } from "react-native"
import { images } from "../../../assets/images"
import { s, ScaledSheet } from "react-native-size-matters"
import HeaderButton from "./header-button"
import { HEADER } from "../constants"
import { isIphoneX } from "react-native-iphone-x-helper"
import { color } from "../../../theme"
import HomeAvatar from "./header-avatar"
import { width } from "../../../constants/variable"

interface Props{
  animatedValue: any
  index: any
  setIndex: any
}

const Header = React.memo((props: Props) => {
  const { animatedValue, index, setIndex } = props
  const MIN_HEIGHT = isIphoneX() ? s(120) : s(100)
  const MAX_HEIGHT = isIphoneX() ? s(240) : s(220)

  const animatedWidth = {
    width: animatedValue.interpolate({
      inputRange: [0, 80],
      outputRange: [width, width - s(90)],
      extrapolate: 'clamp'
    })
  }

  const animatedHeaderHeight = {
      height: animatedValue.interpolate({
        inputRange: [0, 80],
        outputRange: [MAX_HEIGHT, MIN_HEIGHT],
        extrapolate: "clamp",
      }),
  }

  const animatedHeaderPadding = {
    paddingBottom: animatedValue.interpolate({
      inputRange: [0, 70],
      outputRange: [s(32), 0],
      extrapolate: 'clamp'
    })
  }
  const animatedZIndex = {
    zIndex: animatedValue.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
  }

  const handleSelect = (i) => {
    setIndex(i)
  }

  return (
    <Animated.View  style={[styles.container, animatedHeaderHeight, animatedHeaderPadding]}>
      <Animated.Image source={images.home_finance} style={[styles.image, animatedHeaderHeight]}/>
      <HomeAvatar {...{animatedValue}}/>
      <Animated.View style={[styles.wrapButton, animatedWidth, animatedZIndex]}>
        {HEADER.map((e,i)=> {
          const isSelect = i === index
          return (
            <HeaderButton
              key={i.toString()}
              animatedValue={animatedValue}
              image={e.image}
              title={e.title}
              isSelect={isSelect}
              handleSelect={()=> handleSelect(i)}
            />
            )
          }
        )}
      </Animated.View>
    </Animated.View>
  )
});

export default Header;

const styles = ScaledSheet.create({
  container: {
    zIndex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: color.background,
    borderBottomLeftRadius: '24@s',
    borderBottomRightRadius: '24@s',
    marginBottom: 0
  },
  wrapButton: {
    alignSelf: "center",
    flex:1,
    paddingHorizontal: '24@ms',
    alignItems:"flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: '100%',
    height: '240@s',
    position: "absolute",
    borderBottomLeftRadius: '24@s',
    borderBottomRightRadius: '24@s',
  }
});