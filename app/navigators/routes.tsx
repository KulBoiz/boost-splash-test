import {ScreenNames} from './screen-names';
import { LoginScreen, SplashScreen, WelcomeScreen } from "../screens"
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

export const AuthRoutes = [
	{
		name: ScreenNames.LOGIN,
		component: LoginScreen,
	},{
		name: ScreenNames.REGISTER,
		component: RegisterScreen,
	},{
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
];

export const AgentRoutes = [
	{
		name: ScreenNames.BECOME_SCREEN,
		component: BecomeAgent,
	},{
		name: ScreenNames.PHOTO_TUTORIAL,
		component: PhotoTutorial,
	},{
		name: ScreenNames.REGISTER_AGENT,
		component: RegisterAgent,
	},{
		name: ScreenNames.REGISTER_INFO,
		component: RegisterInfo,
	},{
		name: ScreenNames.CHECK_INFO,
		component: CheckInfo,
	},{
		name: ScreenNames.CAPTURE_ID,
		component: CaptureId,
	},{
		name: ScreenNames.SIGN_CONTRACT,
		component: SignContract,
	},
];
