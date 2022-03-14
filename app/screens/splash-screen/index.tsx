import * as React from "react"
import {View, ViewStyle} from "react-native"
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

export const FULL_SCREEN_STYLE : ViewStyle= {
  flex:1,
  display: 'flex',
  // position: 'relative'
}


export const SplashScreen: React.FunctionComponent<{ readonly navigation?: any }> = observer(({navigation}) => {
  const [progress, setProgress] = useState(0)
  // const {authStore, listingStore, navigationStore, geoLocationStore, appContextStore} = useStores()
  const { authStoreModel } = useStores()

  const refreshToken = async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    await authStoreModel.refreshTheToken()
    authStoreModel.autoRefreshToken()
  }
  //
  // const loadRecentListing = async () => {
  //   await listingStore.getRecentListing()
  // }
  //
  // const loadAllListing = async () => {
  //   await listingStore.getMyListingByStatus("")
  // }
  //
  // const cleanCurrentLocation = async () => {
  //   await geoLocationStore.setCurrentLocation({})
  // }
  // const cleanCurrentListing = async () => {
  //   await listingStore.setEditingListing({...INIT_LISTING})
  // }
  //
  // const loadState = async () => {
  //   await geoLocationStore.loadStateIfEmpty()
  // }
  //
  const redirectToNextScreen = () => {
    if (!authStoreModel.token || !authStoreModel.refreshToken) {
      setTimeout(() => {
        navigation.navigate(ScreenNames.AUTH)
      }, 5000)
    } else {
      setTimeout(() => {
        navigation.navigate(ScreenNames.APP)
      }, 5000)
    }
      // setTimeout(() => {
      //   navigation.navigate(ScreenNames.AUTH)
      // }, 5000)
  }
  //
  const PROGRESS_FUNCTION_STEPS = [refreshToken]

  const init = async () => {
    const percentPerStep = 1 / PROGRESS_FUNCTION_STEPS.length
    for (let i = 0; i < PROGRESS_FUNCTION_STEPS.length; i++) {
      await PROGRESS_FUNCTION_STEPS[i]()
      setProgress(percentPerStep * i * 100)
    }
    redirectToNextScreen()
    // await redirectToNextScreenTest()

  }

  useEffect(() => {
    init()
  }, [])

  return (
    <View style={styles.container}>
        <FastImage source={images.fina_splash} style={styles.image}/>
        <FinaSplashSvg style={styles.finaLogo}/>
        <Progress.Bar progress={progress} width={200} color={"#FFFFFF"} style={styles.processBar}/>
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
    marginTop: '90@s'

  },
  processBar: {
    marginTop: '30@s'
  }
})
