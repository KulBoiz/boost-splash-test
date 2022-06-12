import { useFocusEffect } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { BackHandler } from "react-native"
import { useStores } from "../../models"
import { ROLE } from "../../models/auth-store"
import { AppStackParamList } from "../../navigators/app-stack"
import { ScreenNames } from "../../navigators/screen-names"
import { BankHomeScreen } from "./home-banker/home-screen"
import { HomeScreen } from "./home-fina/home-screen"

export const AppHomeScreen: FC<StackScreenProps<AppStackParamList, ScreenNames.HOME>> = observer(
  ({ navigation }) => {
    useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
    });
    // @ts-ignore
    const { authStoreModel } = useStores()
    const { role } = authStoreModel

    if (role === ROLE.CTV || role === ROLE.FINA || role === ROLE.KH) {
      return <HomeScreen navigation={navigation} />
    }

    return (
      <BankHomeScreen navigation={navigation}/>
    )
  },
)
// const styles = ScaledSheet.create({

// })