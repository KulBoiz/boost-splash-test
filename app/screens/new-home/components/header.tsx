import React from 'react';
import { View, Animated } from "react-native"
import { images } from "../../../assets/images"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"

interface Props{}

const Header = React.memo((props: Props) => {
  return (
    <Animated.View  style={styles.container}>
      <FastImage source={images.home_finance} style={styles.image}/>
    </Animated.View>
  )
});

export default Header;

const styles = ScaledSheet.create({
    container: {},
  image: {
      width: '375@s',
    height: '240@s'
  }
});
