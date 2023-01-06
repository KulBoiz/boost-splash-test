import * as React from "react"
import {View} from "react-native"
import {observer} from "mobx-react-lite"
import {useEffect, useState} from "react";
import {ScreenNames} from "../../navigators/screen-names";
import { useStores } from "../../models"
import {ScaledSheet} from 'react-native-size-matters'
import moment from "moment"
import 'moment/locale/vi'
import i18n from "i18n-js"
import LunarNewYear from "./lunar-new-year"
import NormalSplash from "./normal-splash"

export const SplashScreen: React.FunctionComponent<{ readonly navigation?: any }> = observer(({navigation}) => {
  const [progress, setProgress] = useState(0)
  const { authStoreModel, loanStore } = useStores()

  const refreshToken = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // await authStoreModel.refreshTheToken()
    // authStoreModel.autoRefreshToken()
  }

  const redirectToNextScreen = () => {
    if (authStoreModel?.isFirstTime) {
      setTimeout(() => {
        navigation.navigate(ScreenNames.WELCOME)
      }, 2000)
    } else {
      setTimeout(() => {
        navigation.navigate(ScreenNames.APP)
      }, 2000)
    }
  }

  const PROGRESS_FUNCTION_STEPS = [refreshToken]

  const init = async () => {
    const percentPerStep = 1 / PROGRESS_FUNCTION_STEPS?.length
    for (let i = 0; i < PROGRESS_FUNCTION_STEPS?.length; i++) {
      await PROGRESS_FUNCTION_STEPS[i]()
      setProgress(percentPerStep * i * 100)
    }
   await redirectToNextScreen()
  }

  useEffect(() => {
    i18n.locale = 'vi';
    moment.locale('vi')
    init()
  }, [])

  return (
    <View style={styles.container}>
      {/* <NormalSplash /> */}
      <LunarNewYear />
    </View>
  )
})

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },

})
