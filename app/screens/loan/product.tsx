import React, { useCallback, useState } from "react"
import { FlatList, View } from "react-native"
import { color } from "../../theme"
import FinanceFilter from "./components/finance-filter"
import BankInfo from "./components/bank-info"
import { ScaledSheet } from "react-native-size-matters"
import { CONTAINER_PADDING } from "../../styles/common-style"
import { FINANCE_FILTER } from "./constants"
import { useStores } from "../../models"

interface Props{}
const Product = React.memo((props: Props) => {
  const {loanStore} = useStores()
  const [select, setSelect] = useState<number>(0)
  const data = loanStore?.products?.data ?? []

  const renderItem = useCallback(({item}) => {
    return <BankInfo item={item} />
  },[])

  return (
    <View style={styles.container}>
      <FinanceFilter currentSelected={select} setCurrentSelected={setSelect} filterData={FINANCE_FILTER}/>
      <FlatList style={[CONTAINER_PADDING,{flex: 1}]} data={data} renderItem={renderItem} />
    </View>
  )
});

export default Product;

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.palette.white,
      flex: 1,
    },
});
