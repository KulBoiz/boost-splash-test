import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import Benefit from "./benefit"

interface Props{}

const BuyStepOne = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <Benefit />

    </View>
  )
});

export default BuyStepOne;

const styles = ScaledSheet.create({
  container: {},


});
