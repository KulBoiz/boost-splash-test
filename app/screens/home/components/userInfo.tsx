import { get } from 'lodash'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Pressable, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ScaledSheet } from 'react-native-size-matters'
import { images } from '../../../assets/images'
import { AppText } from '../../../components/app-text/AppText'
import { fontFamily } from '../../../constants/font-family'
import { useStores } from '../../../models'
import { navigate } from '../../../navigators'
import { ScreenNames } from '../../../navigators/screen-names'
import { ROW } from '../../../styles/common-style'
import { color } from '../../../theme'
import OptionsUserInfo from './optionsUserInfo'
import { getFullName } from "../../../constants/variable"

export const UserInfo = observer(() => {
  const { authStoreModel } = useStores()
  const isLogin = authStoreModel?.isLoggedIn

  const avatar = get(authStoreModel?.user, "avatar")
  const user = get(authStoreModel, "user")
  const name = getFullName(user)

  const onPress = () => {
    if (!isLogin) {
      navigate(ScreenNames.AUTH)
    } else navigate(ScreenNames.SETTING)
  }

  return (
    <>
      <Pressable style={styles.container}onPress={onPress}>
        <View style={[ROW, { alignItems: "center", justifyContent: "space-between" }]}>
          <View style={[ROW, { alignItems: "center" }]}>
            <View>
              <FastImage source={avatar ? { uri: avatar } : images.fina_logo} style={styles.avatar} />
            </View>
              <View style={{ marginLeft: 8 }}>
                <AppText style={[styles.textHello, { marginBottom: 4 }]} value={"Xin chào!"} />
                <AppText style={[styles.textHello, styles.textName]} value={Object.keys(user)?.length ? name : 'Đăng ký/ Đăng nhập'} />
              </View>

          </View>
          <OptionsUserInfo />
        </View>
      </Pressable>
    </>
  )
})

const styles = ScaledSheet.create({
  container: {
    marginVertical: "12@s",
    flexDirection: "column",
    zIndex: 70,
    justifyContent: "center",
    marginHorizontal: "16@s"
  },
  avatar: {
    width: "40@s",
    height: "40@s",
    borderRadius: "20@s",
  },
  // Text
  textHello: {
    fontSize: "12@ms",
    lineHeight: "14@ms",
    fontFamily: fontFamily.semiBold,
    color: color.palette.offWhite,
    opacity: 0.8
  },
  textName: {
    color: color.palette.white,
    opacity: 1
  },
})
