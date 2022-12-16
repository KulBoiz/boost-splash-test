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
import { useIsFocused } from "@react-navigation/native"
import { dateSip } from "../../../constants/regex"

interface Props {
}

const flex = {
  program: Yup.string().required("Chọn chương trình"),
  amount: Yup.string().required("Nhập số tiền đầu tư"),
}

const BuyFund = observer((props: Props) => {
  const { investStore } = useStores()
  const isFocused = useIsFocused()
  const { bondsDetail } = investStore
  const [isSip, setIsSip] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const currentNav = bondsDetail?.info?.navCurrently

  const flexValidationSchema = Yup.object().shape({
   ...flex
  })

  const sipValidationSchema = Yup.object().shape({
   ...flex,
    date: Yup.string()
      .required("Nhập ngày đầu tư định kì")
      .matches(dateSip, 'Vui lòng nhập ngày trong khoảng 1-30'),
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
    resolver: isSip === 'true' ? yupResolver(sipValidationSchema) : yupResolver(flexValidationSchema),
    reValidateMode: "onChange",
  })

  useEffect(()=> {
    setValue('amount','')
    setValue('program','')
    clearErrors('amount')
  },[isFocused])

  const onSubmit = useCallback((otpCode)=> {
    investStore.verifyOtpBuyFund(otpCode)
      .then(res=> {
        if (res?.error){
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

  const handleBuy = useCallback( async (data) => {
    const estimatedQuantity = data.amount ? numberWithCommas((+(data.amount?.replace(/,/g, '')) / +currentNav).toFixed(2)) : 0
    const minBuyValue = filter(bondsDetail?.productDetails, { id: data.program })?.[0]?.buyMinValue
    if (+(data.amount?.replace(/,/g, '')) < +minBuyValue){
      setError('amount', {message: `Số tiền đầu tư tối thiểu là ${numberWithCommas(minBuyValue)}`})
      return
    }
    const param = {
      productId: bondsDetail?.id,
      amount: data?.amount.replace(/,/g, ''),
      productProgramId: data?.program,
      beginBuyAutoStartDate: data?.date
    }
    investStore.createBuyFundTransaction(param, estimatedQuantity.toString(), currentNav.toString()).then(res=>{
      if (res?.error){
        return Alert.alert(res?.error?.message ?? COMMON_ERROR)
      }
      navigate(ScreenNames.PURCHASE_FUND, {param})
    })

    // await investStore.createBuyFundTransaction(param, estimatedQuantity.toString(), currentNav.toString())
    // await investStore.sendOtpBuyFund().then(res=> {
    //   if (res?.error || res?.includes('502')){
    //     Alert.alert(COMMON_ERROR)
    //     return
    //   }
    //   navigate(ScreenNames.INVEST_OTP, {onResend, onSubmit, otpTime: OTP_TIME.BUY_FUND})
    // })

  }, [currentNav])

  useEffect(() => {
    investStore.getFundDetail(investStore?.bondsDetail?.slug).then(res => {
        setLoading(false)
      },
    ).catch(()=> setLoading(false))
  }, [])

  const productDetail = filter(bondsDetail.productDetails, { id: watch("program") })?.[0]
  const checkValid = isSip === 'true' ? !(watch("program") && watch('amount') && watch('date')) : !(watch("program") && watch('amount'))

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Đặt lệnh mua"} isBlue />
      {loading ? <ActivityIndicator color={color.primary} style={MARGIN_TOP_24}/> : <>
        {Object.keys(investStore.bondsDetail).length ?
          <ScrollView contentContainerStyle={styles.body}>
            <FundInfo nav={currentNav}/>
            <MarketBuyForm  {...{ control, errors: { ...errors }, setValue, setError, watch, clearErrors, nav: currentNav, bondsDetail, setIsSip }} />
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
