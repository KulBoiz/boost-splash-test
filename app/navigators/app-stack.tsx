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
            <View style={[styles.xFillLine, { backgroundColor: '#FFFFFF' }]}/>
          )}
        </View>
      )}
    >
      <Tab.Screen
        name={ScreenNames.HOME}
        options={(props) => {
          return {
            tabBarIcon: ({ color }) => (
              <Icon
                name="home"
                size={24}
                color={color}
              />
            ),
            title: "HOME",
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
            title: "CHAT",
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
                name="home"
                size={24}
                color={color}
              />
            ),
            title: "SCHEDULE",
            tabBarVisible: getTabBarVisibility(props.route),
          }
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={ScreenNames.SETTING}
        options={(props) => {
          return {
            tabBarIcon: ({ color }) => (
              <Icon
                name="gear"
                size={24}
                color={color}
              />
            ),
            title: "SETTING",
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
  itemStyle: {backgroundColor: 'white', height: '50@s', paddingVertical: '7@s' },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '15@s'
  }
});
