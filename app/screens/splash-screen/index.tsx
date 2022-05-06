import * as React from "react"
import {View} from "react-native"
import * as Progress from 'react-native-progress';
import {observer} from "mobx-react-lite"
import {useEffect, useState} from "react";
import {ScreenNames} from "../../navigators/screen-names";
import { useStores } from "../../models"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import {ScaledSheet} from 'react-native-size-matters'
import { color } from "../../theme"
import { FinaSplashSvg } from "../../assets/svgs"
import moment from "moment"
import 'moment/locale/vi'
import i18n from "i18n-js"

export const SplashScreen: React.FunctionComponent<{ readonly navigation?: any }> = observer(({navigation}) => {
  const [progress, setProgress] = useState(0)
  const { authStoreModel } = useStores()

  const refreshToken = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    await authStoreModel.refreshTheToken()
    authStoreModel.autoRefreshToken()
  }

  const redirectToNextScreen = () => {
    if (authStoreModel.isFirstTime) {
      setTimeout(() => {
        navigation.navigate(ScreenNames.AUTH)
      }, 3000)
    } else {
      setTimeout(() => {
        navigation.navigate(ScreenNames.APP)
      }, 3000)
    }
  }

  const PROGRESS_FUNCTION_STEPS = [refreshToken]

  const init = async () => {
    const percentPerStep = 1 / PROGRESS_FUNCTION_STEPS.length
    for (let i = 0; i < PROGRESS_FUNCTION_STEPS.length; i++) {
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
        <FastImage source={images.fina_splash} style={styles.image}/>
        <FinaSplashSvg style={styles.finaLogo}/>
        {/* <Progress.Bar progress={progress} width={200} color={"#FFFFFF"} style={styles.processBar}/> */}
    </View>
  )
})

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.blue,
    alignItems:'center',
    justifyContent: 'center'
  },
  image: {
    position: 'absolute',
    width: '350@s',
    height: '700@s'
  },
  finaLogo: {
    marginTop: '50@s'
  },
  processBar: {
    marginTop: '30@s'
  }
})
