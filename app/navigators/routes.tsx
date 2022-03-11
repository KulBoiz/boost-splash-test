import {ScreenNames} from './screen-names';
import { LoginScreen, SplashScreen, WelcomeScreen } from "../screens"

export const AuthRoutes = [
	{
		name: ScreenNames.WELCOME,
		component: WelcomeScreen,
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
