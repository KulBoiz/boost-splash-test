import React from "react"
import { useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, getFocusedRouteNameFromRoute, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigation-utilities"
import { ScreenNames } from "./screen-names"
import BottomTabBar from "../components/bottom-tab-bar/BottomTabBar"
import { AuthRoutes } from "./routes"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScreen } from "../screens/home/home-screen"
import { SplashScreen } from "../screens"
import FifthScreen from "../screens/welcome/fifth-screen"

export type NavigatorParamList = {
  [ScreenNames.SPLASH]: undefined;
  [ScreenNames.AUTH]: undefined;
  [ScreenNames.APP]: undefined;
  [ScreenNames.LOGIN]: undefined;
  [ScreenNames.HOME]: undefined;
  [ScreenNames.FIFTH_SCREEN]: undefined;

}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const Tab = createBottomTabNavigator<NavigatorParamList>()

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.LOGIN}
    >
      {
        AuthRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}} />
        ))
      }
    </Stack.Navigator>
  )
}

const AppStack = () => {
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) || ""
    const allowRoute: string[] = ["", ScreenNames.HOME]
    return allowRoute.includes(routeName)
  }
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME}
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen
        name={ScreenNames.HOME}
        options={(props) => {
          return {
            title: "QrLog",
            tabBarVisible: getTabBarVisibility(props.route),
          }
        }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  )
}

const RootStack = ()=> {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.SPLASH}
    >
      <Stack.Screen name={ScreenNames.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ScreenNames.AUTH} component={AuthStack} />
      <Stack.Screen name={ScreenNames.APP} component={AppStack} />
      <Stack.Screen name={ScreenNames.FIFTH_SCREEN} component={FifthScreen} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <RootStack />
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
