import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native"
import AppHeader from "../../../../components/app-header/AppHeader"
import NearestFund from "../components/nearest-fund"
import NearestPrice from "../components/nearest-price"
import { color } from "../../../../theme"
import { FONT_MEDIUM_12, MARGIN_TOP_16 } from "../../../../styles/common-style"
import MarketInfo from "../components/market-info"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../../components/app-text/AppText"
import FundTariff from "./components/fund-tariff"
import AppButton from "../../../../components/app-button/AppButton"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"
import { useStores } from "../../../../models"
import { RouteProp, useRoute } from "@react-navigation/native"
import { fontFamily } from "../../../../constants/font-family"
import { get } from "lodash"
import EmptyList from "../../../../components/empty-list"
import { truncateString } from "../../../../constants/variable"
import FundChart from "./components/fund-chart"
import FundInfoDetail from "./components/fund-info-detail"
import { NavigatorParamList } from "../../../../navigators/params-list"
import MarketChange from "../components/market-change"
import MarketHistory from "../components/market-history"

interface Props {
}

const FundDetail = React.memo((props: Props) => {
  const { params: { slug } } = useRoute<RouteProp<NavigatorParamList, ScreenNames.FUND_DETAIL>>()
  const { investStore } = useStores()
  const [index, setIndex] = React.useState(0)
  const [data, setData] = useState({})
  const [navs, setNavs] = useState([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    investStore.getFundDetail(slug).then(res => {
        setLoading(false)
        setData(res)
        investStore.getNavs(res?.id).then(e=> setNavs(e))
      },
    )
  }, [])

  const [routes] = React.useState([
    { key: "first", title: "Thông tin" },
    { key: "second", title: "Biểu phí" },
    { key: "third", title: "Lịch sử" },
    { key: "fourth", title: "Lịch GD" },
    // { key: "fifth", title: "Tài liệu" },
  ])

  const _handleChangeIndex = useCallback((value) => {
    setIndex(value)
  }, [index])

  const _renderTabBar = useCallback(() => {
    return (
      <View style={styles.tabBar}>
        {routes.map((route, i) => {
          const isSelect = i === index
          return (
            <Pressable
              key={i}
              style={isSelect ? styles.tabItemSelect : styles.tabItem}
              onPress={() => _handleChangeIndex(i)}
            >
              <AppText style={FONT_MEDIUM_12}
                       color={isSelect ? color.primary : color.palette.osloGray}>{route.title}</AppText>
            </Pressable>
          )
        })}
      </View>
    )
  }, [index])

  const renderScreen = useCallback(() => {
    switch (index) {
      case 0:
        return <MarketInfo data={data} />
      case 1:
        return <FundTariff data={data} />
      case 2:
        return <MarketHistory data={data} navs={navs}/>
      case 3:
        return <FundInfoDetail data={data} />
    }
    //   case 4:
    //     return <MarketInfo data={data} />
    // }
  }, [index, data])

  const handleBuy = useCallback(() => {
    navigate(ScreenNames.BUY_FUND)
  }, [])

  const renderTitle = useMemo(() => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <AppText value={truncateString(get(data, "name", ""), 30)} fontSize={ms(16)} fontFamily={fontFamily.bold}
                 color={color.text} />
        <AppText value={get(data, "org.name", "")} color={color.text} />
      </View>
    )
  }, [data])

  return (
    <View style={styles.container}>
      <AppHeader renderTitle={renderTitle} isBlue />
      {loading ? <ActivityIndicator color={color.primary} style={MARGIN_TOP_16} /> :
        <>
          {data ? <ScrollView>
            <MarketChange item={data}/>
            <NearestFund data={data} navs={navs}/>
            {navs&& <FundChart data={data} navs={navs}/>}
            <NearestPrice data={data} navs={navs}/>
            {_renderTabBar()}
            <View style={styles.body}>
              {renderScreen()}
            </View>
            <View style={styles.wrapBtn}>
              <AppButton title={"Đầu tư ngay"} onPress={handleBuy} />
            </View>
          </ScrollView> : <EmptyList />
          }
        </>
      }
    </View>
  )
})

export default FundDetail

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: color.background },
  body: {
    paddingHorizontal: "16@s",
  },
  tabBar: {
    backgroundColor: color.palette.white,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: color.palette.BABABA,
    marginBottom: "16@s",
  },
  tabItemSelect: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: color.primary,
    paddingHorizontal: "8@s",
    paddingVertical: "8@s",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "8@s",
    paddingVertical: "8@s",
  },
  wrapBtn: {
    paddingHorizontal: "16@s",
    paddingVertical: "24@s",
  },
})
