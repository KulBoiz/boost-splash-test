import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { ScaledSheet } from 'react-native-size-matters'
import BottomView from '../../../components/bottom-view'
import AdsNews from '../insurance/components/ads-news'
import OthersInsurance from '../insurance/components/others-Insurance'
import { color } from "../../../theme"
import HomeItem from "./components/home-item"
import { INSURANCE_PRODUCT } from "./constants"
import { useStores } from '../../../models'

const InsuranceTab = () => {
  const { insuranceStore } = useStores();
  const [othersInsurance, setOthersInsurance] = useState([])

  useEffect(() => {
    insuranceStore.getCategoryInsurance().then((res) => {
      setOthersInsurance(res?.data?.data)
    })
  }, [])

  const mapInsurance = (type) => {
    return othersInsurance?.filter((el: any) => el?.productCategory === type)
  }

  return (
    <View style={styles.container}>
      {/* <HomeItem data={INSURANCE_PRODUCT} label={"Sản phẩm bảo hiểm"} style={styles.itemMargin} /> */}
      <OthersInsurance data={mapInsurance('real_estate') || []} title={"Bảo con người"} />
      <OthersInsurance data={mapInsurance('vehicle') || []} title={"Bảo phương tiện"} />
      <AdsNews />
      <BottomView height={100} />
    </View>
  )
}

export default InsuranceTab

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
    paddingTop: '16@s'
  },
  scrollView: {
    marginTop: isIphoneX() ? "155@s" : "130@s",
  },
  itemMargin: {
    marginVertical: "24@s",
  },
})

