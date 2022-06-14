import React from 'react';
import { Animated, Pressable } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { getFeatureViewAnimation } from "../constants"
import { width } from "../../../constants/variable"

interface Props{
  title: string
  image: number
  isSelect: boolean
  handleSelect(e: any): void
  animatedValue: any
}
const blurBlack = 'rgba(0,0,0,0.15)'

const HeaderButton = React.memo((props: Props) => {
  const {title, image, isSelect, handleSelect, animatedValue} = props

  const depositViewAnimation = getFeatureViewAnimation(animatedValue, s(5));
  const featureIconCircleAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 25],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  const featureIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };
  const animatedWidth = {
    width: animatedValue.interpolate({
      inputRange: [0, 90],
      outputRange: [width/4, width/5],
      extrapolate: "clamp",
    }),
  }
  // const featureIconAnimation = {
  //   transform: [
  //     {
  //       scale: animatedValue.interpolate({
  //         inputRange: [0, 70],
  //         outputRange: [1, 0.8],
  //         extrapolate: 'clamp',
  //       }),
  //     },
  //   ],
  // };

  const featureNameAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };
  return (
    <Animated.View style={[styles.container,depositViewAnimation,animatedWidth]}>
      <Animated.View>
        <Pressable onPress={handleSelect} >
          <Animated.Image source={image} style={[styles.image20, {tintColor: color.palette.white}, featureIconAnimation]}/>
        </Pressable>
      </Animated.View>
      <Animated.View style={[styles.box, { backgroundColor: isSelect ? color.background : blurBlack },featureIconCircleAnimation]}>
        <Pressable onPress={handleSelect} >
          <Animated.Image source={image} style={[styles.image, {tintColor: isSelect ? color.palette.blue : color.palette.white}, featureIconCircleAnimation]}/>
        </Pressable>
      </Animated.View>
      <Animated.Text style={[styles.text, featureNameAnimation]}>{title}</Animated.Text>
    </Animated.View>
  )
});

export default HeaderButton;

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    zIndex: 999999
  },
  box: {
    width: '56@s',
    height: '56@s',
    borderRadius: '12@s',
    alignItems: "center",
    justifyContent: "center"
  },
  image20: {
    width: '20@s',
    height: '20@s',
    position: 'absolute',
    top: '17@s',
    right: '-17@s'
  },
  image: {
    width: '28@s',
    height: '28@s'
  },
  text: {
    fontSize: '16@ms',
    color: color.palette.white,
    fontFamily: fontFamily.semiBold,
    marginTop: '8@s'
  }
});
