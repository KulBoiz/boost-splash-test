import React, { useState } from "react"
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import Benefit from "./benefit"
import CalculateMoney from "./calculate-money"
import InsuranceInfo from "./insurance-info"
import CollapsibleInfoCustomer from "./collapsible-info-customer"
import PaymentMethod from "./payment-method"
import PinModal from "./pin-modal"


interface Props{
  stepThree(): void
}

const BuyStepTwo = React.memo(({ stepThree }: Props) => {
  const [modal,setModal] = useState(false)

  return (
    <View style={styles.container}>
      <Benefit />
      <InsuranceInfo />
      <CollapsibleInfoCustomer />
      <PaymentMethod  />
      <CalculateMoney onPress={()=> setModal(true)}/>
      <PinModal visible={modal} closeModal={()=> setModal(false)} stepThree={stepThree}/>
    </View>
  )
});

export default BuyStepTwo;

const styles = ScaledSheet.create({
  container: {},


});
