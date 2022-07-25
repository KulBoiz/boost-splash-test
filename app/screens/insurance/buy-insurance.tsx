import { StackActions, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { ScaledSheet } from "react-native-size-matters"
import WebView from "react-native-webview"
import ShareComponent from "../../components/share"
import { useStores } from "../../models/root-store/root-store-context"
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"
import BuyStepOneForm from "./components/buy-step-one-form"
// import BuyStepOne from "./components/buy-step-one"
import BuyStepThree from "./components/buy-step-three"
import BuyStepTwo from "./components/buy-step-two"

interface Props { }

const BuyInsurance = observer((props: Props) => {
  // @ts-ignore
  const { productStore } = useStores()
  const { productDetail, questionGroups } = productStore

  const ref = useRef(null)
  const navigation = useNavigation()
  const [currentPosition, setCurrentPosition] = useState(0.2)
  const [transaction, setTransaction] = useState()
  const [respondTransaction, setRespondTransaction] = useState()

  const stepOneForm = (data) => {
    setTransaction(data)
    setCurrentPosition(1)
  }

  const stepThree = (res) => {
    setRespondTransaction(res)
    setCurrentPosition(2)
  }

  const nextToScreenBuyRecords = () => {
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
      case 0.2:
        return (
          <BuyStepOneForm
            {...{
              onPress: stepOneForm,
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
            {...{
              onPress: nextToScreenBuyRecords,
              productDetail,
              transaction,
              respondTransaction
            }}
          />
        )
    }
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled"  contentContainerStyle={{flexGrow: 1}} style={styles.container} ref={ref}>
      {!!productDetail?.id && renderScreen()}
    </KeyboardAwareScrollView>
  )
})

export default BuyInsurance

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.palette.white,
  },
})
