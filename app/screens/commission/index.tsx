import React, { useEffect } from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import CashInfo from "./components/cash-info"
import StackedBarChart from "./chart/stacked-bar-chart"
import { color } from "../../theme"
import AppButton from "../../components/app-button/AppButton"
import { ScaledSheet } from "react-native-size-matters"
import { ScreenNames } from "../../navigators/screen-names"
import { navigate } from "../../navigators"
import { COMMISSION_TYPES } from "./constants"
import { useStores } from "../../models"
import LineChart from "./chart/line-chart"

interface Props {
}

const CommissionScreen = React.memo((props: Props) => {


  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thông tin hoa hồng"} isBlue showBorderWidth={false} />
      <CashInfo />
      <ScrollView style={styles.body}>
        <StackedBarChart />
         <LineChart />
      </ScrollView>
      <View style={styles.wrapBtn}>
        <AppButton title={"Danh sách hoa hồng"} colorBtn={color.palette.orange} onPress={()=> navigate(ScreenNames.COMMISSION_LIST)} />
      </View>
    </View>
  )
})

export default CommissionScreen

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: "16@s",
    paddingBottom: "30@s",
  },
  wrapBtn: {
    paddingBottom: '24@s',
    paddingHorizontal: '16@s'
  }
})
