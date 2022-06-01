import * as React from "react"
import { ActivityIndicator } from "react-native"

export function LoadingComponent(props) {
  const { size = "large", color = "blue", styleCustom} = props
  return (
    <ActivityIndicator size={size} color={color} style={[{ marginTop: 20 }, styleCustom]} />
  )
}
