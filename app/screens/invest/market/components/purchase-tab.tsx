import React, { useState } from "react"
import { View } from "react-native"
import TabBar from "../../../../components/tab-bar/tab-bar"
import { ScaledSheet } from "react-native-size-matters"
import PurchaseQrTab from "./purchase-qr-tab"
import PurchaseBankTab from "./purchase-bank-tab"

interface Props {
}

const MENU = [
  { key: "first", title: "QR Code" },
  { key: "second", title: "Chuyển khoản qua ngân hàng" },
]

const PurchaseTab = React.memo((props: Props) => {
  const [index, setIndex] = useState(0)
  return (
    <View style={styles.container}>
      <TabBar {...{ index, setIndex, menu: MENU }} />
      <View style={styles.body}>
        {index === 0 ? <PurchaseQrTab /> : <PurchaseBankTab />}
      </View>
    </View>
  )
})

export default PurchaseTab

const styles = ScaledSheet.create({
  container: {},
  body:{
    paddingHorizontal: '16@s'
  }

})
