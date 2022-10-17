import React, { useState } from "react"
import { View } from "react-native"
import AppHeader from "../../../../components/app-header/AppHeader"
import PriceItem from "../components/price-item"
import { numberWithCommas } from "../../../../constants/variable"
import { AppText } from "../../../../components/app-text/AppText"
import { FONT_REGULAR_12, FONT_REGULAR_14, MARGIN_BOTTOM_16 } from "../../../../styles/common-style"
import { color } from "../../../../theme"
import { ms, ScaledSheet } from "react-native-size-matters"
import { presets } from "../../../../constants/presets"
import TransactionInfo from "./components/transaction-info"

interface Props {
}

const PurchaseBonds = React.memo((props: Props) => {
  const [purchaseMethod, setPurchaseMethod] = useState()

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thanh toán lệnh mua"} isBlue />
      <View style={styles.body}>

      <PriceItem title={"Số tiền đầu tư"} value={`${numberWithCommas(1000000)} vnd`} style={MARGIN_BOTTOM_16}/>
      <AppText value={"Phương thức thanh toán"} style={presets.label}/>
      <View style={styles.methodContainer}>
        <AppText value={""} style={FONT_REGULAR_14}/>
        <AppText value={"Thay đổi"} style={FONT_REGULAR_12} color={color.primary} />
      </View>
        <TransactionInfo />
      </View>
    </View>
  )
})

export default PurchaseBonds

const styles = ScaledSheet.create({
  container: {},
  body: {
    padding: '16@s'
  },
  methodContainer: {
    marginTop: '12@s',
    height: "60@s",
    borderWidth: 2,
    borderRadius: "8@s",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "16@s",
    alignItems: "center",
    borderColor: color.palette.D9D9D9
  },
})
