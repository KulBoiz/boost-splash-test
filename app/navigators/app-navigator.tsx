import React from "react"
import { useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigation-utilities"
import { ScreenNames } from "./screen-names"
import { SplashScreen } from "../screens"
import { AppStack } from "./app-stack"
import { AuthStack } from "./auth-stack"
import RequestCounselling from "../screens/home/request-counselling-screen"
import NoticeScreen from "../screens/notice/notice-screen"
import LoanDetail from "../screens/loan/loan-detail"
import RegisterLoan from "../screens/loan/register-loan"
import ProfileDetail from "../screens/loan/profile-detail"
import IntroduceLoanCustomer from "../screens/loan/introduce-customer"
import FinanceScreen from "../screens/loan/finance-screen"

export type NavigatorParamList = {
  [ScreenNames.SPLASH]: undefined;
  [ScreenNames.AUTH]: undefined;
  [ScreenNames.APP]: undefined;
  [ScreenNames.REQUEST_COUNSELLING]: undefined;
  [ScreenNames.NOTICE]: undefined;
  [ScreenNames.LOAN_DETAIL]: undefined;
  [ScreenNames.REGISTER_LOAN]: undefined;
  [ScreenNames.PROFILE_DETAIL]: undefined;
  [ScreenNames.INTRODUCE_LOAN_CUSTOMER]: undefined;
  [ScreenNames.FINANCE]: undefined;
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()



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
      <Stack.Screen name={ScreenNames.REQUEST_COUNSELLING} component={RequestCounselling} />
      <Stack.Screen name={ScreenNames.NOTICE} component={NoticeScreen} />
      <Stack.Screen name={ScreenNames.LOAN_DETAIL} component={LoanDetail} />
      <Stack.Screen name={ScreenNames.REGISTER_LOAN} component={RegisterLoan} />
      <Stack.Screen name={ScreenNames.PROFILE_DETAIL} component={ProfileDetail} />
      <Stack.Screen name={ScreenNames.INTRODUCE_LOAN_CUSTOMER} component={IntroduceLoanCustomer} />
      <Stack.Screen name={ScreenNames.FINANCE} component={FinanceScreen} />
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
