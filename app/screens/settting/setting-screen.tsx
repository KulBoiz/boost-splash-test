import React, { FC } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { StackActions, useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import { AppText } from "../../components/app-text/AppText"

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
      <Pressable onPress={logout}>
        <AppText>LOGOUT</AppText>
      </Pressable>
    </View>
  )
});

export default SettingScreen;

const styles = StyleSheet.create({
    container: {},
});
