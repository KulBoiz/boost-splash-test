import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { StackActions, useNavigation } from "@react-navigation/native"
import i18n from "i18n-js"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { ScrollView, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { ScaledSheet } from "react-native-size-matters"
import WebView from "react-native-webview"
import * as Yup from "yup"
import ShareComponent from "../../components/share"
import { useStores } from "../../models/root-store/root-store-context"
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"
import BuyStepOnePackage from "./components/buy-step-one"
import BuyStepOneForm from "./components/buy-step-one-form"
import BuyStepOneQuestion from "./components/buy-step-one-question"
// import BuyStepOne from "./components/buy-step-one"
import BuyStepThree from "./components/buy-step-three"
import BuyStepTwo from "./components/buy-step-two"

interface Props {}

const BuyInsurance = observer((props: Props) => {
  // @ts-ignore
  const { productStore } = useStores()
  const { productDetail, questionGroups } = productStore

  const ref = useRef(null)
  const navigation = useNavigation()
  const [currentPosition, setCurrentPosition] = useState(0.2)
  const [insuranceType, setInsuranceType] = useState(0)
  // const [checkboxState, setCheckboxState] = useState<boolean>(true)
  const [transaction, setTransaction] = useState()

  const stepOneQuestion = () => {
    // // @ts-ignore
    // ref.current.scrollTo({ x: 0, animated: true })
    setCurrentPosition(0.1)
  }

  const stepOneForm = (data) => {
    // @ts-ignore
    // ref.current.scrollTo({ x: 0, animated: true })
    setTransaction(data)
    
    setCurrentPosition(1)
  }

  const stepTwo = () => {
    // @ts-ignore
    // ref.current.scrollTo({ x: 0, animated: true })
    setCurrentPosition(1)
  }

  const stepThree = (transaction) => {
    setTransaction(transaction)

    setCurrentPosition(2)
  }

  const buyRecords = () => {
    navigation.dispatch(StackActions.push(ScreenNames.INSURANCE_SCREEN, { id: 1 }))
  }

  if (productDetail && productDetail?.source) {
    return (
      <View style={{ position: "relative" }}>
        <View style={{ height: "100%" }}>
          <WebView source={{ uri: productDetail?.info?.productUrlOriginal }} />
        </View>
        <ShareComponent url={productDetail?.info?.productUrlOriginal} isIcon={true} />
      </View>
    )
  }

  const renderScreen = () => {
    switch (currentPosition) {
      // case 0:
      //   return (
      //     <BuyStepOnePackage
      //       {...{
      //         control,
      //         errors,
      //         onPress: stepOneQuestion,
      //         insuranceType,
      //         setInsuranceType,
      //         productDetail,
      //         questionGroups,
      //         setValue,
      //       }}
      //       getValues={getValues()}
      //     />
      //   )
      // case 0.1:
      //   return (
      //     <BuyStepOneQuestion
      //       {...{
      //         control,
      //         errors,
      //         onPress: stepOneForm,
      //         insuranceType,
      //         setInsuranceType,
      //         productDetail,
      //         questionGroups,
      //         setValue,
      //       }}
      //       getValues={getValues()}
      //     />
      //   )
      case 0.2:
        return (
          <BuyStepOneForm
            {...{
              onPress: stepOneForm,
              insuranceType,
              setInsuranceType,
              productDetail,
              questionGroups,
            }}
          />
        )

      case 1:
        return (
          <BuyStepTwo
            {...{
              stepThree,
              productDetail,
              transaction
            }}
          />
        )
      case 2:
        return (
          <BuyStepThree
            {...{ onPress: buyRecords, productDetail, insuranceType, transaction }}
            getValues={{}}
          />
        )
    }
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.container} ref={ref}>
      {!!productDetail?.id && renderScreen()}
    </KeyboardAwareScrollView>
  )
})

export default BuyInsurance

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },
})
