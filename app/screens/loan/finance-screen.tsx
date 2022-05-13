import React  from "react"
import { View } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import Introduce from "./introduce"
import Product from "./product"
import RecordsManagement from "./records-management"
import {width} from "../../constants/variable"
import { color } from "../../theme"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../navigators"

interface Props{}

const renderScene = SceneMap({
  first: Introduce,
  second: Product,
  third : RecordsManagement,
});

const FinanceScreen = React.memo((props: Props) => {
  const route = useRoute<RouteProp<NavigatorParamList>>()
  const param = route?.params?.index ?? 0
  const [index, setIndex] = React.useState(param);
  const [routes] = React.useState([
    { key: 'first', title: 'Giới thiệu ' },
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
      <AppHeader headerTx={"header.finance" } isBlue/>
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

export default FinanceScreen;

const styles = ScaledSheet.create({
    container: {backgroundColor: color.palette.blue, flex: 1},
  tab:{ backgroundColor: 'white', borderTopLeftRadius: '8@s', borderTopRightRadius: '8@s' },
  indicatorStyle:{ backgroundColor: color.palette.blue, width: '65@ms', marginLeft: '32.5@ms' }

});
