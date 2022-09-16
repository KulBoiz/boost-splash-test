import React, { useCallback, useState } from "react"
import { View, Pressable, ScrollView } from "react-native"
import { AppText } from "../../components/app-text/AppText"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import AppHeader from "../../components/app-header/AppHeader"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import UserContainer from "./components/user-container"
import Individual from "./individual"
import Agent from "./agent"
import Setting from "./setting"
import BottomView from "../../components/bottom-view"

interface Props{}
const MENU = [
  { key: "first", title: "Cá nhân" },
  { key: "second", title: "Cộng tác viên" },
  { key: "third", title: "Cài đặt chung" },
]
const ProfileScreen = React.memo((props: Props) => {
  const [index, setIndex] = useState(0)

  const _handleChangeIndex = useCallback((value) => {
    setIndex(value)
  }, [index])

  const _renderTabBar = useCallback(() => {
    return (
      <View style={styles.tabBar}>
        {MENU.map((route, i) => {
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
      <ScrollView>
        <UserContainer />
        <View style={styles.body}>
         <>
           {_renderTabBar()}
           {index === 0 && <Individual/>}
           {index === 1 && <Agent/>}
           {index === 2 && <Setting/>}
         </>
        </View>
        <BottomView height={50}/>
      </ScrollView>
    </View>
  )
});

export default ProfileScreen;

const styles = ScaledSheet.create({
    container: {flex:1, backgroundColor: color.background},
  imageBackground: {
    width: '230@s',
    height: '230@s',
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0.03
  },
  body: {
    flex: 1,
    paddingHorizontal: "16@s",
  },
  tabBar: {
    backgroundColor: color.palette.offWhite,
    flexDirection: "row",
    height: "44@s",
    alignItems: "center",
    paddingHorizontal: "8@s",
    borderRadius: "4@s",
    marginBottom: '16@s'
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
});
