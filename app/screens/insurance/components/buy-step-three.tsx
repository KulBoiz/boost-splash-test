import React  from "react"
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import BuySuccess from "./buy-success"


interface Props{
  onPress(): void,
  productDetail,
  insuranceType,
  getValues,
  transaction
}

const BuyStepTwo = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <BuySuccess {...props}/>
    </View>
  )
});

export default BuyStepTwo;

const styles = ScaledSheet.create({
  container: {flex:1},


});
