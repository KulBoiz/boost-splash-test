import React from 'react';
import {  View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import AppHeader from "../../components/app-header/AppHeader";
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme";
import Info from './components/info';
import Result from './components/result';
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { width } from "../../constants/variable"
import History from "./components/history"

interface Props { }

const renderScene = SceneMap({
  first: Info,
  second: History,
  third : Result,
});
const ProfileDetail = React.memo((props: Props) => {
  const [key, setKey] = React.useState<number>(0);
  const [paths] = React.useState([
    { title: 'Thông tin' },
    { title: 'Lịch sử xử lý' },
    { title: 'Kết quả' },
  ]);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Thông tin' },
    { key: 'second', title: 'Lịch sử xử lý' },
    { key: 'third', title: 'Kết quả' },
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
      <AppHeader headerText={'chi tiết hồ sơ'} isBlue />

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

export default ProfileDetail;

const styles = ScaledSheet.create({
  tab:{ backgroundColor: 'white', borderTopLeftRadius: '8@s', borderTopRightRadius: '8@s', marginBottom: '16@s' },
  indicatorStyle:{ backgroundColor: color.palette.blue, width: '65@ms', marginLeft: '32.5@ms' },
  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: color.palette.EEEEEE,
    margin: '24@s',
    borderRadius: '8@s',
  },
  menuText: {
    color: color.palette.BABABA,
    width: 120,
    textAlign: 'center',
    padding: '8@s',

  },
  menuTextBottom: {
    width: 120,
    textAlign: 'center',
    padding: '8@s',

  },
  active: {
    backgroundColor: color.palette.white,
    color: color.palette.blue,
    borderRadius: '10@s',
    textAlign: 'center',
  }
});
