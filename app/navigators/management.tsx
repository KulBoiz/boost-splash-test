import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { ScaledSheet} from "react-native-size-matters"
import AppHeader from "../components/app-header/AppHeader"
import InDeveloping from "../components/in-developing"
import FinanceScreen from "../screens/loan/finance-screen"
import { ScreenNames } from "./screen-names"
import ManagementTabBar from "../components/bottom-tab-bar/management-tab"

export type ManagementStackParamList = {
  [ScreenNames.MANAGE_FINANCE]: undefined;
  [ScreenNames.MANAGE_INSURANCE]: undefined;
  [ScreenNames.MANAGE_INVEST]: undefined;
}
const Tab = createBottomTabNavigator<ManagementStackParamList>()

export const ManagementStack = () => {
  return (
    <>
      <AppHeader headerText={'Quản lý chung'} isBlue />
      <Tab.Navigator
        initialRouteName={ScreenNames.MANAGE_FINANCE}
        screenOptions={{ headerShown: false }}
        tabBar={(props) => (<ManagementTabBar {...props} />)}
      >
        <Tab.Screen
          name={ScreenNames.MANAGE_FINANCE}
          component={FinanceScreen}
        />
        <Tab.Screen
          name={ScreenNames.MANAGE_INSURANCE}
          component={()=><InDeveloping notShowHeader/>}
        />
        <Tab.Screen
          name={ScreenNames.MANAGE_INVEST}
          component={() => (<InDeveloping notShowHeader={true} />)}
        />
      </Tab.Navigator>
    </>
  )
}

const styles = ScaledSheet.create({});
