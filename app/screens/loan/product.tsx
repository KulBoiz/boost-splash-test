import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, FlatList, View } from "react-native"
import { color } from "../../theme"
import MenuFilter from "./components/finance-filter"
import BankInfo from "./components/bank-info"
import { s, ScaledSheet } from "react-native-size-matters"
import { CONTAINER_PADDING, MARGIN_BOTTOM_16 } from "../../styles/common-style"
import { FINANCE_FILTER } from "./constants"
import { useStores } from "../../models"

interface Props{}
const Product = React.memo((props: Props) => {
  // @ts-ignore
  const {loanStore} = useStores()
  const [select, setSelect] = useState<number>(0)
  const [loadMore, setLoadMore] = useState<boolean>(false)

  const data = loanStore?.products?.data ?? []
  useEffect(()=> {
    loanStore.getProducts()
  },[])

  const renderItem = useCallback(({item}) => {
    return <BankInfo item={item} />
  },[])

  return (
    <View style={styles.container}>
      {/* <MenuFilter currentSelected={select} setCurrentSelected={setSelect} filterData={FINANCE_FILTER}/> */}
      <FlatList style={[CONTAINER_PADDING,{flex: 1, marginTop: s(16)}]} data={data} renderItem={renderItem}
                onEndReached={() => {
                  loanStore.loadMoreProducts()
                  setLoadMore(false)
                }}
                onEndReachedThreshold={0.2}
                onScrollBeginDrag={() => {
                  setLoadMore(false)
                }}
      />
      {loadMore && <ActivityIndicator style={MARGIN_BOTTOM_16}/>}
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
