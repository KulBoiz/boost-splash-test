import {ScreenNames} from './screen-names';
import { LoginScreen, SplashScreen, WelcomeScreen } from "../screens"
import OtpScreen from "../screens/auth/otp-screen"
import FifthScreen from "../screens/welcome/fifth-screen"
import RegisterPhoneScreen from "../screens/auth/register-phone-screen"
import { RegisterScreen } from "../screens/auth/register-screen"
import ForgotPasswordScreen from "../screens/auth/forgot-password-screen"
import { ChangePassword } from "../screens/auth/change-password"

export const AuthRoutes = [
	{
		name: ScreenNames.WELCOME,
		component: WelcomeScreen,
	},
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
		name: ScreenNames.FIFTH_SCREEN,
		component: FifthScreen,
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

export const AppRoutes = [
	{
		name: ScreenNames.SPLASH,
		component: SplashScreen,
	},
];
