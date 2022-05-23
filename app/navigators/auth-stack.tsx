import { ScreenNames } from "./screen-names"
import { AuthRoutes } from "./routes"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export type AuthStackParamList = {
  [ScreenNames.LOGIN]: undefined;
  [ScreenNames.OTP]: { phoneNumber: string, isRegister: boolean };
  [ScreenNames.REGISTER]: undefined;
  [ScreenNames.REGISTER_PHONE]: undefined;
  [ScreenNames.FORGOT_PASSWORD]: undefined;
  [ScreenNames.CHANGE_PASSWORD]: undefined;
}

const Stack = createNativeStackNavigator<AuthStackParamList>()


export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.LOGIN}
    >
      {
        AuthRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}}  />
        ))
      }
    </Stack.Navigator>
  )
}
