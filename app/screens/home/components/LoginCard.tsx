import React from 'react';
import { Pressable, View, ViewStyle } from "react-native"
import { s, ScaledSheet } from 'react-native-size-matters';
import { DefaultAvatarSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { observer } from "mobx-react-lite"
import FastImage from "react-native-fast-image"
import { FONT_SEMI_BOLD_12 } from "../../../styles/common-style"

interface Props{
  style?: ViewStyle | any
}

const LoginCart = observer(({ style }: Props) => {
  const {authStoreModel} = useStores()
  // @ts-ignore
  const isLogin = !!authStoreModel?.user?.fullName
  // @ts-ignore
  const haveAvatar = !!authStoreModel?.user?.avatar
  const avatar = authStoreModel?.user?.avatar
  const onPress = () => {
    if (!isLogin){
      navigate(ScreenNames.AUTH)
    }
    return true
  }

  return (
    <Pressable style={[styles.container, style]} onPress={onPress}>
      {haveAvatar ?
        // @ts-ignore
        <FastImage source={{uri: avatar}} style={[styles.avatar, styles.avatarContainer]} /> :
        <DefaultAvatarSvg width={s(40)} height={s(40)} style={styles.avatarContainer} />
      }
      {
        !isLogin &&
        <View style={styles.wrapText}>
          <AppText tx={"auth.login"} color={'white'} style={FONT_SEMI_BOLD_12}/>
        </View>
      }

    </Pressable>
  )
});

export default LoginCart;

const styles = ScaledSheet.create({
    container: {flexDirection: 'row', alignItems: "center"},
  avatarContainer: {marginRight: '-20@s', zIndex: 10},
  avatar: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
    borderWidth: 1,
    borderColor: 'white',
  },
  wrapText: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#407BFF',
    height: '30@s',
    paddingRight: '8@s',
    paddingLeft: '28@ms',
    borderRadius: '8@s'
    }
});
