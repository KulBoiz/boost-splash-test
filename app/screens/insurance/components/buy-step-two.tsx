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
  getValues: any
  insuranceType: number
  productDetail: any
  questionGroups: any
}

const BuyStepTwo = React.memo(({ stepThree, getValues, insuranceType, productDetail }: Props) => {
  const [modal,setModal] = useState(false)

  const insurance = productDetail?.packages?.[insuranceType]
  return (
    <View style={styles.container}>
      {/* <Benefit /> */}
      <InsuranceInfo insurance={insurance} productDetail={productDetail}/>
      <CollapsibleInfoCustomer infoCustomer={getValues}/>
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
