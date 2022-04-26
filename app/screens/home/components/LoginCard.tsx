import React from 'react';
import { View, ViewStyle } from "react-native"
import { s, ScaledSheet } from 'react-native-size-matters';
import { DefaultAvatarSvg, LockSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"

interface Props{
  style?: ViewStyle | any
}

const LoginCart = React.memo(({ style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <DefaultAvatarSvg width={s(40)} height={s(40)} style={styles.avatar} />
      <View style={styles.wrapText}>
        <LockSvg style={styles.lock}/>
        <AppText tx={"auth.login"} color={'white'} capitalize/>
      </View>
    </View>
  )
});

export default LoginCart;

const styles = ScaledSheet.create({
    container: {flexDirection: 'row'},
  avatar: {marginRight: '-20@s', zIndex: 10},
  lock: {marginRight: '5@s'},
  wrapText: {
      alignItems: 'center',
      flexDirection: 'row',
    backgroundColor: '#407BFF',
    paddingVertical: '9@s',
    paddingRight: '16@s',
    paddingLeft: '30@s',
    borderRadius: '8@s'}
});
