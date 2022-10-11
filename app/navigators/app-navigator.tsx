import React from "react"
import { useColorScheme } from "react-native"
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { navigationRef } from "./navigation-utilities"
import { ScreenNames } from "./screen-names"
import { PhotoPickerScreen, SplashScreen, WelcomeScreen } from "../screens"
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
import BannerDetail from "../screens/home/home-fina/components/banner-detail"
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
import UserProfile from "../screens/profile/profile/user-profile"
import InsuranceList from "../screens/new-insurance/insurance-list"
import ProductList from "../screens/product/product-list"
import SuccessScreen from "../components/success-screen"
import ProjectTab from "../screens/product/project-tab"
import { NavigatorParamList } from "./params-list"
import { CommissionStack } from "./commission-stack"
import { ManagementStack } from "./management"
import { InvestStack } from "./invest-stack"
import MarketSale from "../screens/invest/market/market-sale"
import ConfirmSale from "../screens/invest/market/confirm-sale"
import BondsDetail from "../screens/invest/market/bonds-detail"
import MarketPurchase from "../screens/invest/market/market-purchase"
import MarketBuy from "../screens/invest/market/market-buy"
import InvestSuccess from "../screens/invest/invest-success"
import FundDetail from "../screens/invest/market/fund-detail"
import InvestOtp from "../screens/invest/market/invest-otp"
import InvestTab from "../screens/invest/invest-tab"

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
        name={ScreenNames.INVEST}
        component={InvestStack}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name={ScreenNames.AGENT}
        component={AgentStack}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={ScreenNames.AUTH} component={AuthStack} />
      <Stack.Screen name={ScreenNames.COMMISSION} component={CommissionStack} />
      <Stack.Screen name={ScreenNames.SALE_BONDS} component={MarketSale} />
      <Stack.Screen name={ScreenNames.INVEST_TAB} component={InvestTab} />
      <Stack.Screen name={ScreenNames.FUND_DETAIL} component={FundDetail} />
      <Stack.Screen name={ScreenNames.INVEST_OTP} component={InvestOtp} />
      <Stack.Screen name={ScreenNames.BONDS_DETAIL} component={BondsDetail} />
      <Stack.Screen name={ScreenNames.PURCHASE_BONDS} component={MarketPurchase} />
      <Stack.Screen name={ScreenNames.BUY_BONDS} component={MarketBuy} />
      <Stack.Screen name={ScreenNames.INVEST_SUCCESS} component={InvestSuccess} />
      <Stack.Screen name={ScreenNames.CONFIRM_SALE} component={ConfirmSale} />
      <Stack.Screen name={ScreenNames.MANAGEMENT} component={ManagementStack} />

      <Stack.Screen
        name={ScreenNames.APP}
        component={AppStack}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name={ScreenNames.REQUEST_COUNSELLING} component={RequestCounselling} />
      <Stack.Screen name={ScreenNames.NOTICE} component={NoticeScreen} />
      <Stack.Screen name={ScreenNames.LOAN_DETAIL} component={LoanDetail} />
      <Stack.Screen name={ScreenNames.LOAN_PRODUCT} component={ProductList} />
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
      <Stack.Screen name={ScreenNames.BANKER_LIST_REQUEST_SCREEN} component={BankerListRequestScreen} />
      <Stack.Screen name={ScreenNames.BANKER_REQUEST_DETAIL_SCREEN} component={BankerRequestDetailScreen} />
      <Stack.Screen name={ScreenNames.BANKER_LIST_LOAN_SCREEN} component={BankerListLoanScreen} />
      <Stack.Screen name={ScreenNames.BANKER_LOAN_DETAIL_SCREEN} component={BankerLoanDetailScreen} />
      <Stack.Screen name={ScreenNames.MANAGE_INSURANCE_LIST} component={ManageInsuranceListScreen} />
      <Stack.Screen name={ScreenNames.MANAGE_INSURANCE_FILTER} component={ManageInsuranceFilerScreen} />
      <Stack.Screen name={ScreenNames.INSURANCE_REQUEST_CLAIM_SUCCESS_SCREEN} component={InsuranceRequestClaimSuccessScreen} />
      <Stack.Screen name={ScreenNames.MANAGE_INSURANCE_DETAIL_SCREEN} component={ManageInsuranceDetailScreen} />
      <Stack.Screen name={ScreenNames.CLAIM_INSURANCE} component={ClaimInsuranceDetailScreen} />
      <Stack.Screen name={ScreenNames.USER_PROFILE} component={UserProfile} />
      <Stack.Screen name={ScreenNames.INSURANCE_LIST_SCREEN} component={InsuranceList} />
      <Stack.Screen name={ScreenNames.SUCCESS_SCREEN} component={SuccessScreen} />
      <Stack.Screen name={ScreenNames.PROJECT_TAB} component={ProjectTab} />
    </Stack.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

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
