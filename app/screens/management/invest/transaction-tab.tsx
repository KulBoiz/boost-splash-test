import React, { useCallback, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { useStores } from "../../../models"
import { INVEST_TRANSACTION_TYPE } from "../../../constants/types"
import TransactionHistoryItem from "./components/transaction-history-item"
import TransactionFilter from "./components/transaction-filter"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"

interface Props {
}

const TransactionTab = React.memo((props: Props) => {
  const { assetStore } = useStores()
  const [type, setType] = useState<INVEST_TRANSACTION_TYPE>(INVEST_TRANSACTION_TYPE.BUY)
  const [histories, setHistories] = useState<any>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setHistories([])
    setTotal(0)
    assetStore.getTransactionHistory(type, { page: 1, limit: 20 }).then(res => {
      setTotal(res?.total)
      setHistories(res?.data)
    })
  }, [type])

  const renderItem = React.useCallback(({ item }) => {
    return <TransactionHistoryItem item={item} />
  }, [type])

  const loadMore = useCallback(async () => {
    if (histories.length <= total) return
    assetStore.getTransactionHistory({}, { page: assetStore?.pagingRequest?.page + 1 })
      .then(res => {
        setHistories([...histories, ...res])
      })
  }, [histories, type])

  return (
    <View style={styles.container}>
      <TransactionFilter {...{ type, setType }} />
      <AppText style={styles.text} fontSize={ms(12)}>
        Tổng số lệnh: <AppText value={total} fontFamily={fontFamily.bold} />
      </AppText>
      <FlatList
        keyExtractor={histories?.id}
        data={histories}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.flatList} />
    </View>
  )
})

export default TransactionTab

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  text: {
    marginBottom: "12@s",
    paddingHorizontal: "16@s",
  },
  flatList: {
    paddingHorizontal: "16@s",
  },

})
