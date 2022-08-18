import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Pressable, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import AppHeader from "../../components/app-header/AppHeader"
import SettingAuthScreen from "../../components/app-view-no-auth"
import { AppText } from "../../components/app-text/AppText"
import { width } from "../../constants/variable"
import { useStores } from "../../models"
import {  NavigatorParamList } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import ProjectList from "./project-list"
import LoanProcess from "./loan-process"

interface Props { }

const ProjectTab = React.memo((props: Props) => {
  const route = useRoute<RouteProp<NavigatorParamList, ScreenNames.PROJECT_TAB>>()
  const id = route?.params?.id
  const navigation = useNavigation()
  const [index, setIndex] = React.useState(id ?? 0);

  const [routes] = React.useState([
    { key: 'first', title: 'Thông tin' },
    { key: 'second', title: 'Sản phẩm' },
  ]);

  const { authStoreModel } = useStores();

  const renderScene = SceneMap({
    first: !authStoreModel?.isLoggedIn ? SettingAuthScreen : LoanProcess,
    second: !authStoreModel?.isLoggedIn ? SettingAuthScreen : ProjectList,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      inactiveColor={color.palette.lighterGray}
      labelStyle={[{ color: color.palette.blue, textTransform: 'none' }, FONT_MEDIUM_14]}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tab}
    />
  );

  const renderRightIcon = () => {
    return (
      <Pressable style={styles.wrapRightIcon} onPress={() => navigation.dispatch(StackActions.push(ScreenNames.INTRODUCE_SCREEN))}>
        <AppText value={'i'} />
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Vay mua nhà dự án"} isBlue renderRightIcon={renderRightIcon()} />
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
});

export default ProjectTab;

const styles = ScaledSheet.create({
  container: { backgroundColor: color.palette.white, flex: 1 },
  tab: { backgroundColor: 'white', borderTopLeftRadius: '8@s', borderTopRightRadius: '8@s'},
  indicatorStyle: { backgroundColor: color.palette.blue},
  wrapRightIcon: {
    width: '18@s',
    height: '18@s',
    borderRadius: '6@s',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.background
  },
});


