import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import FundInfo from "./fund/components/fund-info"
import FundTariff from "./fund/components/fund-tariff"
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
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import EmptyList from "../../../components/empty-list"
import { MARGIN_TOP_24 } from "../../../styles/common-style"

interface Props {
}

const BuyFund = observer((props: Props) => {
  const { investStore } = useStores()
  const { bondsDetail } = investStore
  const [navs, setNavs] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

  const validationSchema = Yup.object().shape({
    program: Yup.string().required("Chọn chương trình"),
    amount: Yup.string().required("Nhập số tiền đầu tư"),
    estimatedQuantity: Yup.string().required("Nhập số lượng"),
    purchaseFee: Yup.string().required("Nhập số phí"),
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

  const handleBuy = useCallback((data) => {
    const param = {
      program: data?.program,
      amount: data?.amount,
      estimatedQuantity: data?.estimatedQuantity
    }
    investStore.setBuyInfo(param)
    navigate(ScreenNames.PURCHASE_BONDS)
  }, [watch])

  useEffect(() => {
    investStore.getFundDetail(investStore?.bondsDetail?.slug).then(res => {
        setLoading(false)
        investStore.getNavs(res?.id).then(e=> setNavs(e))
      },
    ).catch(()=> setLoading(false))
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Đặt lệnh mua"} isBlue />
      {loading ? <ActivityIndicator color={color.primary} style={MARGIN_TOP_24}/> : <>
        {Object.keys(investStore.bondsDetail).length ?
          <ScrollView contentContainerStyle={styles.body}>
            <FundInfo navs={navs}/>
            <MarketBuyForm  {...{ control, errors: { ...errors }, setValue, watch, clearErrors, navs, bondsDetail }} />
            <FundTariff data={investStore.bondsDetail}/>
            <View style={styles.wrapBtn}>
              <AppButton title={"Đặt lệnh mua"} onPress={handleSubmit(handleBuy)} />
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
