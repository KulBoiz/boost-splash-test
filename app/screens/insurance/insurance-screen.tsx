import { RouteProp, StackActions, useNavigation, useRoute } from "@react-navigation/native"
import React from "react"
import { Pressable, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import AppHeader from "../../components/app-header/AppHeader"
import { AppText } from "../../components/app-text/AppText"
import { width } from "../../constants/variable"
import { useStores } from "../../models"
import { navigate, NavigatorParamList } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { color } from "../../theme"
import BuyInsurance from "./buy-insurance"
import BuyRecords from "./components/buy-records"

interface Props { }

const renderScene = SceneMap({
  first: BuyInsurance,
  second: BuyRecords,
});

const InsuranceScreen = React.memo((props: Props) => {
  const route = useRoute<RouteProp<NavigatorParamList, ScreenNames.INSURANCE_SCREEN>>()
  const id = route?.params?.id
  const navigation = useNavigation()
  const [index, setIndex] = React.useState(id ?? 0);
  const [routes] = React.useState([
    { key: 'first', title: 'Mua BH' },
    { key: 'second', title: 'Giao dịch' },
  ]);
  // @ts-ignore
  const { productStore } = useStores();

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
      <AppHeader headerTx={"header.insurance"} isBlue onLeftPress={() => navigate(ScreenNames.HOME)} renderRightIcon={renderRightIcon()} />
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

export default InsuranceScreen;

const styles = ScaledSheet.create({
  container: { backgroundColor: color.palette.blue, flex: 1 },
  tab: { backgroundColor: 'white', borderTopLeftRadius: '8@s', borderTopRightRadius: '8@s' },
  indicatorStyle: { backgroundColor: color.palette.blue, width: '65@ms', marginLeft: '65@ms' },
  wrapRightIcon: {
    width: '18@s',
    height: '18@s',
    borderRadius: '6@s',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.background
  },
});
function useStore(): { productStore: any } {
  throw new Error("Function not implemented.")
}

