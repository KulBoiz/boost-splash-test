import { useFocusEffect } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { BackHandler } from "react-native"
import { useStores } from "../../models"
import { AppStackParamList } from "../../navigators/app-stack"
import { ScreenNames } from "../../navigators/screen-names"
import HomeFina from "./home-fina/home-fina"

export const AppHomeScreen: FC<StackScreenProps<AppStackParamList, ScreenNames.HOME>> = observer(
  ({ navigation }) => {
    const {notificationModel} = useStores()

    useEffect(()=> {
      notificationModel.checkNotification()
    },[])

    useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
    });

    return (
       <HomeFina />
    )
  },
)
