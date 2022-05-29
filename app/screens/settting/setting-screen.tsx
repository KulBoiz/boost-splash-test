import React, { FC } from "react"
import { View, StyleSheet, Pressable, ScrollView } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { StackActions, useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import AppButton from "../../components/app-button/AppButton"
import { MARGIN_BOTTOM_16, MARGIN_TOP_16 } from "../../styles/common-style"
import { navigate } from "../../navigators"
import { SETTING_LIST } from "./constants"
import SettingItem from "./components/setting-item"
import { color } from "../../theme"
import VerifyUser from "./components/verify-user"

interface Props{}

const SettingScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const {authStoreModel} = useStores()
  const logout= async ()=> {
    await authStoreModel.logout()
    navigation.dispatch(StackActions.push(ScreenNames.AUTH))
  }

  return (
    <View style={styles.container}>
      <AppHeader headerTx={"header.personalSetting"}/>
      <ScrollView>
        <VerifyUser />
        {SETTING_LIST.map((value, index)=> (
          <SettingItem key={index.toString()} icon={value.icon} title={value.title} onPress={value.onPress}/>
        ))}
        <AppButton title={'Đăng xuất'} onPress={logout}/>

        <View style={{height: 100}}/>
      </ScrollView>
    </View>
  )
});

export default SettingScreen;

const styles = StyleSheet.create({
    container: {backgroundColor: color.palette.lightBlue, flex:1},
});
