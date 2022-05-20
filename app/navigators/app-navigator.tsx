import React from "react"
import { useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigation-utilities"
import { ScreenNames } from "./screen-names"
import { SplashScreen } from "../screens"
import { AppStack } from "./app-stack"
import { AuthStack } from "./auth-stack"
import NoticeScreen from "../screens/notice/notice-screen"
import LoanDetail from "../screens/loan/loan-detail"
import RegisterLoan from "../screens/loan/register-loan"
import ProfileDetail from "../screens/loan-profile/profile-detail"
import FinanceScreen from "../screens/loan/finance-screen"
import TermAndPolicy from "../screens/term-and-policy"
import RequestCounselling from "../screens/loan/request-counselling"
import InsuranceScreen from "../screens/insurance/insurance-screen"
import InsurancePackage from "../screens/insurance/insurance-package"
import InsuranceDetail from "../screens/insurance/insurance-detail"
import { IntroduceScreen } from "../screens/insurance/introduce/introduce-screen"
import { AgentStack } from "./agent-stack"
import { RegisterScreen } from "../screens/auth/register-screen"
import PhotoTutorial from "../screens/agent/photo-tutorial"
import RegisterInfo from "../screens/agent/register-info"
import BecomeAgent from "../screens/agent/become-agent"
import CheckInfo from "../screens/agent/check-info"
import CaptureId from "../screens/agent/capture-id"
import RegisterAgent from "../screens/agent/register-agent"

export type NavigatorParamList = {
  [ScreenNames.SPLASH]: undefined;
  [ScreenNames.AGENT]: undefined;
  [ScreenNames.AUTH]: undefined;
  [ScreenNames.APP]: undefined;
  [ScreenNames.REQUEST_COUNSELLING]: undefined;
  [ScreenNames.NOTICE]: undefined;
  [ScreenNames.LOAN_DETAIL]: undefined;
  [ScreenNames.REGISTER_LOAN]: undefined;
  [ScreenNames.PROFILE_DETAIL]: undefined;
  [ScreenNames.FINANCE]: { index: number };
  [ScreenNames.TERM_AND_POLICY]: { id: number };
  [ScreenNames.INSURANCE_SCREEN]: {id?: number};
  [ScreenNames.INSURANCE_PACKAGE]: undefined;
  [ScreenNames.INSURANCE_DETAIL]: undefined;
  [ScreenNames.INTRODUCE_SCREEN]: undefined;
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
      <Stack.Screen name={ScreenNames.AGENT} component={RegisterAgent} options={{gestureEnabled: false}}/>
      <Stack.Screen name={ScreenNames.AUTH} component={AuthStack} options={{gestureEnabled: false}}/>
      <Stack.Screen name={ScreenNames.APP} component={AppStack} options={{gestureEnabled: false}} />
      <Stack.Screen name={ScreenNames.REQUEST_COUNSELLING} component={RequestCounselling} />
      <Stack.Screen name={ScreenNames.NOTICE} component={NoticeScreen} />
      <Stack.Screen name={ScreenNames.LOAN_DETAIL} component={LoanDetail} />
      <Stack.Screen name={ScreenNames.REGISTER_LOAN} component={RegisterLoan} />
      <Stack.Screen name={ScreenNames.PROFILE_DETAIL} component={ProfileDetail} />
      <Stack.Screen name={ScreenNames.FINANCE} component={FinanceScreen} />
      <Stack.Screen name={ScreenNames.TERM_AND_POLICY} component={TermAndPolicy} />
      <Stack.Screen name={ScreenNames.INSURANCE_SCREEN} component={InsuranceScreen} />
      <Stack.Screen name={ScreenNames.INSURANCE_PACKAGE} component={InsurancePackage} />
      <Stack.Screen name={ScreenNames.INSURANCE_DETAIL} component={InsuranceDetail} />
      <Stack.Screen name={ScreenNames.INTRODUCE_SCREEN} component={IntroduceScreen} />
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
