import React, { useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import InvestItemContainer from "./components/invest-item-container"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { MARGIN_BOTTOM_16, MARGIN_BOTTOM_4, MARGIN_TOP_16 } from "../../../styles/common-style"
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
        <AppText value={"Khảo sát khẩu vị đầu tư"} color={color.text} />
        <AppText value={"ĐẦU TƯ"} fontSize={ms(25)} color={color.text} fontFamily={fontFamily.bold} />
        <AppButton onPress={() => {
        }} title={"Khảo sát ngay"} disable={true} containerStyle={styles.btn} />
      </FastImage>
      <InvestItemContainer label={"Trái phiếu nổi bật"} data={bonds} onPress={listBonds} style={MARGIN_BOTTOM_16} />
      <InvestItemContainer label={"CCQ nổi bật"} data={funds} type={"fund"} onPress={listFund} />
      <HomeBanner type={"big"} label={"Tin tức"} style={MARGIN_TOP_16} />
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
    flex: 1,
    width: "50%",
    marginTop: "4@s",
    borderRadius: '4@s',
    backgroundColor: color.palette.orange,
  },
})
