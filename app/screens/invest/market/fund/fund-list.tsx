import React, { useCallback, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { useStores } from "../../../../models"
import { observer } from "mobx-react-lite"
import EmptyList from "../../../../components/empty-list"
import BottomView from "../../../../components/bottom-view"
import FundItem from "./components/fund-item"
import { AppText } from "../../../../components/app-text/AppText"
import { ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import TypeFilter from "../components/type-filter"
import { FILTER_FUND, TYPE_OF_FUND } from "../constants"
import SearchBar from "../../../../components/search-bar"
import { filterByValue } from "../../../../constants/variable"

interface Props {
}

const FundList = observer((props: Props) => {
  const { investStore } = useStores()
  const [fundSearch, setFundSearch] = useState<Array<any>>([])
  const [fund, setFund] = useState<Array<any>>([])
  const [type, setType] = useState<typeof TYPE_OF_FUND | null>(null)

  useEffect(() => {
    investStore.getFund({}, { page: 1 })
      .then(res => {
        setFund(res)
        setFundSearch(res)
      })
  }, [])

  const renderItem = useCallback(({ item }) => {
    return <FundItem item={item} />
  }, [fund])

  const loadMore = useCallback(async () => {
    if (fund.length === investStore?.totalFund) return
    investStore.getFund({}, { page: investStore?.pagingParamsFund?.page + 1 })
      .then(res => {
        setFund([...fund, ...res])
        setFundSearch([...fundSearch, ...res])
      })
  }, [fund])

  const data = (type: typeof TYPE_OF_FUND | null) => (
    type ? fund.filter((el)=> el?.info?.typeOfFund === type) : fund
  )

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.header}>
        <TypeFilter filterData={FILTER_FUND} onPress={setType} />
        <View style={[ROW, SPACE_BETWEEN,]}>
          <AppText value={"Mã CCQ"} style={{flex:0.75}} color={color.palette.osloGray} />
          <AppText value={"Giá gần nhất"} style={{flex:1}} color={color.palette.osloGray}/>
          <AppText value={"Biến động"} style={{ width: '27%'}} color={color.palette.osloGray}/>
          <AppText value={"Hành động"} style={{ width: s(60)}} color={color.palette.osloGray}/>
        </View>
      </View>
    )
  }, [])

  const _handleChangeText = (_value) => {
    setFund(filterByValue(fundSearch, _value, 'code'));
  };

  return (
    <View style={styles.container}>
      <SearchBar onChangeSearchText={_handleChangeText}/>
      {renderHeader()}
      <FlatList
        contentContainerStyle={styles.flatList}
        keyExtractor={(e, id) => id.toString()}
        data={data(type)}
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
    borderTopRightRadius: "24@s",
    borderTopLeftRadius: "24@s",
  },
  header: {
    backgroundColor: color.background,
    borderTopRightRadius: '24@s',
    borderTopLeftRadius: '24@s',
    paddingHorizontal: '12@s',
    paddingBottom: '4@s',
    marginTop: '12@s'
  },
  flatList: {
    paddingHorizontal: "12@s",
  },
})


