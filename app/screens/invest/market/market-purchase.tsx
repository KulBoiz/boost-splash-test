import React, { useCallback } from "react"
import { Alert, DeviceEventEmitter, ScrollView, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { MARGIN_BOTTOM_4 } from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"
import { COMMON_ERROR, numberWithCommas, OTP_TIME } from "../../../constants/variable"
import PurchaseInfo from "./components/purchase-info"
import PurchaseTab from "./components/purchase-tab"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { useStores } from "../../../models"
import { mappingLabelTypeOfFund } from "./constants"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../../navigators/params-list"
import { filter } from "lodash"

interface Props {
}

interface ItemProps {
  title: string
  content: string
  textAlign?: "left" | "right"
}

const Item = React.memo(({ title, content, textAlign = "left" }: ItemProps) => {
  return (
    <View>
      <AppText value={title} fontSize={ms(11)} color={color.text} style={MARGIN_BOTTOM_4} textAlign={textAlign} />
      <AppText value={content} fontSize={ms(11)} color={color.text} fontFamily={fontFamily.bold}
               textAlign={textAlign} />
    </View>
  )
})

const MarketPurchase = React.memo((props: Props) => {
  const {params: {param}} = useRoute<RouteProp<NavigatorParamList, ScreenNames.PURCHASE_FUND>>()
  const { investStore } = useStores()
  const { nav, estimatedQuantity, bondsDetail } = investStore
  const data = filter(bondsDetail?.productDetails, {id: param?.productProgramId })?.[0]

  const onSubmit = useCallback((otpCode) => {
    investStore.verifyOtpBuyFund(otpCode)
      .then(res => {
        if (res?.error || res?.kind === 'server') {
          DeviceEventEmitter.emit("errorOtp", {error: res?.error?.message ?? COMMON_ERROR})
          return
        }
        navigate(ScreenNames.INVEST_SUCCESS)
      })
  }, [])

  const onResend = useCallback(() => {
    investStore.resendOtpBuyFund()
      .then(res => {
        if (res?.error) {
          Alert.alert(res?.error?.message)
          return
        }
        DeviceEventEmitter.emit("resend")
      })
  }, [])

  const handlePurchase = useCallback(() => {
    // navigate(ScreenNames.INVEST_SUCCESS)


    investStore.sendOtpBuyFund().then(res => {
      if (res?.error || res?.includes("502")) {
        Alert.alert(COMMON_ERROR)
        return
      }
      navigate(ScreenNames.INVEST_OTP, { onResend, onSubmit, otpTime: OTP_TIME.BUY_FUND })
    })
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thanh toán lệnh mua"} isBlue />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.infoContainer}>
          <Item title={(bondsDetail?.code)}
                content={mappingLabelTypeOfFund(bondsDetail?.info?.typeOfFund)} />
          <Item title={"Giá gần nhất"} content={`${numberWithCommas(nav)} vnđ`} textAlign={"right"} />
        </View>
        <PurchaseInfo transactionInfo={bondsDetail} estimatedQuantity={estimatedQuantity} param={param} data={data}/>
        <PurchaseTab transactionInfo={data} param={param}/>
        <View style={styles.wrapBtn}>
          <AppButton title={"Xác nhận thanh toán"} onPress={handlePurchase} />
        </View>
      </ScrollView>
    </View>
  )
})

export default MarketPurchase

const styles = ScaledSheet.create({
  container: {
    flex: 1, backgroundColor: color.background,
  },
  infoContainer: {
    backgroundColor: color.palette.navi,
    flexDirection: "row",
    paddingVertical: "20@s",
    marginHorizontal: "16@s",
    paddingHorizontal: "16@s",
    borderRadius: "4@s",
    justifyContent: "space-between",
    marginBottom: "16@s",
  },
  body: {
    paddingVertical: "16@s",
  },
  wrapBtn: {
    paddingHorizontal: "16@s",
    paddingVertical: "24@s",
  },
})
