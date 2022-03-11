import {ScreenNames} from './screen-names';
import { LoginScreen, SplashScreen, WelcomeScreen } from "../screens"
import OtpScreen from "../screens/auth/otp-screen"

export const AuthRoutes = [
	// {
	// 	name: ScreenNames.WELCOME,
	// 	component: WelcomeScreen,
	// },
	{
		name: ScreenNames.OTP,
		component: OtpScreen,
	},
	// {
	// 	name: ScreenNames.LOGIN,
	// 	component: LoginScreen,
	// },
];

export const AppRoutes = [
	{
		name: ScreenNames.SPLASH,
		component: SplashScreen,
	},
];
