import React, { useCallback } from "react"
import { View, FlatList } from "react-native"
import HistoryItem from "./history-item"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { useStores } from "../../../models"
import { sortBy } from "lodash"
import moment from "moment"

interface Props { }

const History = React.memo((props: Props) => {
  // @ts-ignore
  const { loanStore } = useStores()
  const { histories = [] } = loanStore

  const renderItem = useCallback(({ item, index }) => {
    const isLastItem = index + 1 === histories?.length
    return <HistoryItem item={item} isLastItem={isLastItem} />
  }, [histories?.length])

  return (
    <View style={styles.container}>
      {
        histories?.length > 0 &&
        <FlatList data={sortBy(histories, function (o) { return moment(o.createdAt); }).reverse()} renderItem={renderItem} style={styles.flatList} />
      }
    </View>
  )
});

export default History;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@ms'
  },
  flatList: {
    padding: '16@s',
    backgroundColor: color.background,
    borderRadius: '8@s'
  }
});
