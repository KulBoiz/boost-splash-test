import React, { useCallback, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import BondsItem from "./components/bonds-item"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { useStores } from "../../../../models"
import { observer } from "mobx-react-lite"
import EmptyList from "../../../../components/empty-list"
import BottomView from "../../../../components/bottom-view"
import { ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { AppText } from "../../../../components/app-text/AppText"
import { FILTER_BOND } from "../constants"
import TypeFilter from "../components/type-filter"

interface Props {
}

const BondsList = observer((props: Props) => {
  const { investStore } = useStores()
  const [bonds, setBonds] = useState<Array<any>>([])
  const [type, setType] = useState<null>(null)


  useEffect(() => {
    investStore.getBonds({}, { page: 1 })
      .then(res => {
        setBonds(res)
      })
  }, [])

  const renderItem = useCallback(({item}) => {
    return <BondsItem item={item}/>
  }, [bonds])

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.header}>
        <TypeFilter filterData={FILTER_BOND} onPress={setType} />
        <View style={[ROW, SPACE_BETWEEN,]}>
          <AppText value={"Mã trái phiếu"} style={{flex:1}} color={color.palette.osloGray} />
          <AppText value={"Lãi suất"} style={{flex:0.7}} color={color.palette.osloGray}/>
          <AppText value={"Kì tính lãi"} style={{flex:0.65}} color={color.palette.osloGray}/>
          <AppText value={"Hành động"} style={{ width: s(60)}} color={color.palette.osloGray}/>
        </View>

      </View>
    )
  }, [])

  const loadMore = useCallback(async () => {
    if (bonds.length === investStore?.totalBonds) return
    investStore.getBonds({}, { page: investStore?.pagingParamsBonds?.page + 1})
      .then(res => {
        setBonds([...bonds, ...res])
      })
  }, [bonds])

  return (
    <View style={styles.container}>
      {renderHeader()}
        <FlatList
          // ListHeaderComponent={renderHeader}
          // stickyHeaderIndices={[0]}
          contentContainerStyle={styles.flatList}
          keyExtractor={(e, id) => id.toString()}
          data={bonds}
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

export default BondsList

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
    paddingBottom: '8@s',
    marginTop: '12@s',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.offWhite
  },
  flatList: {
    paddingHorizontal: '12@s'
  }
})


