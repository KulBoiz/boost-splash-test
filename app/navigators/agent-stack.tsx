import { ScreenNames } from "./screen-names"
import { AgentRoutes } from "./routes"
import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

export type AgentStackParamList = {
  [ScreenNames.BECOME_SCREEN]: undefined;
  [ScreenNames.REGISTER_AGENT]: undefined;
  [ScreenNames.REGISTER_INFO]: undefined;
  [ScreenNames.PHOTO_TUTORIAL]: undefined;
  [ScreenNames.CHECK_INFO]: { frontImage: string, backImage: string };

}

const Stack = createNativeStackNavigator<AgentStackParamList>()


export const AgentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ScreenNames.BECOME_SCREEN}
    >
      {
        AgentRoutes.map(({name, component}) => (
          <Stack.Screen key={name} {...{name, component}}  />
        ))
      }
    </Stack.Navigator>
  )
}
