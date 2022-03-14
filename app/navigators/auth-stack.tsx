import { ScreenNames } from "./screen-names"
import { AuthRoutes } from "./routes"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export type AuthStackParamList = {
  [ScreenNames.WELCOME]: undefined;
  [ScreenNames.LOGIN]: undefined;
  [ScreenNames.FIFTH_SCREEN]: undefined;
  [ScreenNames.OTP]: { phoneNumber: string };
  [ScreenNames.REGISTER]: undefined;
  [ScreenNames.REGISTER_PHONE]: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>()


export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.WELCOME}
    >
      {
        AuthRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}} />
        ))
      }
    </Stack.Navigator>
  )
}
