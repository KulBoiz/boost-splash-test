import React, { useCallback, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import BondsItem from "./components/bonds-item"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"
import EmptyList from "../../../components/empty-list"
import BottomView from "../../../components/bottom-view"
import FundItem from "./components/fund-item"

interface Props {
}

const FundList = observer((props: Props) => {
  const { investStore } = useStores()
  const [fund, setFund] = useState<Array<any>>([])

  useEffect(() => {
    investStore.getFund({}, { page: 1 })
      .then(res => {
        setFund(res)
      })
  }, [])

  const renderItem = useCallback(({item}) => {
    return <FundItem item={item}/>
  }, [fund])

  const loadMore = useCallback(async () => {
    if (fund.length === investStore?.totalFund) return
    investStore.getFund({}, { page: investStore?.pagingParamsFund?.page + 1})
      .then(res => {
        setFund([...fund, ...res])
      })
  }, [fund])

  return (
    <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.flatList}
          keyExtractor={(e, id) => id.toString()}
          data={fund}
          renderItem={renderItem}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          ListEmptyComponent={<EmptyList />}
          ListFooterComponent={<BottomView height={30} />}
          showsVerticalScrollIndicator={false}
        />
    </View>
  )
})

export default FundList

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    borderTopRightRadius: '24@s',
    borderTopLeftRadius: '24@s',
  },
  flatList: {
    paddingHorizontal: '12@s'
  }
})


