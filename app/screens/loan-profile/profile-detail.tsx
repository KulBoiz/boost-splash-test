import React, { useEffect } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import AppHeader from "../../components/app-header/AppHeader"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import Info from "./components/info"
import Result from "./components/result"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { width } from "../../constants/variable"
import History from "./components/history"
import { useStores } from "../../models"
import FeedBack from "./components/feedBack"
import { isTaskCreateProfile } from "../loan/constants"
import { observer } from "mobx-react-lite"

interface Props {}

const ProfileDetail = observer((props: Props) => {
  const { loanStore } = useStores()
  const { task } = loanStore

  const [index, setIndex] = React.useState(0)
  const [routes, setRouter] = React.useState([
    { key: "first", title: "Thông tin" },
    { key: "second", title: "Lịch sử xử lý" },
    { key: "third", title: isTaskCreateProfile(task) ? "Kết quả" : "Phản hồi" },
  ])

  useEffect(() => {
    setRouter([
      { key: "first", title: "Thông tin" },
      { key: "second", title: "Lịch sử xử lý" },
      { key: "third", title: isTaskCreateProfile(task) ? "Kết quả" : "Phản hồi" },
    ])
  }, [task])

  const renderScene = SceneMap({
    first: Info,
    second: History,
    third: isTaskCreateProfile(task) ? Result : FeedBack,
  })

  const renderTabBar = (props) => (
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
      <AppHeader headerText={"Hồ sơ"} isBlue />
      {task && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: width }}
          renderTabBar={renderTabBar}
        />
      )}
    </View>
  )
})

export default ProfileDetail

const styles = ScaledSheet.create({
  tab: {
    backgroundColor: "white",
    borderTopLeftRadius: "8@s",
    borderTopRightRadius: "8@s",
    marginBottom: "16@s",
  },
  indicatorStyle: { backgroundColor: color.palette.blue },
  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: color.palette.EEEEEE,
    margin: "24@s",
    borderRadius: "8@s",
  },
  menuText: {
    color: color.palette.BABABA,
    width: 120,
    textAlign: "center",
    padding: "8@s",
  },
  menuTextBottom: {
    width: 120,
    textAlign: "center",
    padding: "8@s",
  },
  active: {
    backgroundColor: color.palette.white,
    color: color.palette.blue,
    borderRadius: "10@s",
    textAlign: "center",
  },
})
