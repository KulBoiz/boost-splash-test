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
import { ROW } from "../../styles/common-style"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"

interface Props{}

const BecomeAgent = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FastImage source={images.fina_logo} style={styles.logo} />
        <AppText value={'Bạn muốn trở thành'} style={styles.firstText}/>
        <View style={ROW}>
          <AppText value={'Cộng tác viên'} style={styles.secondText}/>
          <AppText value={' FINA?'} style={styles.secondText} color={color.palette.blue}/>
        </View>
        <AppButton title={'Đăng ký cộng tác viên'} onPress={()=> navigate(ScreenNames.REGISTER_AGENT)} containerStyle={styles.btn}/>
        <AppText value={'Quay lại trang chủ'} style={styles.loginText} underline onPress={()=> navigate(ScreenNames.HOME)}/>
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
    width: '85@s',
    height: '85@s',
    marginBottom: '30@s'
  },
  firstText: {
      marginBottom: '8@s',
      fontSize: '20@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.BABABA
  },
  secondText: {
    fontSize: '36@ms',
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
  }
});
