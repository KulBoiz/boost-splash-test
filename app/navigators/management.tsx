import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { ScaledSheet } from "react-native-size-matters"
import AppHeader from "../components/app-header/AppHeader"
import InDeveloping from "../components/in-developing"
import FinanceScreen from "../screens/loan/finance-screen"
import { ScreenNames } from "./screen-names"
import ManagementTabBar from "../components/bottom-tab-bar/management-tab"
import { View } from "react-native"
import { color } from "../theme"
import { navigate } from "./navigation-utilities"
import InsuranceTab from "../screens/deal/insurance-screen"
import InvestManagement from "../screens/management/invest/invest-management"

export type ManagementStackParamList = {
  [ScreenNames.MANAGE_FINANCE]: { index: any };
  [ScreenNames.MANAGE_INSURANCE]: undefined;
  [ScreenNames.MANAGE_INVEST]: undefined;
}
const Tab = createBottomTabNavigator<ManagementStackParamList>()

export const ManagementStack = () => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Quản lý chung'} isBlue onLeftPress={()=> navigate(ScreenNames.HOME)}/>
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
          component={InsuranceTab}
        />
        <Tab.Screen
          name={ScreenNames.MANAGE_INVEST}
          component={InvestManagement}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = ScaledSheet.create({
  container:{
    flex: 1,
    backgroundColor: color.background
  }
});
