import React, { useCallback, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import BondsItem from "./components/bonds-item"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import SearchBar from "../../../components/search-bar"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"
import EmptyList from "../../../components/empty-list"
import BottomView from "../../../components/bottom-view"

interface Props {
}

const MarketScreen = observer((props: Props) => {
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

  const loadMore = useCallback(async () => {
    if (bonds.length === investStore?.totalBonds) return
    investStore.getBonds({}, { page: investStore?.pagingParamsBonds?.page + 1})
      .then(res => {
        setBonds([...bonds, ...res])
      })
  }, [bonds])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thông tin thị trường"} isBlue />
      <View style={styles.body}>
        <View>
          <AppText value={"Thị trường"} style={styles.bold} />
        </View>
        <SearchBar placeholder={"Nhập tên công ty quản lỹ quỹ"} />
        <View style={styles.descriptionContainer}>
          <AppText value={"Sản phẩm"} style={styles.description} />
          {/* <AppText value={"NAV/CCQ"} style={styles.description} /> */}
        </View>

        <FlatList
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
    </View>
  )
})

export default MarketScreen

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  bold: {
    fontSize: "26@ms",
    fontFamily: fontFamily.bold,
    marginVertical: "12@s",
  },
  descriptionContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "12@s",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.offWhite,
  },
  description: {
    fontSize: "16@ms",
  },
  body: {
    flex:1,
    paddingHorizontal: "16@s",
  },
})


