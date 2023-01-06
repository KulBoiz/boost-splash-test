import React from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { height, width } from "../../constants/variable"
import { LunarNewYearSvg } from "../../assets/svgs"

interface Props {
}

const LunarNewYear = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <LunarNewYearSvg width={width} height={height} />
    </View>
  )
})

export default LunarNewYear

const styles = ScaledSheet.create({
  container: {
    flex:1
  },
})
