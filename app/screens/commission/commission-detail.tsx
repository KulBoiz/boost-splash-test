import React from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import CustomerInfo from "./components/customer-info"
import CommissionInfo from "./components/commission-info"
import TransactionInfo from "./components/transaction-info"
import StatusInfo from "./components/status-info"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import BottomView from "../../components/bottom-view"


interface Props {
}

const CommissionDetail = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={"Chi tiết thông tin hoa hồng"} isBlue />
      <ScrollView style={styles.body}>
        <CustomerInfo />
        <CommissionInfo />
        <TransactionInfo />
        <StatusInfo />
        <BottomView height={50} />
      </ScrollView>
    </View>
  )
})

export default CommissionDetail

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: color.background,
  },
  body: {
    paddingVertical: "12@s",
    paddingHorizontal: "16@s",
  },
})
