import React, { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import CustomerInfo from "./components/customer-info"
import CommissionInfo from "./components/commission-info"
import TransactionInfo from "./components/transaction-info"
import StatusInfo from "./components/status-info"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import BottomView from "../../components/bottom-view"
import { useStores } from "../../models"
import { RouteProp, useRoute } from "@react-navigation/native"
import { CommissionStackParamList } from "../../navigators/commission-stack"
import { ScreenNames } from "../../navigators/screen-names"
import { LoadingComponent } from "../../components/loading"


interface Props {
}

const CommissionDetail = React.memo((props: Props) => {
  const { params: { id } } = useRoute<RouteProp<CommissionStackParamList, ScreenNames.COMMISSION_DETAIL>>()
  const { commissionStore } = useStores()
  const [commissionDetail, setCommissionDetail] = useState()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    commissionStore.getCommissionDetail(id ?? "")
      .then((res) => {
        setLoading(false)
        setCommissionDetail(res)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Chi tiết thông tin hoa hồng"} isBlue />
      {loading ? <LoadingComponent /> :
        <ScrollView style={styles.body}>
          <CustomerInfo {...{ commissionDetail }} />
          <CommissionInfo {...{ commissionDetail }} />
          <TransactionInfo {...{ commissionDetail }} />
          <StatusInfo {...{ commissionDetail }} />
          <BottomView height={50} />
        </ScrollView>
      }
    </View>
  )
})

export default CommissionDetail

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  body: {
    paddingVertical: "12@s",
    paddingHorizontal: "16@s",
  },
})
