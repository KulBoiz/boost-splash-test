import React from 'react';
import { View } from 'react-native';
import {FinaLogoSvg } from "../../assets/svgs"
import { height, width } from "../../constants/variable"
import { GradientBackground } from "../../components"
import { AppText } from "../../components/AppText/AppText"
import { s, ScaledSheet } from 'react-native-size-matters';
import { color } from "../../theme"
import AppButton from "../../components/AppButton/AppButton"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
interface Props{}

const FifthScreen = React.memo((props: Props) => {
  const {navigate} = useNavigation()
  return (
    <View style={styles.container}>
        <FastImage source={images.fifth} style={styles.svgBackground}/>
        <GradientBackground colors={['#064DD6', 'rgba(98, 150, 249, 0.4)']} />
        <FinaLogoSvg />
        <AppText tx={'welcome.lastLabel'} style={styles.welcome} capitalize/>
        <AppText tx={'welcome.lastContent'} style={styles.content}/>

      <View style={styles.wrapBtn}>
        <AppButton title={'Bắt đầu'} containerStyle={styles.button} onPress={()=> navigate(ScreenNames.APP)}/>
        <View style={styles.wrapText}>
          <AppText tx={'auth.haveAccount'} fontSize={s(16)}/>
          <AppText tx={'auth.login'} style={styles.text} onPress={()=> navigate(ScreenNames.LOGIN)}/>
        </View>
      </View>
    </View>
  )
});

export default FifthScreen;
FifthScreen.displayName = 'FifthScreen'

const styles = ScaledSheet.create({
  container: {flex: 1, alignItems: 'center', paddingTop: '100@s'},
  welcome: {
    color: color.text,
    fontSize: '44@s',
    fontWeight: '700',
    marginTop: '32@s', marginBottom: '16@s'
  },
  content: {
    color: color.text,
    fontSize: '16@s',
    textAlign: 'center'
  },
  svgBackground: {
      position: 'absolute',
    width: width,
    height: height
  },
  linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  wrapBtn: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '30@s',
  },
  button: {
    width: '45%',
    backgroundColor: color.palette.orange,
    marginBottom: '24@s'
  },
  wrapText: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    textDecorationLine: 'underline',
    color: color.palette.blue,
    fontSize: '16@s',
    fontWeight: '600',
    marginLeft: '5@s'
  }
});
