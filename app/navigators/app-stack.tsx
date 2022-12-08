import { ScreenNames } from "./screen-names"
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppHomeScreen } from "../screens/home"
import { useStores } from "../models"
import { ROLE } from "../models/auth-store"
import RequestCounselling from "../screens/loan/request-counselling"
import { ManagementStack } from "./management"
import AppTabBar from "../components/bottom-tab-bar/app-tab"
import { View } from "react-native"
import { color } from "../theme"
import { ScaledSheet } from "react-native-size-matters"
import ProfileScreen from "../screens/profile/profile-screen"

export type AppStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.CHAT]: undefined;
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
        screenOptions={{ headerShown: false }}
        tabBar={props => <AppTabBar {...props} />}
      >
        <Tab.Screen
          name={ScreenNames.HOME}
          component={AppHomeScreen}
        />
        {/* <Tab.Screen */}
        {/*  name={ScreenNames.CHAT} */}
        {/*  component={InDeveloping} */}
        {/* /> */}
        {role !== ROLE.BANK &&
          <Tab.Screen
            name={ScreenNames.PLUS}
            options={() => ({
              tabBarStyle: { display: "none" },
              tabBarVisible: false,
            })}
            component={RequestCounselling}
          />
        }
        {role !== ROLE.BANK &&
          <Tab.Screen
            name={ScreenNames.MANAGEMENT}
            options={() => ({
              tabBarStyle: { display: "none" },
              tabBarVisible: false,
            })}
            component={ManagementStack}
          />
        }
        <Tab.Screen
          name={ScreenNames.SETTING}
          component={ProfileScreen}
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
