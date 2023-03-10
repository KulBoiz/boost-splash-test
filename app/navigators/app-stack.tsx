import { ScreenNames } from "./screen-names"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppHomeScreen } from "../screens/home"
import { useStores } from "../models"
import { ROLE } from "../models/auth-store"
import AppTabBar from "../components/bottom-tab-bar/app-tab"
import { View } from "react-native"
import { color } from "../theme"
import { ScaledSheet } from "react-native-size-matters"
import FriendZoneScreen from "../screens/friendzone/friendzone-screen"
import InDeveloping from "../components/in-developing"

export type AppStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.CHAT]: undefined;
  [ScreenNames.FRIEND_ZONE]: undefined;
  [ScreenNames.MANAGEMENT]: { index: any };
  [ScreenNames.SETTING]: undefined;
  [ScreenNames.PLUS]: undefined;
}

const Tab = createBottomTabNavigator<AppStackParamList>()

export const AppStack = () => {
  const { authStoreModel } = useStores()
  const { role } = authStoreModel
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName={ScreenNames.HOME}
        screenOptions={{ headerShown: false, unmountOnBlur: true }}
        tabBar={props => <AppTabBar {...props} />}
      >
        <Tab.Screen
          name={ScreenNames.HOME}
          component={AppHomeScreen}
        />
        {role !== ROLE.BANK &&
          <Tab.Screen
            name={ScreenNames.MANAGEMENT}
            options={() => ({
              tabBarStyle: { display: "none" },
              tabBarVisible: false,
            })}
            component={InDeveloping}
          />
        }
        {role !== ROLE.BANK &&
          <Tab.Screen
            name={ScreenNames.PLUS}
            options={() => ({
              tabBarStyle: { display: "none" },
              tabBarVisible: false,
              unmountOnBlur: true
            })}
            component={InDeveloping}
          />
        }

        <Tab.Screen
          name={ScreenNames.FRIEND_ZONE}
          options={() => ({
            // tabBarStyle: { display: "none" },
            // tabBarVisible: false,
          })}
          component={FriendZoneScreen}
        />
        <Tab.Screen
          name={ScreenNames.SETTING}
          component={InDeveloping}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
})
