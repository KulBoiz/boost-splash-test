import React, { useCallback, useEffect, useState } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import BigBannerItem from "./components/big-banner-item"
import { useStores } from "../../models"
import SmallBannerItem from "./components/small-baner-item"
import EmptyList from "../../components/empty-list"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import FilterBanner from "./components/filter-banner"
import { MARGIN_TOP_24 } from "../../styles/common-style"

interface Props {
}

const BannerList = React.memo((props: Props) => {
  const { bannerStore } = useStores()
  const [loading, setLoading] = useState<boolean>(true)
  const [news, setNews] = useState<any[]>([])
  const [filter, setFilter] = useState<any[]>([])
  const [idNews, setIdNews] = useState("")

  useEffect(() => {
    bannerStore.getFilterNews().then(res => setFilter([{ name: "Tất cả", id: undefined }, ...res]))
    bannerStore.getRandomNews().then(res => {
      setNews(res)
      setLoading(false)
    })
  }, [])

  const renderItem = React.useCallback(({ item, index }) => {
    return index % 5 === 0 ? <BigBannerItem item={item} /> : <SmallBannerItem item={item} />
  }, [])

  const renderEmpty = React.useCallback(() => {
    return <EmptyList style={styles.emptyList} />
  }, [])

  const onPress = React.useCallback((value) => {
    setLoading(true)
    setIdNews(value)
    if (value) return bannerStore.getNewsByCategory(value, 1).then(res =>{
      setNews(res)
      setLoading(false)
    })
    bannerStore.getRandomNews().then(res => {
      setNews(res)
      setLoading(false)
    })
  }, [idNews])

  const _onLoadMore = useCallback(() => {
    if (news.length === bannerStore.totalNews && !idNews) {
      return
    }
    bannerStore.getNewsByCategory(
      idNews,
      bannerStore?.pagingRequest + 1,
    ).then(res => {
      if (!res.length) return
      setNews([...news, ...res])
    })
  }, [news, bannerStore.totalNews, idNews])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"BÁO MỚI FINA"} isBlue />
      <FilterBanner data={filter} onPress={onPress} />
      {loading ? <ActivityIndicator color={color.primary} style={MARGIN_TOP_24}/> :
        <FlatList
          onEndReached={_onLoadMore}
          onEndReachedThreshold={0.2}
          keyExtractor={(_, i) => i.toString()}
          data={news}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.flatList}
        />
      }
    </View>
  )
})

export default BannerList

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  emptyList: {
    marginTop: "200@s",
  },
  flatList: {
    paddingHorizontal: "16@s",
    paddingVertical: "24@s",
  },
})
