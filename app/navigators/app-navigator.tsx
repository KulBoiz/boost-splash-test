import React from "react"
import { useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigation-utilities"
import { ScreenNames } from "./screen-names"
import { SplashScreen, WelcomeScreen, PhotoPickerScreen } from "../screens"
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
import InsuranceClaimDetail from "../screens/insurance/claim/insurance-claim-detail"
import { IntroduceScreen } from "../screens/insurance/introduce/introduce-screen"
import BannerDetail from "../screens/home/home-fina/banner-detail"
import { AgentStack } from "./agent-stack"
import BankerListLoanScreen from "../screens/banker/banker-list-loan-screen"
import BankerLoanDetailScreen from "../screens/banker/banker-loan-detail-screen"
import BankerListRequestScreen from "../screens/banker/banker-list-request-screen"
import BankerRequestDetailScreen from "../screens/banker/banker-request-detail-screen"
import InDeveloping from "../components/in-developing"
import ManageInsuranceListScreen from "../screens/insurance/manage-insurance-list-screen"
import ManageInsuranceFilerScreen from "../screens/insurance/manage-insurance-filter-screen"
import InsuranceRequestClaimSuccessScreen from "../screens/insurance/insurance-request-claim-success-screen"
import ManageInsuranceDetailScreen from "../screens/insurance/manage-insurance-detail-screen"
import ClaimInsuranceDetailScreen from "../screens/insurance/claim-insurance"
import UserProfile from "../screens/settting/profile/user-profile"

export type NavigatorParamList = {
  [ScreenNames.SPLASH]: undefined
  [ScreenNames.WELCOME]: undefined
  [ScreenNames.AGENT]: undefined
  [ScreenNames.AUTH]: undefined
  [ScreenNames.APP]: undefined
  [ScreenNames.REQUEST_COUNSELLING]: undefined
  [ScreenNames.NOTICE]: undefined
  [ScreenNames.USER_PROFILE]: undefined
  [ScreenNames.LOAN_DETAIL]: undefined
  [ScreenNames.REGISTER_LOAN]: undefined
  [ScreenNames.PROFILE_DETAIL]: undefined
  [ScreenNames.FINANCE]: { index: number }
  [ScreenNames.TERM_AND_POLICY]: { id: number }
  [ScreenNames.INSURANCE_SCREEN]: { id?: number }
  [ScreenNames.INSURANCE_PACKAGE]: undefined
  [ScreenNames.INSURANCE_CLAIM_DETAIL]: { index: number }
  [ScreenNames.INTRODUCE_SCREEN]: undefined
  [ScreenNames.BANNER_DETAIL]: { url: string }
  [ScreenNames.BANNER_DETAIL]: { url: string }
  [ScreenNames.PHOTO_PICKER]: {
    onConfirm?: (photo) => void
  }
  [ScreenNames.BANKER_LIST_REQUEST_SCREEN]: undefined
  [ScreenNames.BANKER_REQUEST_DETAIL_SCREEN]: { data: any }
  [ScreenNames.BANKER_LIST_LOAN_SCREEN]: undefined
  [ScreenNames.BANKER_LOAN_DETAIL_SCREEN]: { tab: any, index: number }
  [ScreenNames.IN_DEVELOPING]: undefined
  [ScreenNames.MANAGE_INSURANCE_LIST]: { key?: string }
  [ScreenNames.MANAGE_INSURANCE_FILTER]: undefined
  [ScreenNames.INSURANCE_REQUEST_CLAIM_SUCCESS_SCREEN]: undefined
  [ScreenNames.MANAGE_INSURANCE_DETAIL_SCREEN]: { index: number, isListBuy: any }
  [ScreenNames.CLAIM_INSURANCE]: { productId: string, index: string}
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<NavigatorParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.SPLASH}
    >
      <Stack.Screen name={ScreenNames.SPLASH} component={SplashScreen} />
      <Stack.Screen
        name={ScreenNames.WELCOME}
        component={WelcomeScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name={ScreenNames.AGENT}
        component={AgentStack}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={ScreenNames.AUTH} component={AuthStack} />
      <Stack.Screen
        name={ScreenNames.APP}
        component={AppStack}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={ScreenNames.REQUEST_COUNSELLING} component={RequestCounselling} />
      <Stack.Screen name={ScreenNames.NOTICE} component={NoticeScreen} />
      <Stack.Screen name={ScreenNames.LOAN_DETAIL} component={LoanDetail} />
      <Stack.Screen name={ScreenNames.REGISTER_LOAN} component={RegisterLoan} />
      <Stack.Screen name={ScreenNames.PROFILE_DETAIL} component={ProfileDetail} />
      <Stack.Screen name={ScreenNames.FINANCE} component={FinanceScreen} />
      <Stack.Screen name={ScreenNames.TERM_AND_POLICY} component={TermAndPolicy} />
      <Stack.Screen name={ScreenNames.INSURANCE_SCREEN} component={InsuranceScreen} />
      <Stack.Screen name={ScreenNames.INSURANCE_PACKAGE} component={InsurancePackage} />
      <Stack.Screen name={ScreenNames.INSURANCE_CLAIM_DETAIL} component={InsuranceClaimDetail} />
      <Stack.Screen name={ScreenNames.INTRODUCE_SCREEN} component={IntroduceScreen} />
      <Stack.Screen name={ScreenNames.BANNER_DETAIL} component={BannerDetail} />
      <Stack.Screen name={ScreenNames.PHOTO_PICKER} component={PhotoPickerScreen} />
      <Stack.Screen name={ScreenNames.IN_DEVELOPING} component={InDeveloping} />
      <Stack.Screen
        name={ScreenNames.BANKER_LIST_REQUEST_SCREEN}
        component={BankerListRequestScreen}
      />
      <Stack.Screen
        name={ScreenNames.BANKER_REQUEST_DETAIL_SCREEN}
        component={BankerRequestDetailScreen}
      />
      <Stack.Screen name={ScreenNames.BANKER_LIST_LOAN_SCREEN} component={BankerListLoanScreen} />
      <Stack.Screen
        name={ScreenNames.BANKER_LOAN_DETAIL_SCREEN}
        component={BankerLoanDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.MANAGE_INSURANCE_LIST}
        component={ManageInsuranceListScreen}
      />
      <Stack.Screen
        name={ScreenNames.MANAGE_INSURANCE_FILTER}
        component={ManageInsuranceFilerScreen}
      />
      <Stack.Screen
        name={ScreenNames.INSURANCE_REQUEST_CLAIM_SUCCESS_SCREEN}
        component={InsuranceRequestClaimSuccessScreen}
      />
      <Stack.Screen
        name={ScreenNames.MANAGE_INSURANCE_DETAIL_SCREEN}
        component={ManageInsuranceDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.CLAIM_INSURANCE}
        component={ClaimInsuranceDetailScreen}
      />
      <Stack.Screen
        name={ScreenNames.USER_PROFILE}
        component={UserProfile}
      />
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
