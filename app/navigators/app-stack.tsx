import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { ScreenNames } from "./screen-names"
import React from "react"
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View } from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper"
import { s, ScaledSheet, vs } from "react-native-size-matters"
import SettingScreen from "../screens/settting/setting-screen"
import {
  AccountHomeActiveSvg,
  AccountHomeInactiveSvg,
  ChatHomeActiveSvg,
  ChatHomeInactiveSvg,
  FileHomeActiveSvg,
  FileHomeInactiveSvg,
  HomeActiveSVG,
  HomeInactiveSVG,
  PlusBottomSvg,
} from "../assets/svgs"
import i18n from "i18n-js"
import { color } from "../theme"
import { isAndroid } from "../constants/variable"
import { AppHomeScreen } from "../screens/home"
import { useStores } from "../models"
import { ROLE } from "../models/auth-store"
import InDeveloping from "../components/in-developing"
import RequestCounselling from "../screens/loan/request-counselling"
import { TabBarAdvancedButton } from "../components/bottom-tab-bar/TabBarAdvancedButton"
import { TabBarButton } from "../components/bottom-tab-bar/TabBarButton"
import FinanceScreen from "../screens/loan/finance-screen"


export type AppStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.CHAT]: undefined;
  [ScreenNames.SCHEDULE]: { index?: number };
  [ScreenNames.SETTING]: undefined;
  [ScreenNames.PLUS]: undefined;
}
const Tab = createBottomTabNavigator<AppStackParamList>()

export const AppStack = () => {
  const { authStoreModel } = useStores()
  const { role } = authStoreModel

  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route) || ""
    const allowRoute: string[] = ["", ScreenNames.HOME, ScreenNames.CHAT, ScreenNames.SCHEDULE, ScreenNames.SETTING]
    return allowRoute.includes(routeName)
  }
  return (
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
            title: i18n.t('bottom_bar.home'),
            tabBarVisible: getTabBarVisibility(props.route),
          }
        }}
        component={AppHomeScreen}
      />
      <Tab.Screen
        name={ScreenNames.CHAT}
        options={(props) => {
          return {
            tabBarIcon: ({ focused }) => (
              focused ? <ChatHomeActiveSvg /> : <ChatHomeInactiveSvg />
            ),
            title: i18n.t('bottom_bar.chat'),
            tabBarVisible: getTabBarVisibility(props.route),
          }
        }}
        component={InDeveloping}
      />
      {role !== ROLE.BANK &&
      //   <Tab.Screen
      //   name={ScreenNames.PLUS}
      //   options={(props) => {
      //     return {
      //       tabBarButton: (props) => (
      //         <TabBarButton
      //           bgColor={'#FFFFFF'}
      //           {...props}
      //         />
      //       ),
      //       tabBarVisible: getTabBarVisibility(props.route),
      //     }
      //   }}
      //   component={RequestCounselling}
      // />
        <Tab.Screen
          name={ScreenNames.PLUS}
          options={(props) => {
            return {
            tabBarIcon: () => <PlusBottomSvg width={46} height={46} style={{marginBottom: s(20)}}/>,
            title: i18n.t('bottom_bar.create'),
            tabBarStyle: { display: 'none' },
          }
        }}
        component={RequestCounselling}
        />
      }
      {role !== ROLE.BANK &&
        <Tab.Screen
          name={ScreenNames.SCHEDULE}
          options={(props) => {
            return {
              tabBarIcon: ({ focused }) => (
                focused ? <FileHomeActiveSvg /> : <FileHomeInactiveSvg />
              ),
              title: i18n.t('bottom_bar.management'),
              tabBarVisible: getTabBarVisibility(props.route),
            }
          }}
          component={FinanceScreen}
        />
      }
      <Tab.Screen
        name={ScreenNames.SETTING}
        options={(props) => {
          return {
            tabBarIcon: ({ focused }) => (
              focused ? <AccountHomeActiveSvg /> : <AccountHomeInactiveSvg />
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
