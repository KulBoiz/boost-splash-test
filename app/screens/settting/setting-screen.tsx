import React, { FC } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { StackActions, useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import AppButton from "../../components/app-button/AppButton"
import { SETTING_LIST } from "./constants"
import SettingItem from "./components/setting-item"
import { color } from "../../theme"
import VerifyUser from "./components/verify-user"
import { AppText } from "../../components/app-text/AppText"

interface Props{}

const SettingScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const {authStoreModel} = useStores()
  const logout= async ()=> {
    await authStoreModel.logout()
    navigation.dispatch(StackActions.push(ScreenNames.AUTH))
  }

  const login = () => {
    navigation.dispatch(StackActions.push(ScreenNames.AUTH))

  }

  return (
    <View style={styles.container}>
      <AppHeader headerTx={"header.personalSetting"}/>
      {authStoreModel?.isLoggedIn ?
        <ScrollView>
          <VerifyUser />
          {SETTING_LIST.map((value, index) => (
            <SettingItem key={index.toString()} active={value.active} icon={value.icon} title={value.title} onPress={value.onPress} />
          ))}
          <AppButton title={'Đăng xuất'} onPress={logout} />

          <View style={{ height: 100 }} />
        </ScrollView>
        :
        <View style={styles.login}>
          <AppText value={'Bạn cần phải đăng nhập để sử dụng tính năng này'}/>
          <AppText value={'Đăng nhập'} underline onPress={login} color={color.palette.blue}/>
        </View>
      }
    </View>
  )
});

export default SettingScreen;

const styles = StyleSheet.create({
    container: {backgroundColor: color.palette.lightBlue, flex:1},
  login: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});
