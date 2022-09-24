import React, { useCallback } from "react"
import { Pressable, ScrollView, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import MarketChange from "./components/market-change"
import NearestFund from "./components/nearest-fund"
import NearestPrice from "./components/nearest-price"
import { color } from "../../../theme"
import { FONT_MEDIUM_12 } from "../../../styles/common-style"
import MarketInfo from "./components/market-info"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import MarketTariff from "./components/market-tariff"
import MarketHistory from "./components/market-history"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props {
}

const MarketDetail = React.memo((props: Props) => {
  const [index, setIndex] = React.useState(0)

  const [routes] = React.useState([
    { key: "first", title: "Thông tin" },
    { key: "second", title: "Biểu phí" },
    { key: "third", title: "Lịch sử" },
    { key: "fourth", title: "Lịch GD" },
    { key: "fifth", title: "Tài liệu" },
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
        return <MarketInfo />
      case 1:
        return <MarketTariff />
      case 2:
        return <MarketHistory />
      case 3:
        return <MarketInfo />
      case 4:
        return <MarketInfo />
    }
  }, [index])

  const handleBuy = useCallback(() => {
    navigate(ScreenNames.BUY_BONDS)
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"TSP"} isBlue />
      <ScrollView>
        <MarketChange />
        <NearestFund />
        <NearestPrice />
        {_renderTabBar()}
        <View style={styles.body}>
          {renderScreen()}
        </View>
        <View style={styles.wrapBtn}>
          <AppButton title={"Đầu tư ngay"} onPress={handleBuy} />
        </View>
      </ScrollView>

    </View>
  )
})

export default MarketDetail

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
