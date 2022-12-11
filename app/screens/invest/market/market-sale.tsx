import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import AppHeader from "../../../components/app-header/AppHeader"
import { MARGIN_TOP_16 } from "../../../styles/common-style"
import { color } from "../../../theme"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import MarketSaleForm from "./components/market-sale-form"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import SaleFundInformation from "./fund/components/sale-fund-information"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../../navigators/params-list"
import { useStores } from "../../../models"
import EmptyList from "../../../components/empty-list"
import FundTariff from "./fund/components/fund-tariff"
import { filter } from "lodash"

interface Props {
}

const MarketSale = React.memo((props: Props) => {
  const { params: { slug } } = useRoute<RouteProp<NavigatorParamList, ScreenNames.SALE_BONDS>>()
  const [data, setData] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [isValid, setIsValid] = useState<boolean>(false)
  const { investStore, assetStore } = useStores()

  useEffect(() => {
    investStore.getFundDetail(slug).then(res => {
        setLoading(false)
        setData(res)
        assetStore.loadAssetProgram(res?.info?.idPartner)
      },
    )
  }, [])

  const validationSchema = Yup.object().shape({
    program: Yup.string().required('Chọn chương trình'),
    amount: Yup.string().required('Nhập số lượng CCQ'),
  })

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const handleSale = useCallback(() => {
    if(!isValid) return
    navigate(ScreenNames.CONFIRM_SALE)
  }, [isValid])

  const productDetail = filter(data?.productDetails, { idPartner: watch("program") })?.[0]

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Đặt lệnh bán"} isBlue />
      {
        loading ? <ActivityIndicator color={color.primary} style={MARGIN_TOP_16} /> :
          <>
            {data ?
              <View style={{flex:1}}>
              <ScrollView style={styles.bodyContainer} bounces={false}>
                <SaleFundInformation data={data} />
                <MarketSaleForm  {...{ control, errors: { ...errors }, setValue, watch, clearErrors, data, setError, setIsValid }} />
                <FundTariff productDetail={productDetail} hideBuyFee/>
              </ScrollView>
                <View style={styles.wrapBtn}>
                  <AppButton title={"Đặt lệnh bán"} onPress={handleSubmit(handleSale)} disabled={!isValid}/>
                </View>
              </View>
              : <EmptyList />
            }
          </>
      }
    </View>

  )
})

export default MarketSale

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  bodyContainer: {
    padding: "16@s",
    flex: 1,
    marginBottom: "16@s",

  },
  wrapContainer: {
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: "8@s",
    marginBottom: "16@s",
  },
  header: {
    borderTopLeftRadius: "8@s",
    borderTopRightRadius: "8@s",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.primary,
    padding: "16@s",
  },
  wrapBtn: {
    paddingBottom: "24@s",
    paddingHorizontal: "16@s",

  },
})
