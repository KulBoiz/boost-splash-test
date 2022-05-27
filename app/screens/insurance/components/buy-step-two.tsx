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
import moment from "moment";


interface Props {
  stepThree(): void
  getValues: any
  // getValuesCustomer: any
  insuranceType: any
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
    const {
      fullName,
      phone,
      email,
      sex,
      fullNameCustomer,
      emailCustomer,
      sexCustomer,
      phoneCustomer
    } = getValues
    const data = {
      agreement: true,
      productId: productDetail?.id,
      staffInfo: { email, fullName, tel: phone, gender: sex },
      customerInfo: { email: emailCustomer, fullName: fullNameCustomer, tel: phoneCustomer, gender: sexCustomer },
      type: 'insurances',
      subType: 'fina',
      metaData: {
        package: insurance.price,
        effectiveTime: moment(),
        expirationTime: moment().add(1, 'y')
      }
    }

    const desc = `${insurance.name}-${insurance.price}`

    paymentStore.post(data).then((res) => {
      if (res?.data?.paymentInfo?.url) {
        setModal(true)
        setLink(res?.data?.paymentInfo?.url)
      } else {
        Alert.alert("Thanh toán đanh gặp vấn đề")
      }
    })
  }

  return (
    <View style={styles.container}>
      {/* <Benefit /> */}
      <InsuranceInfo insurance={insurance} productDetail={productDetail} />
      <CollapsibleInfoCustomer infoCustomer={getValues} infoBuyInsurance={getValues} />
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
