import React  from "react"
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import BuySuccess from "./buy-success"


interface Props{
  onPress(): void
}

const BuyStepTwo = React.memo(({ onPress }: Props) => {
  return (
    <View style={styles.container}>
      <BuySuccess {...{onPress}}/>
    </View>
  )
});

export default BuyStepTwo;

const styles = ScaledSheet.create({
  container: {flex:1},


});
