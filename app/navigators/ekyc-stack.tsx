import { ScreenNames } from "./screen-names"
import { EKYCRoutes } from "./routes"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export type EKYCStackParamList = {
  [ScreenNames.EKYC_SCREEN]: undefined;
  [ScreenNames.SYNC_ACCOUNT]: undefined;
  [ScreenNames.EKYC_ID]: {type?: 'front' | 'back', onConfirm(image: string): void};
  [ScreenNames.EKYC_PORTRAIT]: { onConfirm(image: string): void };
  [ScreenNames.UPDATE_IDENTITY_INFORMATION]: undefined;
  [ScreenNames.TRADE_REGISTRATION]: undefined;
}

const Stack = createNativeStackNavigator<EKYCStackParamList>()


export const EKYCStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.EKYC_SCREEN}
    >
      {
        EKYCRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}}  />
        ))
      }
    </Stack.Navigator>
  )
}
