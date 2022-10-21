import React, { useCallback, useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import CashInfo from "./components/cash-info"
import { color } from "../../theme"
import AppButton from "../../components/app-button/AppButton"
import { ScaledSheet } from "react-native-size-matters"
import { ScreenNames } from "../../navigators/screen-names"
import { navigate } from "../../navigators"
import { useStores } from "../../models"
import LineChart from "./chart/line-chart"
import { getMonthName } from "../../constants/variable"
import BarChart from "./chart/bar-chart"
import moment from "moment"

interface Props {
}

const currentYear = (new Date()).getFullYear()
const currentMonth = (new Date()).getMonth() + 1

const years = Array.from({ length: 5 }, (_, i) => currentYear + (i * -1))
const months = Array.from({ length: 5 }, (_, i) => `${getMonthName(currentMonth + (i * -1))}`)
const chartData = (data: Array<any>) => data.map(({ amount }) => {
  return amount
})
const getSumCommission = (array: any) => array?.length ? array.map(item => item.amount).reduce((a, b) => a + b) : 0;
const getSpecificData = (array: Array<any>, date) => array?.length ? array.filter(item => moment(item?.createdAt).format('YYYY') === date.toString()) : []

const CommissionScreen = React.memo((props: Props) => {
  const { commissionStore } = useStores()
  const [type, setType] = useState<"months" | "years">("years")
  const [response, setResponse] = useState<any>()

  useEffect(() => {
    commissionStore.getChartData(5,5).then(res => {
      setResponse(res)
    })
  }, [])
  const getData = useCallback(()=> {
    return years.map((e)=> (getSpecificData(response?.byYear?.data, e)))
  },[response])

  console.log('getData', getData())

  const data = {
    labels: type === "years" ? years : months,
    datasets:
      [{
        data: type === "years" ? chartData(response?.byYear?.data ?? []) : chartData(response?.byMonth?.data ?? []),
      }],
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
