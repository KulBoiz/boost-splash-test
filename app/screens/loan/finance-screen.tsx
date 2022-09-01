import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import SettingAuthScreen from "../../components/app-view-no-auth";
import { width } from "../../constants/variable";
import { useStores } from "../../models";
import { AppStackParamList } from "../../navigators/app-stack";
import { ScreenNames } from "../../navigators/screen-names";
import { FONT_MEDIUM_14 } from "../../styles/common-style";
import { color } from "../../theme";
import RecordsManagement from "../management/records-management";
import { observer } from "mobx-react-lite"

interface Props { }

const FinanceScreen = observer((props: Props) => {
  const {appStore} = useStores()
  const route = useRoute<RouteProp<AppStackParamList, ScreenNames.MANAGEMENT>>()
  const param = appStore.financeIndex
  const [index, setIndex] = React.useState(param);
  // @ts-ignore
  const { authStoreModel } = useStores();

  const [routes] = React.useState([
    { key: 'first', title: 'Bản thân' },
    { key: 'second', title: 'Khách hàng' },
  ]);

  const renderScene = SceneMap({
    first: !authStoreModel?.isLoggedIn ? SettingAuthScreen : () => <RecordsManagement index={index} />,
    second: !authStoreModel?.isLoggedIn ? SettingAuthScreen : () => <RecordsManagement index={index} />,
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: width }}
        renderTabBar={renderTabBar}
      />
    </View>
  )
});

export default FinanceScreen;

const styles = ScaledSheet.create({
  container: { backgroundColor: color.palette.white, flex: 1 },
  tab: { backgroundColor: 'white', borderTopLeftRadius: '8@s', borderTopRightRadius: '8@s' },
  indicatorStyle: { backgroundColor: color.palette.blue }

});
