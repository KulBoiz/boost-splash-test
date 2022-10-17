import React, { useCallback, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import BondsItem from "./components/bonds-item"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"
import { useStores } from "../../../../models"
import { observer } from "mobx-react-lite"
import EmptyList from "../../../../components/empty-list"
import BottomView from "../../../../components/bottom-view"
import { MARGIN_TOP_16, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { AppText } from "../../../../components/app-text/AppText"

interface Props {
}

const BondsList = observer((props: Props) => {
  const { investStore } = useStores()
  const [bonds, setBonds] = useState<Array<any>>([])

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
      <View style={[ROW, SPACE_BETWEEN, MARGIN_TOP_16, styles.header]}>
        <AppText value={"Tên"} style={{flex:0.6}} color={color.palette.osloGray} />
        <AppText value={"Tồng GT phát hành"} style={{flex:1}} color={color.palette.osloGray}/>
        <AppText value={"Biến động"} style={{ width: '27%'}} color={color.palette.osloGray}/>
        <AppText value={"Hành động"} style={{ width: s(60)}} color={color.palette.osloGray}/>
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
    paddingBottom: '4@s'
  },
  flatList: {
    paddingHorizontal: '12@s'
  }
})


