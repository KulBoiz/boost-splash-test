import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Pressable, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import AppHeader from "../../components/app-header/AppHeader"
import { AppText } from "../../components/app-text/AppText"
import { width } from "../../constants/variable"
import { NavigatorParamList } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import ProjectList from "./project-list"

interface Props { }

const ProjectTab = React.memo((props: Props) => {
  const route = useRoute<RouteProp<NavigatorParamList, ScreenNames.PROJECT_TAB>>()
  const id = route?.params?.id
  const key = route?.params?.key
  const [index, setIndex] = React.useState(id ?? 0);

  const [routes] = React.useState([
    { key: 'first', title: 'Thông tin' },
    { key: 'second', title: 'Sản phẩm' },
  ]);

  const renderScene = SceneMap({
    first: () => <></>,
    second: () => <ProjectList data={[key]} />,
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

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Vay mua nhà dự án"} isBlue />
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
  indicatorStyle: {},
});


