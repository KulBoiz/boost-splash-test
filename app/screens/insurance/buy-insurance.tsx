import { StackActions, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import WebView from "react-native-webview"
import ShareComponent from "../../components/share"
import { useStores } from "../../models/root-store/root-store-context"
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"
import BuyStepOneForm from "./components/buy-step-one-form"
import BuyStepThree from "./components/buy-step-three"
import BuyStepTwo from "./components/buy-step-two"

interface Props {
  index: number
}

const BuyInsurance = observer(({ index }: Props) => {
  const { productStore } = useStores()
  const { productDetail, questionGroups } = productStore
  const ref = useRef(null)
  const navigation = useNavigation()
  const [currentPosition, setCurrentPosition] = useState(0)
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

  // if (!productDetail?.info?.productUrlOriginal && index === 1) {
  //   return <>
  //     <ConfirmModal
  //       visible={true}
  //       closeModal={() => {
  //         navigate(ScreenNames.HOME)
  //       }}
  //       onPress={() => {
  //         navigate(ScreenNames.HOME)
  //       }}
  //       content={'Sản phẩm hiện đang chưa mở bán,  vui lòng quay lại sau.'}
  //       hideCancel
  //       submitTitle={'Trờ về'}
  //     />
  //   </>
  // }

  if (productDetail && productDetail?.source && !productDetail?.isFina) {
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
      case 0:
        return (
          <BuyStepOneForm
            {...{
              index: index,
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
      default: return (
        <BuyStepOneForm
          {...{
            index: index,
            onPress: stepOneForm,
            productDetail,
            questionGroups,
          }}
        />
      )
    }
  }

  return (
    <View style={styles.container} ref={ref}>
      {!!productDetail?.id && renderScreen()}
    </View>
  )
})

export default BuyInsurance

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },
})
