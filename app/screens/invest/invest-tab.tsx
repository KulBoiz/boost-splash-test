import React, { useCallback } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import SettingAuthScreen from "../../components/app-view-no-auth"
import { width } from "../../constants/variable"
import { useStores } from "../../models"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import { observer } from "mobx-react-lite"
import { AppText } from "../../components/app-text/AppText"
import BondsList from "./market/bonds/bonds-list"
import FundList from "./market/fund/fund-list"
import AppHeader from "../../components/app-header/AppHeader"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../navigators/params-list"
import { ScreenNames } from "../../navigators/screen-names"
import { fontFamily } from "../../constants/font-family"

interface Props {
}

const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <AppText>Loading {route.title}…</AppText>
  </View>
)

const InvestTab = observer((props: Props) => {
  const { params: { index } } = useRoute<RouteProp<NavigatorParamList, ScreenNames.INVEST_TAB>>()
  const [id, setId] = React.useState(index ?? 0)

  const [routes] = React.useState([
    { key: "first", title: "Chứng chỉ quỹ" },
    { key: "second", title: "Trái phiếu" },
  ])

  const _renderLazyPlaceholder = useCallback(({ route }) => <LazyPlaceholder route={route} />, [])

  const renderScene = SceneMap({
    first: FundList,
    second: BondsList,
  })

  const renderTabBar = props => (
    <TabBar
      lazy
      renderLazyPlaceholder={_renderLazyPlaceholder}
      {...props}
      inactiveColor={color.palette.lighterGray}
      labelStyle={styles.label}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tab}
    />
  )
  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thông tin thị trường"} isBlue />
      <TabView
        navigationState={{ index: id, routes }}
        renderScene={renderScene}
        onIndexChange={setId}
        initialLayout={{ width: width }}
        renderTabBar={renderTabBar}
      />
    </View>
  )
})

export default InvestTab

const styles = ScaledSheet.create({
  scene: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label:{
    fontSize: '16@ms',
    fontFamily: fontFamily.medium,
    color: color.palette.black,
    textTransform: 'none'
  },
  container: { backgroundColor: color.palette.lightBlue, flex: 1 },
  tab: { backgroundColor: color.transparent, width: '70%' },
  indicatorStyle: { backgroundColor: color.palette.blue, width: '1@s', height: 5, marginLeft: '18.5%'},

})
