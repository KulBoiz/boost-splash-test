import React, { useCallback } from "react"
import { Pressable, ScrollView, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { SceneMap, TabView } from "react-native-tab-view"
import AppHeader from "../../components/app-header/AppHeader"
import { width } from "../../constants/variable"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import Individual from "./individual"
import Agent from "./agent"
import Setting from "./setting"
import UserContainer from "./components/user-container"
import { AppText } from "../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import BottomView from "../../components/bottom-view"

interface Props {
}

const ProfileScreen = React.memo((props: Props) => {
  const [index, setIndex] = React.useState(0)

  const [routes] = React.useState([
    { key: "first", title: "Cá nhân" },
    { key: "second", title: "Cộng tác viên" },
    { key: "third", title: "Cài đặt chung" },
  ])

  const renderScene = SceneMap({
    first: Individual,
    second: Agent,
    third: Setting,
  })

  const _handleChangeIndex = useCallback((value) => {
    setIndex(value)
  }, [index])

  const _renderTabBar = useCallback((props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const isSelect = i === index
          return (
            <Pressable
              key={i}
              style={isSelect ? styles.tabItemSelect : styles.tabItem}
              onPress={() => _handleChangeIndex(i)}
            >
              <AppText style={FONT_MEDIUM_14}
                       color={isSelect ? color.primary : color.palette.osloGray}>{route.title}</AppText>
            </Pressable>
          )
        })}
      </View>
    )
  }, [index])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Tài khoản cá nhân"} showBorderWidth={false} />
      <FastImage source={images.profile_background} style={styles.imageBackground}/>
      <ScrollView style={{flexGrow:1}} contentContainerStyle={{flex:1}}>
        <UserContainer />
        <View style={styles.body}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(value) => {
              setIndex(value)
            }}
            initialLayout={{ width: width }}
            renderTabBar={_renderTabBar}
          />
        </View>
      </ScrollView>

    </View>
  )
})

export default ProfileScreen

const styles = ScaledSheet.create({
  container: { backgroundColor: color.palette.white, flex: 1 },
  body: {
    flex: 1,
    paddingHorizontal: "16@s",
  },
  imageBackground: {
    width: '230@s',
    height: '230@s',
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0.03
  },
  tabBar: {
    backgroundColor: color.palette.offWhite,
    flexDirection: "row",
    height: "44@s",
    alignItems: "center",
    paddingHorizontal: "8@s",
    borderRadius: "4@s",
  },
  tabItemSelect: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.background,
    paddingHorizontal: "8@s",
    paddingVertical: "4@s",
    borderRadius: "4@s",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "8@s",
    paddingVertical: "4@s",
  },
})


