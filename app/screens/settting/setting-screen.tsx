import React, { FC } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { StackActions, useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import AppButton from "../../components/app-button/AppButton"
import { MARGIN_BOTTOM_16, MARGIN_TOP_16 } from "../../styles/common-style"
import { navigate } from "../../navigators"

interface Props{}

const SettingScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const {authStoreModel} = useStores()
  const logout= async ()=> {
    await authStoreModel.logout()
    navigation.dispatch(StackActions.push(ScreenNames.AUTH))
  }

  const registerAgent = () => {
    navigate(ScreenNames.AGENT)
  }
  return (
    <View style={styles.container}>
      <AppHeader headerTx={"header.personalSetting"}/>
      {/*<AppButton title={'Đăng kí cộng tác viên'} containerStyle={[MARGIN_BOTTOM_16, MARGIN_TOP_16]} onPress={registerAgent}/>*/}
      <AppButton title={'Đăng xuất'} onPress={logout}/>
    </View>
  )
});

export default SettingScreen;

const styles = StyleSheet.create({
    container: {},
});
