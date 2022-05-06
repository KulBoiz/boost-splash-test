import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { ScreenNames } from "./screen-names"
// import BottomTabBar from "../components/bottom-tab-bar/BottomTabBar"
import { HomeScreen } from "../screens/home/home-screen"
import React from "react"
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import { FontAwesome as Icon } from '@expo/vector-icons';
import { TabBarAdvancedButton } from "../components/bottom-tab-bar/TabBarAdvancedButton"
import { View } from "react-native"
import { isIphoneX } from 'react-native-iphone-x-helper';
import {s, ScaledSheet} from 'react-native-size-matters'
import SettingScreen from "../screens/settting/setting-screen"
import { HomeActiveSVG, HomeInactiveSVG, SettingActiveSVG, SettingInactiveSVG } from "../assets/svgs"
import i18n from "i18n-js"
import { color } from "../theme"


export type AppStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.CHAT]: undefined;
  [ScreenNames.SCHEDULE]: undefined;
  [ScreenNames.SETTING]: undefined;
  [ScreenNames.PLUS]: undefined;
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
      screenOptions={{ headerShown: false ,tabBarStyle: styles.navigator, tabBarItemStyle: styles.itemStyle}}
      tabBar={(props) => (
        <View style={[styles.navigatorContainer, !isIphoneX() && {height: s(50)}]}>
          <BottomTabBar
            {...props}
          />
          {isIphoneX() && (
            <View style={styles.xFillLine}/>
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
            title: i18n.t('bottom_bar.home'),
            tabBarVisible: getTabBarVisibility(props.route),
          }
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={ScreenNames.CHAT}
        options={(props) => {
          return {
            tabBarIcon: ({ color }) => (
              <Icon
                name="wechat"
                size={24}
                color={color}
              />
            ),
            title: i18n.t('bottom_bar.chat'),
            tabBarVisible: getTabBarVisibility(props.route),
          }
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={ScreenNames.PLUS}
        options={(props) => {
          return {
            tabBarButton: (props) => (
              <TabBarAdvancedButton
                bgColor={'#FFFFFF'}
                {...props}
              />
            ),
            tabBarVisible: getTabBarVisibility(props.route),
          }
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={ScreenNames.SCHEDULE}
        options={(props) => {
          return {
            tabBarIcon: ({ color }) => (
              <Icon
                name="calendar"
                size={24}
                color={color}
              />
            ),
            title: i18n.t('bottom_bar.management'),
            tabBarVisible: getTabBarVisibility(props.route),
          }
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={ScreenNames.SETTING}
        options={(props) => {
          return {
            tabBarIcon: ({ focused }) => (
              focused ? <SettingActiveSVG /> : <SettingInactiveSVG />
            ),
            title: i18n.t('bottom_bar.setting'),
            tabBarVisible: getTabBarVisibility(props.route),

          }
        }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  )
}

const styles = ScaledSheet.create({

  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    elevation: 30
  },
  itemStyle: {backgroundColor: 'white', height: '55@ms', paddingVertical: '7@s' },
  xFillLine: {
    backgroundColor: color.background,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20@s'
  }
});
