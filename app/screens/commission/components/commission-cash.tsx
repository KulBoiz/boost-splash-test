import React from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import { hexToRgbA, numberWithCommas } from "../../../constants/variable"

interface Props {
  metadata?: any
}

const TextView = ({ text }: { text: string }) => {
  return (
    <View style={styles.textContainer}>
      <AppText value={text} style={styles.label} />
    </View>
  )
}

const CashView = ({ amount }: { amount: number }) => {
  return (
    <View style={styles.cashContainer}>
      <AppText value={`${numberWithCommas(amount)} đ`} />
      <AppText value={'Tiền hoa hồng'} style={styles.textCommission} />
    </View>
  )
}

const CommissionCash = React.memo((props: Props) => {
  const { metadata } = props
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextView text={"CHƯA ĐỐI SOÁT"} />
        <TextView text={"ĐÃ ĐỐI SOÁT"} />
        <TextView text={"ĐÃ THANH TOÁN"} />
      </View>
      <View style={styles.body}>
        <CashView amount={metadata?.totalNotForControl.toFixed(2)} />
        <CashView amount={metadata?.totalForControl.toFixed(2)} />
        <CashView amount={metadata?.totalPaid.toFixed(2)} />
      </View>
    </View>
  )
})

export default CommissionCash

const styles = ScaledSheet.create({
  container: {},
  headerContainer: {
    backgroundColor: color.palette.orange,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "16@s",
    borderTopRightRadius: '8@s',
    borderTopLeftRadius: '8@s'
  },
  textCommission: {
    color: hexToRgbA(color.palette.black, 0.5),
    fontSize: '12@ms'
  },
  cashContainer: {
    width: '30%',
    alignItems: "center",
  },
  body: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: '16@s',
    paddingVertical: '12@s',
    backgroundColor: color.background
  },
  textContainer: {
    alignItems: "center",
    paddingVertical: "8@s",
    width: '30%'
  },
  label: {
    color: color.text,
    fontFamily: fontFamily.medium,
    fontSize: "12@ms",
    textTransform: "uppercase",
  },
})
