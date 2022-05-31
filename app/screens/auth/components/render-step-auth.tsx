import React from 'react';
import { View } from 'react-native';
import StepIndicator from "react-native-step-indicator"
import { color } from "../../../theme"
import { images } from "../../../assets/images"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  currentPosition: number
}

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 1.5,
  currentStepStrokeWidth: 0,
  stepStrokeCurrentColor: 'transparent',
  stepStrokeFinishedColor: 'transparent',
  stepStrokeUnFinishedColor: 'transparent',
  separatorFinishedColor: color.palette.blue,
  separatorUnFinishedColor:color.palette.lightGray,
  stepIndicatorFinishedColor: 'transparent',
  stepIndicatorUnFinishedColor: 'transparent',
  stepIndicatorCurrentColor: 'transparent',
}
const getStepIndicatorIconConfig = ({ position, stepStatus }: {
  position: number;
  stepStatus: string;
}) => {
  const iconConfig = {
    source: images.shield,
    tintColor: stepStatus === 'finished' || stepStatus === 'current' || position === 0 ? color.palette.blue : color.palette.deepGray,
    style: styles.icon,
  };
  switch (position) {
    case 0: {
      iconConfig.source = images.phoneCalling;
      break;
    }
    case 1: {
      iconConfig.source = images.numberKeyboard;
      break;
    }
    case 2: {
      iconConfig.source = images.clipboard;
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

const renderStepIndicator = (params: any) => (
  <View style={styles.imageContainer}>
    <FastImage {...getStepIndicatorIconConfig(params)} />
  </View>
);
const RenderAuthStep = React.memo((props: Props) => {
  const {currentPosition} = props
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        stepCount={3}
        renderStepIndicator={renderStepIndicator}
      />
    </View>
  )
});

export default RenderAuthStep;

const styles = ScaledSheet.create({
    container: {
      backgroundColor: 'transparent',
      paddingVertical: '10@s',
      marginBottom: '50@s'
    },
  imageContainer: {
    width: '20@s',
    height: '20@s',
    backgroundColor: color.palette.white
  },
  icon: {
      width: '20@s',
    height: '20@s'
  }
});
