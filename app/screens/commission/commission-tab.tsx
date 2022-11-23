import React, { useCallback } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import AppHeader from "../../components/app-header/AppHeader"
import { width } from "../../constants/variable"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import CommissionList from "./commssion-list"
import { AppText } from "../../components/app-text/AppText"

interface Props {
}
export const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <AppText>Loading {route.title}…</AppText>
  </View>
);

const CommissionTab = React.memo((props: Props) => {
  const [index, setIndex] = React.useState( 0)

  const [routes] = React.useState([
    { key: "first", title: "Bảo hiểm" },
    { key: "second", title: "Hồ sơ vay" },
  ])

  const _renderLazyPlaceholder = useCallback(({ route }) => <LazyPlaceholder route={route} />, []);

  const InsuranceCommission = useCallback(() => (
    <CommissionList index={0} />
  ),[])

  const LoanCommission = useCallback(() => (
    <CommissionList index={1} />
  ),[])

  const renderScene = SceneMap({
    first: InsuranceCommission,
    second: LoanCommission,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      inactiveColor={color.palette.lighterGray}
      labelStyle={[{ color: color.palette.blue, textTransform: "none" }, FONT_MEDIUM_14]}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tab}
    />
  )

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Danh sách hoa hồng"} isBlue />
      <TabView
        lazy
        renderLazyPlaceholder={_renderLazyPlaceholder}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(value) => {
          setIndex(value)
        }}
        initialLayout={{ width: width }}
        renderTabBar={renderTabBar}
      />
    </View>
  )
})

export default CommissionTab

const styles = ScaledSheet.create({
  container: { backgroundColor: color.palette.white, flex: 1 },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: { backgroundColor: "white" },
  indicatorStyle: { backgroundColor: color.palette.blue },
  wrapRightIcon: {
    width: "18@s",
    height: "18@s",
    borderRadius: "6@s",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.background,
  },
})


