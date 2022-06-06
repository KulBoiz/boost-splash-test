import { ScreenNames } from "./screen-names"
import { AgentRoutes } from "./routes"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ROLE } from "../models/auth-store"
import { useStores } from "../models"

export type AgentStackParamList = {
  [ScreenNames.BECOME_SCREEN]: undefined;
  [ScreenNames.REGISTER_AGENT]: undefined;
  [ScreenNames.REGISTER_INFO]: undefined;
  [ScreenNames.PHOTO_TUTORIAL]: undefined;
  [ScreenNames.CHECK_INFO]: { frontImage: string, backImage: string };
  [ScreenNames.VIEW_CONTRACT]: undefined;
}

const Stack = createNativeStackNavigator<AgentStackParamList>()


export const AgentStack = () => {
  const { authStoreModel } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={authStoreModel?.role === ROLE.CTV  ? ScreenNames.VIEW_CONTRACT : ScreenNames.BECOME_SCREEN}
    >
      {
        AgentRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}}  />
        ))
      }
    </Stack.Navigator>
  )
}
