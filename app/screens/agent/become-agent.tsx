import React from 'react';
import { View } from 'react-native';
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../components/app-text/AppText"
import AppButton from "../../components/app-button/AppButton"
import { BecomeAgentSvg } from "../../assets/svgs"
import { fontFamily } from "../../constants/font-family"
import { color } from "../../theme"
import { width } from "../../constants/variable"

interface Props{}

const BecomeAgent = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FastImage source={images.fina_logo} style={styles.logo} />
        <AppText value={'Bạn có muốn trở thành'} style={styles.firstText}/>
        <AppText value={'Cộng tác viên'} style={styles.secondText}/>
        <AppText value={'của Fina ?'} style={styles.thirdText}/>
        <AppButton title={'Đăng ký cộng tác viên'} onPress={()=> {}} containerStyle={styles.btn}/>
        <AppText value={'Quay lại đăng nhập'} style={styles.loginText} underline/>
      </View>
      <View style={styles.imageContainer}>
        <BecomeAgentSvg width={width}/>
      </View>
    </View>
  )
});

export default BecomeAgent;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      paddingTop: '80@s',
      backgroundColor: color.background,
    },
  body: {
    alignItems: "center",
    paddingHorizontal: '16@ms'
  },
  logo: {
    width: '60@s',
    height: '60@s',
    marginBottom: '36@s'
  },
  firstText: {
      marginBottom: '8@s',
      fontSize: '20@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.BABABA
  },
  secondText: {
    fontSize: '46@ms',
    fontFamily: fontFamily.mulish.bold,
    color: color.palette.blue,
  },
  thirdText: {
    fontSize: '44@ms',
    fontFamily: fontFamily.mulish.bold,
  },
  btn: {
    backgroundColor: color.palette.orange,
    marginBottom: '24@s',
    marginTop: '80@s'
  },
  loginText: {
    fontSize: '16@ms',
    color: color.palette.blue,
    fontFamily: fontFamily.semiBold
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: '30@s'
  }
});