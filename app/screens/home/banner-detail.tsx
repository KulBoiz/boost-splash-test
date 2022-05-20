import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from "react-native-webview"
import AppHeader from "../../components/app-header/AppHeader"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"

interface Props{
  url: string
}

const BannerDetail = React.memo((props: Props) => {
  const route = useRoute<RouteProp<NavigatorParamList, ScreenNames.BANNER_DETAIL>>()
  const url = route?.params?.url
  console.log(url)
  return (
    <View style={styles.container}>
      <AppHeader headerText={'banner detail'}/>
      <WebView
        source={{uri: url}}
      />
    </View>
  )
});

export default BannerDetail;

const styles = StyleSheet.create({
    container: {flex:1},
});
