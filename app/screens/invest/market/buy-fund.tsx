import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Alert, DeviceEventEmitter, ScrollView, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import FundInfo from "./fund/components/fund-info"
import FundTariff from "./fund/components/fund-tariff"
import MarketBuyForm from "./components/market-buy-form"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import EmptyList from "../../../components/empty-list"
import { MARGIN_TOP_24 } from "../../../styles/common-style"
import { filter, get } from "lodash"
import { COMMON_ERROR, numberWithCommas, OTP_TIME } from "../../../constants/variable"

interface Props {
}

const BuyFund = observer((props: Props) => {
  const { investStore } = useStores()
  const { bondsDetail } = investStore
  const [navs, setNavs] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const currentNav = get(navs[0], "nav", "")

  const validationSchema = Yup.object().shape({
    program: Yup.string().required("Chọn chương trình"),
    amount: Yup.string().required("Nhập số tiền đầu tư"),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    watch,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  const onSubmit = useCallback((otpCode)=> {
    investStore.verifyOtpBuyFund(otpCode)
      .then(res=> {
        if (res?.error){
          console.log(res?.error)
          Alert.alert(res?.error?.message ?? COMMON_ERROR)
          return
        }
        navigate(ScreenNames.PURCHASE_FUND)
      })
  },[])

  const onResend = useCallback(()=> {
    investStore.resendOtpBuyFund()
      .then(res=> {
        if (res?.error){
          Alert.alert(res?.error?.message)
          return
        }
        DeviceEventEmitter.emit('resend')
      })
  },[])

  const handleBuy = useCallback(async (data) => {
    const estimatedQuantity = data.amount ? numberWithCommas((+(data.amount?.replace(/,/g, '')) / +currentNav).toFixed(2)) : 0
    const minBuyValue = filter(bondsDetail?.productDetails, { id: data.program })?.[0]?.buyMinValue
    if (+(data.amount?.replace(/,/g, '')) < +minBuyValue){
      setError('amount', {message: `Số tiền đầu tư tối thiểu là ${minBuyValue}`})
      return
    }
    const param = {
      productId: bondsDetail?.id,
      amount: data?.amount.replace(/,/g, ''),
      productProgramId: data?.program,
      beginBuyAutoStartDate: data?.date
    }
    await investStore.createBuyFundTransaction(param, estimatedQuantity.toString(), currentNav.toString())
    await investStore.sendOtpBuyFund().then(res=> {
      if (res?.error){
        Alert.alert(COMMON_ERROR)
        return
      }
      navigate(ScreenNames.INVEST_OTP, {onResend, onSubmit, otpTime: OTP_TIME.BUY_FUND})
    })
  }, [currentNav])

  useEffect(() => {
    investStore.getFundDetail(investStore?.bondsDetail?.slug).then(res => {
        setLoading(false)
        investStore.getNavs(res?.id).then(e=> setNavs(e))
      },
    ).catch(()=> setLoading(false))
  }, [])

  const productDetail = filter(bondsDetail.productDetails, { id: watch("program") })?.[0]
  const checkValid = !(watch("program") && watch('amount'))

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Đặt lệnh mua"} isBlue />
      {loading ? <ActivityIndicator color={color.primary} style={MARGIN_TOP_24}/> : <>
        {Object.keys(investStore.bondsDetail).length ?
          <ScrollView contentContainerStyle={styles.body}>
            <FundInfo navs={navs}/>
            <MarketBuyForm  {...{ control, errors: { ...errors }, setValue, watch, clearErrors, navs, bondsDetail }} />
            <FundTariff productDetail={productDetail} />
            <View style={styles.wrapBtn}>
              <AppButton title={"Đặt lệnh mua"} onPress={handleSubmit(handleBuy)} disable={checkValid} />
            </View>
          </ScrollView> :
          <EmptyList />
        }
        </>
      }
    </View>
  )
})

export default BuyFund

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },
  body: {
    padding: "16@s",
  },
  wrapBtn: {
    paddingTop: "4@s",
    paddingBottom: "16@s",
  },
})
