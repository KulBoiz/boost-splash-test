import React, { useCallback, useEffect, useState } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"
import { color } from "../../theme"
import RequestCounsellingStatus from "./components/request-counselling-status"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../models"
import { AppText } from "../../components/app-text/AppText"
import { fontFamily } from "../../constants/font-family"
import { FONT_BOLD_12, MARGIN_BOTTOM_16 } from "../../styles/common-style"
import { observer } from "mobx-react-lite"
import { LoadingComponent } from "../../components/loading"
import LoanProfileStatus from "./components/loan-profile-status"

interface Props {}
const RecordsManagement = observer((props: Props) => {
  // @ts-ignore
  const { loanStore } = useStores()
  const data = loanStore?.records ?? []
  const total = loanStore?.totalRecord ?? 0
  const [select, setSelect] = useState<number>(0)
  const [loadMore, setLoadMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    loanStore.getRecords().then(() => {
      setLoading(false)
    })
  }, [])

  const renderItem = useCallback(({ item }) => {
    // return <RequestCounsellingStatus item={item} />
    return <LoanProfileStatus item={item} />
  }, [])

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.text}>
        Có Tất Cả <AppText value={total} color={color.palette.blue} style={FONT_BOLD_12} /> Hồ Sơ
      </AppText>
      <FlatList
        data={data}
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        onEndReached={() => {
          setLoadMore(true)
          loanStore.loadMoreRecords().then(() => {
            setLoadMore(false)
          })
        }}
        onEndReachedThreshold={0.2}
      />
      {loadMore && <LoadingComponent />}
    </View>
  )
})

export default RecordsManagement

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
  },
  text: {
    fontSize: "12@ms",
    fontFamily: fontFamily.regular,
    marginLeft: "16@ms",
    marginTop: "16@s",
    marginBottom: "5@s",
  },
  flatList: {
    paddingHorizontal: "16@ms",
  },
  contentContainer: {
    paddingBottom: '70@s'
  }
})
