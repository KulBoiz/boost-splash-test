import React from 'react';
import { Pressable, View, ViewStyle } from "react-native"
import { s, ScaledSheet } from 'react-native-size-matters';
import { DefaultAvatarSvg, LockSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { observer } from "mobx-react-lite"
import FastImage from "react-native-fast-image"

interface Props{
  style?: ViewStyle | any
}

const LoginCart = observer(({ style }: Props) => {
  const {authStoreModel} = useStores()
  // @ts-ignore
  const isLogin = !!authStoreModel?.user?.fullName
  // @ts-ignore
  const avatar = !!authStoreModel?.user?.avatar
  const onPress = () => {
    if (!isLogin){
      navigate(ScreenNames.AUTH)
    }
    return true
  }
  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {avatar ?
        // @ts-ignore
        <FastImage source={{uri: avatar}} style={[styles.avatar, styles.avatarContainer]} /> :
        <DefaultAvatarSvg width={s(40)} height={s(40)} style={styles.avatar} />
      }
      {
        !isLogin &&
        <View style={styles.wrapText}>
          <LockSvg style={styles.lock}/>
          <AppText tx={"auth.login"} color={'white'} capitalize/>
        </View>
      }

    </Pressable>
  )
});

export default LoginCart;

const styles = ScaledSheet.create({
    container: {flexDirection: 'row'},
  avatarContainer: {marginRight: '-20@s', zIndex: 10, borderWidth: 1, borderColor: 'white'},
  avatar: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s'
  },
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
