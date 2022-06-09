import * as React from "react"
import LottieView  from "lottie-react-native"
import { animations } from "../../assets/animations"
import { View, ViewStyle } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"

interface Props {
  style?: ViewStyle | any
}
export function LoadingComponent(props: Props) {
  const {style} = props

  return (
    <View style={styles.container}>
      <LottieView
        source={animations.loading}
        autoPlay
        style={style}
        loop
      />
    </View>

  )
}

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: color.background
  }
})
