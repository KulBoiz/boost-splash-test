import { ScreenNames } from "./screen-names"
import { CommissionRoutes, InvestRoutes } from "./routes"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export type InvestStackParamList = {
  [ScreenNames.MARKET_LIST]: undefined;
  [ScreenNames.MARKET_DETAIL]: { slug: string };
  [ScreenNames.BUY_BONDS]: undefined;
  [ScreenNames.PURCHASE_BONDS]: undefined;
}

const Stack = createNativeStackNavigator<InvestStackParamList>()


export const InvestStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.MARKET_LIST}
    >
      {
        InvestRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}}  />
        ))
      }
    </Stack.Navigator>
  )
}
