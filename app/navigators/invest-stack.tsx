import { ScreenNames } from "./screen-names"
import { InvestRoutes } from "./routes"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import { useStores } from "../models"

export type InvestStackParamList = {
  [ScreenNames.MARKET_LIST]: undefined;
  [ScreenNames.MARKET_DETAIL]: { slug: string };
  [ScreenNames.BUY_BONDS]: undefined;
  [ScreenNames.PURCHASE_BONDS]: undefined;
}

const Stack = createNativeStackNavigator<InvestStackParamList>()


export const InvestStack = observer(() => {
  const {investStore} = useStores()
  const {investStack} = investStore

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={investStack.isList ? ScreenNames.MARKET_LIST : ScreenNames.MARKET_DETAIL}
    >
      {
        InvestRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}}  />
        ))
      }
    </Stack.Navigator>
  )
})
