import { ScreenNames } from "./screen-names"
import { LoginScreen } from "../screens"
import OtpScreen from "../screens/auth/otp-screen"
import RegisterPhoneScreen from "../screens/auth/register-phone-screen"
import { RegisterScreen } from "../screens/auth/register-screen"
import ForgotPasswordScreen from "../screens/auth/forgot-password-screen"
import { ChangePassword } from "../screens/auth/change-password"
import BecomeAgent from "../screens/agent/become-agent"
import PhotoTutorial from "../screens/agent/photo-tutorial"
import RegisterAgent from "../screens/agent/register-agent"
import RegisterInfo from "../screens/agent/register-info"
import CheckInfo from "../screens/agent/check-info"
import CaptureId from "../screens/agent/capture-id"
import SignContract from "../screens/agent/sign-contract"
import ViewContract from "../screens/agent/view-contract"
import CommissionScreen from "../screens/commission"
import CommissionDetail from "../screens/commission/commission-detail"
import CommissionTab from "../screens/commission/commission-tab"
import BondsList from "../screens/invest/market/bonds/bonds-list"
import BondsDetail from "../screens/invest/market/bonds/bonds-detail"
import MarketPurchase from "../screens/invest/market/market-purchase"
import BuyFund from "../screens/invest/market/buy-fund"
import InvestSuccess from "../screens/invest/invest-success"
import EKYC from "../screens/invest/ekyc/ekyc"
import EKYCId from "../screens/invest/ekyc/ekyc-id"
import EKYCPortrait from "../screens/invest/ekyc/ekyc-portrait"
import UpdateIdentityInformation from "../screens/invest/ekyc/update-identity-information"
import SyncAccount from "../screens/invest/ekyc/sync-account"
import ConfirmEkyc from "../screens/invest/ekyc/confirm-ekyc"
import TradeRegistration from "../screens/invest/ekyc/trade-registration"

export const AuthRoutes = [
  {
    name: ScreenNames.LOGIN,
    component: LoginScreen,
  },
  {
    name: ScreenNames.REGISTER,
    component: RegisterScreen,
  },
  {
    name: ScreenNames.REGISTER_PHONE,
    component: RegisterPhoneScreen,
  },
  {
    name: ScreenNames.OTP,
    component: OtpScreen,
  },
  {
    name: ScreenNames.FORGOT_PASSWORD,
    component: ForgotPasswordScreen,
  },
  {
    name: ScreenNames.CHANGE_PASSWORD,
    component: ChangePassword,
  },
]

export const CommissionRoutes = [
  {
    name: ScreenNames.COMMISSION_SCREEN,
    component: CommissionScreen,
  }, {
    name: ScreenNames.COMMISSION_LIST,
    component: CommissionTab,
  }, {
    name: ScreenNames.COMMISSION_DETAIL,
    component: CommissionDetail,
  },
]

export const InvestRoutes = [
  {
    name: ScreenNames.INVEST_TAB,
    component: BondsList,
  }, {
    name: ScreenNames.BONDS_DETAIL,
    component: BondsDetail,
  }, {
    name: ScreenNames.PURCHASE_BONDS,
    component: MarketPurchase,
  }, {
    name: ScreenNames.BUY_BONDS,
    component: BuyFund,
  }, {
    name: ScreenNames.INVEST_SUCCESS,
    component: InvestSuccess,
  },
]
export const EKYCRoutes = [
  {
    name: ScreenNames.EKYC_ID,
    component: EKYCId,
  },
  {
    name: ScreenNames.EKYC_SCREEN,
    component: EKYC,
  },
  {
    name: ScreenNames.EKYC_PORTRAIT,
    component: EKYCPortrait,
  },
  {
    name: ScreenNames.UPDATE_IDENTITY_INFORMATION,
    component: UpdateIdentityInformation,
  },
  // {
  //   name: ScreenNames.TRADE_REGISTRATION,
  //   component: TradeRegistration,
  // },
  {
    name: ScreenNames.CONFIRM_EKYC,
    component: ConfirmEkyc,
  },
]

export const AgentRoutes = [
  {
    name: ScreenNames.BECOME_SCREEN,
    component: BecomeAgent,
  }, {
    name: ScreenNames.PHOTO_TUTORIAL,
    component: PhotoTutorial,
  }, {
    name: ScreenNames.REGISTER_AGENT,
    component: RegisterAgent,
  }, {
    name: ScreenNames.REGISTER_INFO,
    component: RegisterInfo,
  }, {
    name: ScreenNames.CHECK_INFO,
    component: CheckInfo,
  }, {
    name: ScreenNames.CAPTURE_ID,
    component: CaptureId,
  }, {
    name: ScreenNames.SIGN_CONTRACT,
    component: SignContract,
  }, {
    name: ScreenNames.VIEW_CONTRACT,
    component: ViewContract,
  },
]
