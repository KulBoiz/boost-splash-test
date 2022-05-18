import React from 'react';
import { View } from 'react-native';
import StepIndicator from "react-native-step-indicator"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  currentPosition: number
}

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:25,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 0,
  stepStrokeWidth: 0,
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}
const RenderStepAgent = React.memo((props: Props) => {
  const {currentPosition} = props
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={3}
      />
    </View>
  )
});

export default RenderStepAgent;

const styles = ScaledSheet.create({
    container: {
      flex:1,
      backgroundColor: color.palette.lightBlue,
      paddingVertical: '10@s'
    },
  imageContainer: {
    width: '20@s',
    height: '20@s',
    backgroundColor: color.palette.lightBlue
  },
  icon: {
      width: '20@s',
    height: '20@s'
  }
});
