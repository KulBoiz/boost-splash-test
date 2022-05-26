import React from "react"
import { View, ViewStyle } from "react-native"
import StepIndicator from "react-native-step-indicator"
import { color } from "../../../theme"
import { s, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"

interface Props {
  currentPosition: number
  style?: ViewStyle | any
}

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 25,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 0,
  stepStrokeWidth: 0,
  separatorFinishedColor: color.palette.blue,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: color.palette.blue,
  stepIndicatorUnFinishedColor: color.palette.BABABA,
  stepIndicatorCurrentColor: color.palette.blue,
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: color.palette.white,
  stepIndicatorLabelFinishedColor: color.palette.white,
  stepIndicatorLabelUnFinishedColor: color.palette.white,
  labelColor: color.palette.BABABA,
  labelSize: 13,
  currentStepLabelColor: color.palette.lightBlack,
}
const RenderStepAgent = React.memo((props: Props) => {
  const { currentPosition, style } = props
  return (
    <View style={[styles.container, style]}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={3}
        labels={["Thông tin\ncá nhân", "Kiểm tra\nthông tin", "Hợp đồng\nCTV"]}
        renderLabel={({ position, stepStatus, label }) => (
          <AppText
            style={styles.label}
            fontSize={s(10)}
            value={label}
            color={position <= currentPosition ? color.palette.lightBlack : color.palette.BABABA}
          />
        )}
      />
    </View>
  )
})

export default RenderStepAgent

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.palette.lightBlue,
    paddingVertical: "10@s",
  },
  imageContainer: {
    width: "20@s",
    height: "20@s",
    backgroundColor: color.palette.lightBlue,
  },
  icon: {
    width: "20@s",
    height: "20@s",
  },
  label: {
    textAlign: "center",
  },
})
