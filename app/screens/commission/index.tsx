import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import AppButton from "../../components/app-button/AppButton"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"
import BarChart from "./chart/bar-chart"
import CashInfo from "./components/cash-info"

interface Props {
}

const totalYear = 3
const currentYear = (new Date()).getFullYear()
const startYear = currentYear - totalYear + 1
// 
const startMonth = 1
const totalMonthInYear = 12
const totalMonth = totalMonthInYear - startMonth + 1

const CommissionScreen = React.memo((props: Props) => {
  const { commissionStore } = useStores()
  const [type, setType] = useState<"months" | "years">("years")
  const [response, setResponse] = useState<any>()

  useEffect(() => {
    // note ===> totalMonth < totalMonthInYear - month start, start year is curren year
    commissionStore.getChartData(totalYear,totalMonth, startYear, startMonth).then(res => {
      setResponse(res)
    })
  }, [])
  
  const data = {
    labels: response?.map(el => el?.time),
    datasets: [{ data: response?.map(el => el?.metadata?.totalForControl?.toFixed(0)) || []}]
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thông tin hoa hồng"} isBlue showBorderWidth={false} />
      <CashInfo />
      <ScrollView style={styles.body}>
         <BarChart data={data}/>
      </ScrollView>
      <View style={styles.wrapBtn}>
        <AppButton title={"Danh sách hoa hồng"} colorBtn={color.palette.orange}
                   onPress={() => navigate(ScreenNames.COMMISSION_LIST)} />
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
    paddingBottom: "24@s",
    paddingHorizontal: "16@s",
  },
})
