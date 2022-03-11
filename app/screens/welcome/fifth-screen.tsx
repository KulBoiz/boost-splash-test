import React from 'react';
import { View } from 'react-native';
import { FifthSvg, FinaLogoSvg } from "../../assets/svgs"
import { height, width } from "../../constants/variable"
import { GradientBackground } from "../../components"
import { AppText } from "../../components/AppText/AppText"
import { s, ScaledSheet } from 'react-native-size-matters';
import { color } from "../../theme"
import AppButton from "../../components/AppButton/AppButton"
interface Props{}

const FifthScreen = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
        <FifthSvg width={width} height={height} style={styles.svgBackground}/>
        <GradientBackground colors={['#064DD6', 'rgba(98, 150, 249, 0.4)']} />
        <FinaLogoSvg />
        <AppText value={'Welcome'} style={styles.welcome}/>
        <AppText value={'Stay on top by effortlessly tracking your subscriptions & bills'} style={styles.content}/>

      <View style={styles.wrapBtn}>
        <AppButton title={'Bắt đầu'} containerStyle={styles.button} onPress={()=> {}}/>
        <View style={styles.wrapText}>
          <AppText value={'Bạn đã có tài khoản? '} fontSize={s(16)}/>
          <AppText value={'Đăng nhập'} style={styles.text}/>
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
      position: 'absolute'
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
    fontWeight: '600'
  }
});
