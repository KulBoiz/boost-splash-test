import React, { useCallback } from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import FundInfo from "./components/fund-info"
import MarketTariff from "./components/market-tariff"
import MarketBuyForm from "./components/market-buy-form"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props {
}

const MarketBuy = React.memo((props: Props) => {
  const validationSchema = Yup.object().shape({
    program: Yup.string().required(i18n.t("errors.requireAddress")),
    amount: Yup.string().required(i18n.t("errors.requirePhone")),
    estimatedQuantity: Yup.string().required("Chọn địa ngân hàng"),
    purchaseFee: Yup.string().required("Nhập số tài khoản ngân hàng"),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const handleBuy = useCallback(()=> {
    navigate(ScreenNames.PURCHASE_BONDS)
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Đặt lệnh mua"} isBlue />
      <ScrollView contentContainerStyle={styles.body}>
        <FundInfo />
        <MarketBuyForm  {...{ control, errors: { ...errors }, setValue, watch, clearErrors }} />
        <MarketTariff />
        <View style={styles.wrapBtn}>
          <AppButton title={'Đặt lệnh mua'} onPress={handleBuy}/>
        </View>
      </ScrollView>
    </View>
  )
})

export default MarketBuy

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex:1
  },
  body: {
    padding: "16@s",
  },
  wrapBtn:{
    paddingTop: '4@s',
    paddingBottom: '16@s'
  }
})
