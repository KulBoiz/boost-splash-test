/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
// import { ToggleStorybook } from "../storybook/toggle-storybook"
import { ErrorBoundary } from "./screens/error/error-boundary"
import messaging from "@react-native-firebase/messaging"
import notifee from "@notifee/react-native"
import { NativeBaseProvider } from "native-base"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { theme } from "./theme/theme"
import UpdateVersion from "./components/update-version"
import RNBootSplash from "react-native-bootsplash";
export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  const {
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      // console.log("Authorization status:", authStatus)
    }
  }

  async function onMessageReceived(message) {
    // Do something
    const data = JSON.parse(JSON.stringify(message, null, 2))
    const noti = data?.notification ?? {}
    notifee.displayNotification({
      id: data?.messageId ?? Math.random() * 6,
      title: noti?.title ?? "",
      body: noti?.body ?? "",
    })
  }

  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages()
    // Get the token
    await messaging().getToken()
  }

  messaging().onMessage(onMessageReceived)
  messaging().setBackgroundMessageHandler(onMessageReceived)
  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    RNBootSplash.hide();
    (async () => {
      await initFonts() // expo
      setupRootStore().then(setRootStore)
      await onAppBootstrap()
      await requestUserPermission()
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore || !isNavigationStateRestored) return null

  // otherwise, we're ready to render the app
  return (
    // <ToggleStorybook>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootStoreProvider value={rootStore}>
          <NativeBaseProvider theme={theme}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <ErrorBoundary catchErrors={"always"}>
                <AppNavigator
                  // initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                />
                <UpdateVersion />
              </ErrorBoundary>
            </SafeAreaProvider>
          </NativeBaseProvider>
        </RootStoreProvider>
      </GestureHandlerRootView>
    // </ToggleStorybook>
  )
}

export default App
