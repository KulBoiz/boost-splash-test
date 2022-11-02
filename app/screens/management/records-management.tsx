import { observer } from "mobx-react-lite"
import React, { useCallback, useEffect, useState } from "react"
import { FlatList, RefreshControl, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../components/app-text/AppText"
import EmptyList from "../../components/empty-list"
import { LoadingComponent } from "../../components/loading"
import { fontFamily } from "../../constants/font-family"
import { useStores } from "../../models"
import { FONT_BOLD_12 } from "../../styles/common-style"
import { color } from "../../theme"
import MenuFilter from "../loan/components/finance-filter"
import { TASK_FILTER } from "../loan/constants"
import RequestCounsellingStatus from "./components/request-counselling-status"
import SearchBar from "../../components/search-bar"
import i18n from "i18n-js"

// import LoanProfileStatus from "./components/loan-profile-status"

interface Props {
  index?: number
}

const RecordsManagement = observer((props: Props) => {
  const { loanStore, authStoreModel } = useStores()
  const data = loanStore?.records ?? []
  const total = loanStore?.totalRecord ?? 0
  const [select, setSelect] = useState<any>({ title: "Tất cả", key: 0 })
  const [keyword, setKeyword] = useState<any>('')
  const [loadMore, setLoadMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const userId = authStoreModel?.userId

  const paramTab = (typeof props?.index === "number" && props?.index === 0) ? {
    userId: {
      inq: [userId],
    },
  } : {
    userId: {
      nin: [userId],
    },
  }

  useEffect(() => {
    loanStore.getRecords(paramTab).then(() => {
      setLoading(false)
    })
  }, [props?.index])

  const onChangeSearchText = (value) => {
    setLoading(true)
    setKeyword(value)
    loanStore.getRecords({ ...paramTab, _q: value }).then(() => {
      setLoading(false)
    })
  }

  const renderItem = useCallback(({ item }) => {
    return <RequestCounsellingStatus item={item} />
    // if (item?.status === "consulted") {
    //   return <LoanProfileStatus item={item} />
    // }
  }, [data])

  return (
    <View style={styles.container}>
      <MenuFilter
        currentSelected={select}
        setCurrentSelected={(e) => {
          setLoading(true)
          setSelect(e)
          loanStore.getRecords({
            status: e?.status,
            statusAssign: e?.statusAssign,
            ...paramTab,
            _q: keyword
          }).then(() => {
            setLoading(false)
          }).catch(() => {
            setLoading(false)
          })
        }}
        filterData={TASK_FILTER}
        notShowIcon={true}
      />
      <SearchBar onChangeSearchText={onChangeSearchText} note={i18n.t('note.search')}/>
      {loading ? <LoadingComponent /> :
        <>
          <AppText style={styles.text}>
            Có Tất Cả <AppText value={total} color={color.palette.blue} style={FONT_BOLD_12} /> Hồ Sơ
          </AppText>

          <FlatList
            data={data}
            keyExtractor={(e, i) => i.toString()}
            renderItem={renderItem}
            style={styles.flatList}
            ListEmptyComponent={<EmptyList />}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={()=>loanStore.getRecords({
                  status: select?.status,
                  statusAssign: select?.statusAssign,
                  ...paramTab,
                }).then(() => {
                  setLoading(false)
                })}
                colors={[color.primary]}
                tintColor={color.primary}
              />
            }
            contentContainerStyle={styles.contentContainer}
            onEndReached={() => {
              setLoadMore(true)
              loanStore.loadMoreRecords({
                status: select?.status,
                statusAssign: select?.statusAssign,
                ...paramTab,
              }).then(() => {
                setLoadMore(false)
              }).catch(() => {
                setLoadMore(false)
              })
            }}
            onEndReachedThreshold={0.2}
          />
          {loadMore && <LoadingComponent />}
        </>
      }
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
    paddingBottom: "70@s",
  },
})
