import React, { useCallback, useEffect, useState } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"
import FinanceFilter from "./components/finance-filter"
import { PROFILE_MANAGEMENT_FILTER } from "./constants"
import { color } from "../../theme"
import ShortStatus from "./components/short-status"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../models"
import { AppText } from "../../components/app-text/AppText"
import { fontFamily } from "../../constants/font-family"
import { FONT_BOLD_12, MARGIN_BOTTOM_16 } from "../../styles/common-style"
import { observer } from "mobx-react-lite"

interface Props { }
const RecordsManagement = observer((props: Props) => {
  const { loanStore } = useStores()
  const data = loanStore?.records ?? []
  const total = loanStore?.total ?? 0
  const [select, setSelect] = useState<number>(0)
  const [loadMore, setLoadMore] = useState<boolean>(false)

  useEffect(()=> {
    loanStore.getRecords()
  },[])

  const renderItem = useCallback(({ item }) => {
    return <ShortStatus item={item} />
  }, [])

  return (
    <View style={styles.container}>
      <FinanceFilter currentSelected={select} setCurrentSelected={setSelect} filterData={PROFILE_MANAGEMENT_FILTER} />
      <AppText style={styles.text}>Có Tất Cả <AppText value={total} color={color.palette.blue} style={FONT_BOLD_12} /> Hồ Sơ</AppText>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.flatList}
        onEndReached={() => {
            loanStore.loadMoreRecords()
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

export default RecordsManagement;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
  },
  text: {
    fontSize: '12@ms',
    fontFamily: fontFamily.regular,
    marginLeft: '16@ms',
    marginTop: '16@s',
    marginBottom: '5@s'
  },
  flatList: {
    paddingHorizontal: '16@ms',
  },

});
