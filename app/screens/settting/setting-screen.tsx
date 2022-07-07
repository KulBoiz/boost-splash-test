import React, { FC } from "react"
import { View, ScrollView } from "react-native"
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
import SettingAuthScreen from "../../components/app-view-no-auth"
import { navigate } from "../../navigators"
import { ROLE } from "../../models/auth-store"
import { ScaledSheet } from "react-native-size-matters"
import UpdateVersion from "../../components/update-version"

interface Props { }

const SettingScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const { authStoreModel } = useStores()
  const logout = async () => {
    await authStoreModel.logout()
    navigation.dispatch(StackActions.push(ScreenNames.AUTH))
  }
  return (
    <View style={styles.container}>
      <AppHeader headerTx={"header.personalSetting"} />
      {
        authStoreModel?.isLoggedIn ? (
          <ScrollView>
            <VerifyUser renderRole={authStoreModel?.role} />
            {SETTING_LIST.map((value, index) => {
              // index = 1  menu cộng tác viên
              if (index === 1 && (authStoreModel?.role === ROLE.FINA || authStoreModel?.role === ROLE.BANK)) {
                return <View key={index.toString()}/>
              }

              if (index === 1 && authStoreModel?.role === ROLE.CTV) {
                // todo
                return <SettingItem
                  key={index.toString()}
                  active={value.active}
                  icon={value.icon}
                  title={'Hợp đồng cộng tác viên'}
                  onPress={() => {
                    navigate(ScreenNames.AGENT, {screen: ScreenNames.VIEW_CONTRACT})
                  }}
                />

              }
              return <SettingItem
                key={index.toString()}
                active={value.active}
                icon={value.icon}
                title={value.title}
                onPress={value.onPress}
              />
            })}
            <View style={styles.logoutBtn}>
              <AppButton title={"Đăng xuất"} onPress={logout} />
            </View>
            <View style={{ height: 100 }} />
          </ScrollView>
        ) : (
          <SettingAuthScreen />
        )
      }
    </View>
  )
})

export default SettingScreen

const styles = ScaledSheet.create({
  container: { backgroundColor: color.palette.lightBlue, flex: 1 },
  login: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  logoutBtn: {
    padding: '16@ms'
  }
})
