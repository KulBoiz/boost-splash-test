import React from "react"
import { View } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { color } from "../../../theme"
import { FONT_MEDIUM_14 } from "../../../styles/common-style"
import { width } from "../../../constants/variable"
import { ScaledSheet } from "react-native-size-matters"
import PropertyTab from "./property-tab"
import TransactionTab from "./transaction-tab"

interface Props {
}

const InvestManagement = React.memo((props: Props) => {
  const [index, setIndex] = React.useState(0)

  const [routes] = React.useState([
    { key: "first", title: "Tài sản" },
    { key: "second", title: "Giao dịch" },
  ])

  const renderScene = SceneMap({
    first: PropertyTab,
    second: TransactionTab,
  })

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

export default InvestManagement

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: color.background
  },
  tab: { backgroundColor: color.background},
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
