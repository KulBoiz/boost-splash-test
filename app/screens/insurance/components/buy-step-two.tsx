import moment from "moment";
import React, { useState } from "react";
import { Alert, View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import FullScreenModal from "../../../components/app-modal/full-screen-modal";
import { useStores } from "../../../models";
import CalculateMoney from "./calculate-money";
import CollapsibleInfoCustomer from "./collapsible-info-customer";
import CollapsibleInfoStaff from "./collapsible-info-staff";
import InsuranceInfo from "./insurance-info";
import PaymentMethod from "./payment-method";


interface Props {
  stepThree: any
  productDetail: any
  transaction: any
}

const BuyStepTwo = React.memo(({ stepThree, transaction, productDetail }: Props) => {
  // @ts-ignore
  const { paymentStore, productStore, authStoreModel, insuranceStore } = useStores()
  const [modal, setModal] = useState(false)
  const [link, setLink] = useState('')
  const [infoPayment, setInfoPayment] = useState<any>({})
  const [linkPayment, setLinkPayment] = useState('')


  const openPayment = () => {
    if (linkPayment) {
      setModal(true)
      return
    }

    const { fullName, email, sex, tel, dateOfBirth, idNumber, gender, customers} = transaction
    const data = {
      agreement: true,
      productId: productDetail?.id,
      staffInfo: { fullName, email, sex, tel, dateOfBirth, idNumber, gender },
      customers: customers,
      type: 'insurances',
      subType: productDetail?.name,
      amount: transaction?.amount,
    }

    insuranceStore.buyInsurance(data).then((res) => {
      if (res?.data?.paymentInfo?.url) {
        setLinkPayment(res?.data?.paymentInfo?.url)
        setModal(true)
        setLink(res?.data?.paymentInfo?.url)
        setInfoPayment(res?.data)
      } else {
        Alert.alert("Thanh toán đang gặp vấn đề")
      }
    })
  }

  return (
    <View style={styles.container}>
      {/* <Benefit /> */}
      <InsuranceInfo
        insurance={transaction}
        productDetail={productDetail}
      />

      <CollapsibleInfoStaff infoStaff={transaction?.staffInfo} />
      
      <CollapsibleInfoCustomer infoCustomer={transaction?.customers} />

      <PaymentMethod />

      <CalculateMoney
        insurance={transaction}
        productDetail={productDetail}
        onPress={() => {
          openPayment()
        }}
      />

      <FullScreenModal
        visible={modal}
        closeModal={() => {
          productStore.getTransactionInsurance(productDetail?.id).then((res) => {
            const transaction = res?.data?.data?.find(item => item?.id === infoPayment?.id);

            stepThree(transaction)
            setModal(false)
          }).catch(() => {
            setModal(false)
          })
        }}
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
