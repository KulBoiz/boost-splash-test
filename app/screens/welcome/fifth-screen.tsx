import React, { useEffect } from "react"
import { View } from 'react-native';
import { height, width } from "../../constants/variable"
import { GradientBackground } from "../../components"
import { AppText } from "../../components/app-text/AppText"
import { s, ScaledSheet } from 'react-native-size-matters';
import { color } from "../../theme"
import AppButton from "../../components/app-button/AppButton"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { StackActions, useIsFocused, useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import { navigate } from "../../navigators"
import { useStores } from "../../models"
interface Props{}

const FifthScreen = React.memo((props: Props) => {
  const navigation = useNavigation()
  const {authStoreModel} = useStores()

  const setFirstTime = ()=> {
    authStoreModel.setIsFirstTime()
  }

  const handleStart = () => {
    setFirstTime()
    navigation.dispatch(StackActions.push(ScreenNames.APP))
  }
  const handleLogin = () => {
    setFirstTime()
    navigate(ScreenNames.AUTH)
  }

  return (
    <View style={styles.container}>
      <FastImage source={images.fifth} style={styles.svgBackground}/>
      <GradientBackground colors={['#064DD6', 'rgba(98, 150, 249, 0.4)']} />
      <FastImage source={images.fina_logo} style={styles.logo} />
      <AppText tx={'welcome.lastLabel'} style={styles.welcome} capitalize/>
      <AppText tx={'welcome.lastContent'} style={styles.content}/>

      <View style={styles.wrapBtn}>
        <AppButton title={'Bắt đầu'} containerStyle={styles.button} onPress={handleStart} upperCase/>
        <View style={styles.wrapText}>
          <AppText tx={'auth.haveAccount'} fontSize={s(16)}/>
          <AppText tx={'auth.login'} style={styles.text} onPress={handleLogin}/>
        </View>
      </View>
    </View>
  )
});

export default FifthScreen;
FifthScreen.displayName = 'FifthScreen'

const styles = ScaledSheet.create({
  container: {flex: 1, alignItems: 'center', paddingTop: '100@s', paddingHorizontal: '20@s'},
  welcome: {
    color: color.text,
    fontSize: '44@s',
    fontWeight: '700',
    marginTop: '32@s', marginBottom: '16@s'
  },
  logo: {
    width: '60@s',
    height: '60@s'
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
    width: '50%',
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
