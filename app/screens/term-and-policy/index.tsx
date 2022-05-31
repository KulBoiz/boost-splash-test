import React from 'react';
import { View } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { color } from "../../theme"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { width } from "../../constants/variable"
import Term from "./term"
import Policy from "./policy"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"

interface Props{}

const renderScene = SceneMap({
  first: Term,
  second: Policy,
});

const TermAndPolicy = React.memo((props: Props) => {
  const route = useRoute<RouteProp<NavigatorParamList, ScreenNames.TERM_AND_POLICY>>()
  const param = route?.params?.id ?? 0
  const [index, setIndex] = React.useState(param);
  const [routes] = React.useState([
    { key: 'first', title: 'Điều Khoản' },
    { key: 'second', title: 'Chính Sách' },
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      inactiveColor={color.palette.lighterGray}
      labelStyle={[{color: color.palette.blue, textTransform: 'none'}, FONT_MEDIUM_14]}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tab}
    />
  );
  return (
    <View style={styles.container}>
      <AppHeader headerText={'điều khoản & chính sách'} isBlue/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width}}
        renderTabBar={renderTabBar}
      />
    </View>
  )
});

export default TermAndPolicy;

const styles = ScaledSheet.create({
  container: {backgroundColor: color.palette.blue, flex: 1},
  tab:{ backgroundColor: 'white', borderTopLeftRadius: '8@s', borderTopRightRadius: '8@s' },
  indicatorStyle:{ backgroundColor: color.palette.blue }

});
