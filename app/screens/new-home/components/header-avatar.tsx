import React from 'react';
import { View, Animated} from 'react-native';
import { FastImage } from "../../../components/fast-image/fast-image"
import { images } from "../../../assets/images"
import { ScaledSheet} from "react-native-size-matters"
import { isIphoneX } from "react-native-iphone-x-helper"

interface Props{
  animatedValue: any
}

const HomeAvatar = React.memo(({ animatedValue }: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <FastImage source={images.avatar} style={styles.avatar}/>
        <Animated.Text>Đăng nhập</Animated.Text>
      </View>
     
    </View>
  )
});

export default HomeAvatar;

const styles = ScaledSheet.create({
  container: {
    position: "absolute",
    top: isIphoneX() ? '55@s' : '35@s',
    left: '24@ms'
  },
  avatar:{
    width: '36@s',
    height: '36@s',
    borderRadius: '18@s'
  }
});
