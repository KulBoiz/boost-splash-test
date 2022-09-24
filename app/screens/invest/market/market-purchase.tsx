import React, { useCallback } from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { MARGIN_BOTTOM_4 } from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"
import { numberWithCommas } from "../../../constants/variable"
import PurchaseInfo from "./components/purchase-info"
import PurchaseTab from "./components/purchase-tab"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

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

  const handlePurchase = useCallback(()=> {
    navigate(ScreenNames.INVEST_SUCCESS)
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thanh toán lệnh mua"} isBlue />
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.infoContainer}>
          <Item title={"TVPF"} content={"Quỹ trái phiếu"} />
          <Item title={"Giá gần nhất"} content={numberWithCommas(23900.83)} textAlign={"right"} />
        </View>
        <PurchaseInfo />
        <PurchaseTab />
        <View style={styles.wrapBtn}>
          <AppButton title={'Xác nhận thanh toán'} onPress={handlePurchase}/>
        </View>
      </ScrollView>
    </View>
  )
})

export default MarketPurchase

const styles = ScaledSheet.create({
  container: {
    flex:1, backgroundColor: color.background
  },
  infoContainer: {
    backgroundColor: color.palette.navi,
    flexDirection: "row",
    paddingVertical: "20@s",
    marginHorizontal: '16@s',
    paddingHorizontal: "16@s",
    borderRadius: "4@s",
    justifyContent: "space-between",
    marginBottom: "16@s",
  },
  body: {
    paddingVertical: "16@s",
  },
  wrapBtn: {
    paddingHorizontal: '16@s',
    paddingVertical: '24@s'
  }
})
