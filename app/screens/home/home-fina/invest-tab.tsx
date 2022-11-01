import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import InvestItemContainer from "./components/invest-item-container"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { MARGIN_BOTTOM_16, MARGIN_TOP_16 } from "../../../styles/common-style"
import HomeBanner from "./components/home-banner"
import FastImage from "react-native-fast-image"
import { AppText } from "../../../components/app-text/AppText"
import { images } from "../../../assets/images"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import AppButton from "../../../components/app-button/AppButton"
import BottomView from "../../../components/bottom-view"

interface Props {
}

const InvestTab = React.memo((props: Props) => {
  const { investStore } = useStores()
  const [bonds, setBonds] = useState([])
  const [funds, setFunds] = useState([])

  useEffect(() => {
    investStore.getOutstandingBonds().then(res => setBonds(res))
    investStore.getOutstandingFund().then(res => setFunds(res))
  }, [])

  const listBonds = useCallback(() => {
    navigate(ScreenNames.INVEST_TAB, { index: 1 })
  }, [])

  const listFund = useCallback(() => {
    navigate(ScreenNames.INVEST_TAB, { index: 0 })
  }, [])

  return (
    <View style={styles.container}>
      <FastImage source={images.invest_home} style={styles.image}>
        <AppText value={"Bạn muốn quan sát thông tin"} color={color.text} />
        <AppText value={"thị trường?"} fontSize={ms(20)} color={color.text} fontFamily={fontFamily.semiBold} />
        <AppButton onPress={() => {
        }} title={"Xem ngay"} disable={true} containerStyle={styles.btn} />
      </FastImage>
      {!!bonds?.length && <InvestItemContainer label={"Trái phiếu nổi bật"} data={bonds} onPress={listBonds} style={MARGIN_BOTTOM_16} />}
      {!!funds?.length && <InvestItemContainer label={"CCQ nổi bật"} data={funds} type={"fund"} onPress={listFund} />}
      <HomeBanner type={"small"} label={"Tin tức"} style={MARGIN_TOP_16} />
      <BottomView height={s(200)} />

    </View>
  )
})

export default InvestTab

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },
  image: {
    width: "100%",
    height: "110@s",
    marginBottom: "16@s",
    marginTop: "8@s",
    paddingVertical: "16@s",
    paddingHorizontal: "24@s",
  },
  btn: {
    height: '35@ms',
    width: "40%",
    marginTop: "4@s",
    borderRadius: "4@s",
    backgroundColor: color.palette.orange,
  },
})
