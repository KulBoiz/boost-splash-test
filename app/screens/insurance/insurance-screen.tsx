import React  from "react"
import { View } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"

import {width} from "../../constants/variable"
import { color } from "../../theme"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { useRoute } from "@react-navigation/native"
import Product from "../loan/product"
import RecordsManagement from "../loan/records-management"

interface Props{}

const renderScene = SceneMap({
  second: Product,
  third : RecordsManagement,
});

const InsuranceScreen = React.memo((props: Props) => {
  const route = useRoute()
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'second', title: 'Sản phẩm' },
    { key: 'third', title: 'Quản lí hồ sơ' },
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
      <AppHeader headerTx={"header.insurance" } isBlue/>
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

export default InsuranceScreen;

const styles = ScaledSheet.create({
  container: {backgroundColor: color.palette.blue, flex: 1},
  tab:{ backgroundColor: 'white', borderTopLeftRadius: '8@s', borderTopRightRadius: '8@s' },
  indicatorStyle:{ backgroundColor: color.palette.blue, width: '65@ms', marginLeft: '32.5@ms' }

});
