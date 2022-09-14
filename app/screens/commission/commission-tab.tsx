import React, { useCallback } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import AppHeader from "../../components/app-header/AppHeader"
import { width } from "../../constants/variable"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import CommissionList from "./commssion-list"

interface Props {
}

const CommissionTab = React.memo((props: Props) => {
  const [index, setIndex] = React.useState( 0)

  const [routes] = React.useState([
    { key: "first", title: "Bảo hiểm" },
    { key: "second", title: "Hồ sơ vay" },
  ])

  const InsuranceCommission = useCallback(() => (
    <CommissionList index={index ?? 0} />
  ),[index])

  const LoanCommission = useCallback(() => (
    <CommissionList index={index ?? 0} />
  ),[index])

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
  container: { backgroundColor: color.palette.blue, flex: 1 },
  tab: { backgroundColor: "white", borderTopLeftRadius: "8@s", borderTopRightRadius: "8@s" },
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


