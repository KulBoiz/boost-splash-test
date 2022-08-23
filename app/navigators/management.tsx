import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import React from "react"
import { View } from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper"
import { ScaledSheet, vs } from "react-native-size-matters"
import {
  AccountHomeActiveSvg,
  AccountHomeInactiveSvg,
  ChatHomeActiveSvg,
  ChatHomeInactiveSvg,
  HomeActiveSVG,
  HomeInactiveSVG
} from "../assets/svgs"
import AppHeader from "../components/app-header/AppHeader"
import InDeveloping from "../components/in-developing"
import { isAndroid } from "../constants/variable"
import InsuranceScreen from "../screens/deal/insurance-screen"
import FinanceScreen from "../screens/loan/finance-screen"
import { color } from "../theme"
import { ScreenNames } from "./screen-names"

export type ManagementStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.CHAT]: undefined;
  [ScreenNames.SCHEDULE]: { index?: number };
  [ScreenNames.SETTING]: undefined;
  [ScreenNames.PLUS]: undefined;
}
const Tab = createBottomTabNavigator<ManagementStackParamList>()

export const ManagementStack = () => {

  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) || ""
    const allowRoute: string[] = ["", ScreenNames.HOME, ScreenNames.CHAT, ScreenNames.SETTING]
    return allowRoute.includes(routeName)
  }
  return (
    <>
      <AppHeader headerText={'Quản lý chung'} isBlue />
      <Tab.Navigator
        initialRouteName={ScreenNames.HOME}
        screenOptions={{ headerShown: false, tabBarStyle: styles.navigator, tabBarItemStyle: styles.itemStyle }}
        tabBar={(props) => (
          <View style={[styles.navigatorContainer, !isIphoneX() && { height: vs(50) }]}>
            <BottomTabBar
              {...props}
            />
            {isIphoneX() && (
              <View style={styles.xFillLine} />
            )}
          </View>
        )}
      >
        <Tab.Screen
          name={ScreenNames.HOME}
          options={(props) => {
            return {
              tabBarIcon: ({ focused }) => (
                focused ? <HomeActiveSVG /> : <HomeInactiveSVG />
              ),
              title: 'Tài chính',
              tabBarVisible: getTabBarVisibility(props.route),
            }
          }}
          component={FinanceScreen}
        />
        <Tab.Screen
          name={ScreenNames.CHAT}
          options={(props) => {
            return {
              tabBarIcon: ({ focused }) => (
                focused ? <ChatHomeActiveSvg /> : <ChatHomeInactiveSvg />
              ),
              title: 'Bảo hiểm',
              tabBarVisible: getTabBarVisibility(props.route),
            }
          }}
          component={()=><InDeveloping notShowHeader/>}
        />
        <Tab.Screen
          name={ScreenNames.SETTING}
          options={(props) => {
            return {
              tabBarIcon: ({ focused }) => (
                focused ? <AccountHomeActiveSvg /> : <AccountHomeInactiveSvg />
              ),
              title: 'Đầu tư',
              tabBarVisible: getTabBarVisibility(props.route),

            }
          }}
          component={() => (<InDeveloping notShowHeader={true} />)}
        />
      </Tab.Navigator>
    </>
  )
}

const styles = ScaledSheet.create({
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
  },
  itemStyle: { backgroundColor: 'white', height: isAndroid ? '57@ms' : isIphoneX() ? '55@ms' : '50@ms', paddingVertical: '7@vs' },
  xFillLine: {
    backgroundColor: color.background,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20@vs'
  }
});
