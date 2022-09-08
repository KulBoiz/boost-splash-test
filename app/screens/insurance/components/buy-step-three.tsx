import React  from "react"
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import BuySuccess from "./buy-success"


interface Props{
  onPress(): void,
  productDetail,
  transaction,
  respondTransaction,
}

const BuyStepThree = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <BuySuccess {...props}/>
    </View>
  )
});

export default BuyStepThree;

const styles = ScaledSheet.create({
  container: {flex:1},


});
