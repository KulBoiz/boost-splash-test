import moment from "moment";
import React, { useState } from "react";
import { Alert, View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import FullScreenModal from "../../../components/app-modal/full-screen-modal";
import { useStores } from "../../../models";
import CalculateMoney from "./calculate-money";
import CollapsibleInfoCustomer from "./collapsible-info-customer";
import InsuranceInfo from "./insurance-info";
import PaymentMethod from "./payment-method";


interface Props {
  stepThree: any
  getValues: any
  // getValuesCustomer: any
  insuranceType: any
  productDetail: any
  questionGroups: any
}

const BuyStepTwo = React.memo(({ stepThree, getValues, insuranceType, productDetail }: Props) => {
  // @ts-ignore
  const { paymentStore, productStore, authStoreModel } = useStores()
  const [modal, setModal] = useState(false)
  const [link, setLink] = useState('')
  const [infoPayment, setInfoPayment] = useState<any>({})
  const [linkPayment, setLinkPayment] = useState('')

  const insurance = productDetail?.packages?.[insuranceType]

  const openPayment = () => {
    const user = authStoreModel.user
    if (linkPayment) {
      setModal(true)
      return
    }

    const {
      // fullName,
      // phone,
      // email,
      // sex,
      // citizenIdentification,
      // dateOfBirth,
      // contactAddress,
      //
      fullNameCustomer,
      emailCustomer,
      sexCustomer,
      phoneCustomer,
      citizenIdentificationCustomer,
      dateOfBirthCustomer,
      contactAddressCustomer
    } = getValues
    const data = {
      agreement: true,
      productId: productDetail?.id,
      // staffInfo: {
      //   email, fullName, tel: phone, gender: sex,
      //   idNumber: citizenIdentification, yearOfBirth: dateOfBirth, address: contactAddress
      // },
      staffInfo: {
        email: user?.emails?.[0]?.email,
        fullName: user?.fullName,
        tel: user?.tels?.[0]?.tel,
        gender: user?.gender,
      },
      customerInfo: {
        email: emailCustomer, fullName: fullNameCustomer, tel: phoneCustomer, gender: sexCustomer,
        idNumber: citizenIdentificationCustomer, yearOfBirth: dateOfBirthCustomer, address: contactAddressCustomer
      },
      type: 'insurances',
      subType: 'fina',
      metaData: {
        package: insurance.price,
        effectiveTime: moment(),
        expirationTime: moment().add(1, 'y')
      }
    }

    paymentStore.post(data).then((res) => {
      if (res?.data?.paymentInfo?.url) {
        setLinkPayment(res?.data?.paymentInfo?.url)
        setModal(true)
        setLink(res?.data?.paymentInfo?.url)
        setInfoPayment(res?.data)
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
        getValues={getValues}
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
