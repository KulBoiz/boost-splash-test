import { ScreenNames } from "./screen-names"
import { CommissionRoutes } from "./routes"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export type CommissionStackParamList = {
  [ScreenNames.COMMISSION_SCREEN]: undefined;
  [ScreenNames.COMMISSION_LIST]: undefined;
  [ScreenNames.COMMISSION_DETAIL]: undefined;
}

const Stack = createNativeStackNavigator<CommissionStackParamList>()


export const CommissionStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.COMMISSION_SCREEN}
    >
      {
        CommissionRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}}  />
        ))
      }
    </Stack.Navigator>
  )
}
