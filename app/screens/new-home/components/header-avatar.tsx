import React from 'react';
import { View, Animated } from "react-native"
import { FastImage } from "../../../components/fast-image/fast-image"
import { images } from "../../../assets/images"
import { s, ScaledSheet } from "react-native-size-matters"
import { isIphoneX } from "react-native-iphone-x-helper"
import { ALIGN_CENTER, HIT_SLOP, ROW } from "../../../styles/common-style"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { BellSvg } from "../../../assets/svgs"
import { TouchableOpacity } from "react-native-gesture-handler"

interface Props{
  animatedValue: any
}
const TRANSLATE_X_INPUT_RANGE = [0, 90];


const HomeAvatar = React.memo(({ animatedValue }: Props) => {
  const {authStoreModel} = useStores()
  const isLogin = authStoreModel?.isLoggedIn
  const avatar = authStoreModel?.user?.avatar

  const onPress = () => {
    if (!isLogin){
      navigate(ScreenNames.AUTH)
    }
    else navigate(ScreenNames.SETTING)

  }
  const textOpacity = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 70],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  }

  const bellTranslateX = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: TRANSLATE_X_INPUT_RANGE,
          outputRange: [0, s(50)],
          extrapolate: 'clamp',
        }),
      },
    ],
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[ROW, ALIGN_CENTER]} hitSlop={HIT_SLOP}>
        <FastImage source={!!avatar ? {uri: avatar} : images.avatar} style={styles.avatar}/>
        {!isLogin && <Animated.Text style={[styles.text, textOpacity]}>Đăng nhập</Animated.Text> }
      </TouchableOpacity>
      <Animated.View  style={bellTranslateX} hitSlop={HIT_SLOP}>
        <TouchableOpacity onPress={()=> navigate(ScreenNames.NOTICE)}>
          <BellSvg />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
});

export default HomeAvatar;

const styles = ScaledSheet.create({
  container: {
    zIndex: 1,
    top: isIphoneX() ? '55@s' : '35@s',
    paddingHorizontal: '24@ms',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  avatar:{
    width: '36@s',
    height: '36@s',
    borderRadius: '18@s'
  },
  text: {
    fontSize: '14@ms',
    color: color.text,
    fontFamily: fontFamily.semiBold,
    marginLeft: '12@ms'
  }
});
