import React from "react"
import { View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import TransactionInformationItem from "./components/transaction-information-item"
import { useStores } from "../../../models"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import TransactionBankItem from "./components/transaction-bank-item"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props {
}

const TransactionInformation = React.memo((props: Props) => {
  const { investStore } = useStores()
  const item = JSON.parse(investStore.transactionInformation)
  const isPurchase = item?.statusName !== 'Chờ khớp lệnh' || item?.statusName !== 'Đã khớp'
  const confirmPurchase = React.useCallback(()=> {
    navigate(ScreenNames.CONFIRM_PURCHASE_SUCCESS)
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thông tin giao dịch"} isBlue />
      <View style={styles.body}>
        <TransactionInformationItem item={item} />
        <TransactionBankItem item={item}/>
      </View>
      {isPurchase &&  <View style={styles.wrapButton}>
        <AppButton title={'Xác nhận thanh toán'} onPress={confirmPurchase}/>
      </View>}

    </View>
  )
})

export default TransactionInformation

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: color.background },
  body: {
    padding: "16@s",
  },
  wrapButton:{
    flex:1,
    justifyContent: "flex-end",
    paddingBottom: '24@s',
    paddingHorizontal: '16@s'
  }
})
