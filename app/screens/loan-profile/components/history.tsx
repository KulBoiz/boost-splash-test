import React, { useCallback } from "react"
import { FlatList, View } from "react-native"
import HistoryItem from "./history-item"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { useStores } from "../../../models"
import { sortBy } from "lodash"
import moment from "moment"
import { observer } from "mobx-react-lite"

interface Props {
}

const History = observer((props: Props) => {
  const { loanStore } = useStores()
  const { histories = [] } = loanStore

  const renderItem = useCallback(({ item, index }) => {
    const isLastItem = index + 1 === histories?.length
    return <HistoryItem item={item} isLastItem={isLastItem} />
  }, [histories])

  return (
    <View style={styles.container}>
      {
        histories?.length > 0 &&
        <FlatList data={sortBy(histories, function(o) {
          return moment(o.createdAt)
        }).reverse()} renderItem={renderItem} contentContainerStyle={styles.flatList} />
      }
    </View>
  )
})

export default History

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@ms",
  },
  flatList: {
    padding: "16@s",
    backgroundColor: color.background,
    borderRadius: "8@s",
  },
})
