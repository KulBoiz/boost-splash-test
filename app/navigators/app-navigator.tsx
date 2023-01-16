import React from "react"
import { useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigation-utilities"
import { ScreenNames } from "./screen-names"
import { PhotoPickerScreen, SplashScreen, WelcomeScreen } from "../screens"
import { AppStack } from "./app-stack"
import { AuthStack } from "./auth-stack"
import NoticeScreen from "../screens/notice/notice-screen"
import TermAndPolicy from "../screens/term-and-policy"
import InDeveloping from "../components/in-developing"
import SuccessScreen from "../components/success-screen"
import { NavigatorParamList } from "./params-list"
import { Host } from "react-native-portalize"

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.SPLASH}
    >
      <Stack.Screen name={ScreenNames.SPLASH} component={SplashScreen} />
      <Stack.Screen
        name={ScreenNames.WELCOME}
        component={WelcomeScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={ScreenNames.AUTH} component={AuthStack} />
      <Stack.Screen
        name={ScreenNames.APP}
        component={AppStack}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={ScreenNames.NOTICE} component={NoticeScreen} />
      <Stack.Screen name={ScreenNames.TERM_AND_POLICY} component={TermAndPolicy} />
      <Stack.Screen name={ScreenNames.PHOTO_PICKER} component={PhotoPickerScreen} />
      <Stack.Screen name={ScreenNames.IN_DEVELOPING} component={InDeveloping} />
      <Stack.Screen name={ScreenNames.SUCCESS_SCREEN} component={SuccessScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <Host>
        <RootStack />
      </Host>
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
