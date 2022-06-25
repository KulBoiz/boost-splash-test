import React from "react"
import { View, Animated } from "react-native"
import { FastImage } from "../../../components/fast-image/fast-image"
import { images } from "../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { isIphoneX } from "react-native-iphone-x-helper"
import { ALIGN_CENTER, HIT_SLOP, ROW } from "../../../styles/common-style"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { BellSvg } from "../../../assets/svgs"
import { TouchableOpacity } from "react-native-gesture-handler"
import { get } from "lodash"
import { observer } from "mobx-react-lite"

interface Props {
  animatedValue: any
}

const HomeAvatar = observer(({ animatedValue }: Props) => {
  const { authStoreModel } = useStores()
  const isLogin = authStoreModel?.isLoggedIn
  const avatar = get(authStoreModel?.user, "avatar")

  const onPress = () => {
    if (!isLogin) {
      navigate(ScreenNames.AUTH)
    } else navigate(ScreenNames.SETTING)
  }
  const textOpacity = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 70],
      outputRange: [1, 0],
      extrapolate: "clamp",
    }),
  }

  return (
    <View style={styles.container}>
      <View style={[ROW, ALIGN_CENTER]}>
        <TouchableOpacity onPress={onPress}>
          <FastImage source={avatar ? { uri: avatar } : images.fina_logo} style={styles.avatar} />
        </TouchableOpacity>
        {!isLogin && <Animated.Text style={[styles.text, textOpacity]}>Đăng nhập</Animated.Text>}
      </View>
      <TouchableOpacity onPress={() => navigate(ScreenNames.NOTICE)} hitSlop={HIT_SLOP}>
        <BellSvg />
      </TouchableOpacity>
    </View>
  )
})

export default HomeAvatar

const styles = ScaledSheet.create({
  container: {
    zIndex: 1,
    top: isIphoneX() ? "55@s" : "35@s",
    paddingHorizontal: "24@ms",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: "36@s",
    height: "36@s",
    borderRadius: "18@s",
  },
  text: {
    fontSize: "14@ms",
    color: color.text,
    fontFamily: fontFamily.semiBold,
    marginLeft: "12@ms",
  },
})
