import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { ScreenNames } from "./screen-names"
import BottomTabBar from "../components/bottom-tab-bar/BottomTabBar"
import { HomeScreen } from "../screens/home/home-screen"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"


export type AppStackParamList = {
  [ScreenNames.HOME]: undefined;
}
const Tab = createBottomTabNavigator<AppStackParamList>()

export const AppStack = () => {
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
