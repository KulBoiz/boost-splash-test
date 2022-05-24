import React, { useState } from "react"
import { Alert, View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import Benefit from "./benefit"
import CalculateMoney from "./calculate-money"
import InsuranceInfo from "./insurance-info"
import CollapsibleInfoCustomer from "./collapsible-info-customer"
import PaymentMethod from "./payment-method"
import PinModal from "./pin-modal"
import { useStores } from "../../../models";
import FullScreenModal from "../../../components/app-modal/full-screen-modal";
import { AppText } from "../../../components/app-text/AppText";


interface Props {
  stepThree(): void
  getValues: any
  insuranceType: number
  productDetail: any
  questionGroups: any
}

const BuyStepTwo = React.memo(({ stepThree, getValues, insuranceType, productDetail }: Props) => {
  // @ts-ignore
  const { paymentStore } = useStores()
  const [modal, setModal] = useState(false)
  const [link, setLink] = useState('')

  const insurance = productDetail?.packages?.[insuranceType]

  const openPayment = () => {

    const desc = `${insurance.name}-${insurance.price}`
    paymentStore.post({
      "amount": insurance.price,
      "desc": desc
    }).then((res) => {
      if (res?.data?.info?.link) {
        setModal(true)
        setLink(res?.data?.info?.link)
      } else {
        Alert.alert("Thanh toán đanh gặp vấn đề")
      }
    })
  }

  return (
    <View style={styles.container}>
      {/* <Benefit /> */}
      <InsuranceInfo insurance={insurance} productDetail={productDetail} />
      <CollapsibleInfoCustomer infoCustomer={getValues} />
      <PaymentMethod />

      <CalculateMoney
        insurance={insurance}
        onPress={() => {
          openPayment()
        }}
      />
      
      <FullScreenModal
        visible={modal}
        closeModal={() => { setModal(false) }}
        url={link}
        animationType="slideVertical"
      />
      {/* <PinModal visible={modal} closeModal={()=> setModal(false)} stepThree={stepThree}/> */}
    </View>
  )
});

export default BuyStepTwo;

const styles = ScaledSheet.create({
  container: {},


});
