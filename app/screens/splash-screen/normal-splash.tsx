import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { FinaSplashSvg } from "../../assets/svgs"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { images } from "../../assets/images"

interface Props{}

const NormalSplash = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
       <FastImage source={images.fina_splash} style={styles.image}/>
       <FinaSplashSvg style={styles.finaLogo}/>
    </View>
  )
});

export default NormalSplash;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.blue,
    justifyContent: 'center',
    alignItems:'center',
  },
  image: {
    position: 'absolute',
    width: '350@s',
    height: '700@s'
  },
  finaLogo: {
    marginTop: '50@s'
  },
});
