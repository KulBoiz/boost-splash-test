import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import WebView from "react-native-webview"
import AppHeader from "../../components/app-header/AppHeader"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { AppText } from '../../components/app-text/AppText';
import { useStores } from '../../models';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { width } from "../../constants/variable";



interface Props {
  url: string
}

const BannerDetail = React.memo((props: Props) => {
  // @ts-ignore
  const { bannerStore } = useStores()
  const route = useRoute<RouteProp<NavigatorParamList, ScreenNames.BANNER_DETAIL>>()
  const id = route?.params?.url
  const [data, setData]: any = useState()

  useEffect(() => {
    if (id) {
      bannerStore.getPublicBannerDetail(id).then((response) => {
        setData(response?.data)
      })
    }
  }, [id])

  return (
    <View style={styles.container}>
      <AppHeader headerText={'banner detail'} />
      <ScrollView >
        <View>
          <AppText value={data?.title || ''} />

          <View>
            <AppText value={`${moment(data?.updatedAt).format('YYYY-MM-DD HH:mm')}`} />
            <AppText value={data?.author || ''} />
          </View>

          <AppText value={data?.description} />
        </View>

        <RenderHtml
          contentWidth={width}
          source={{ html: `${data?.content}` }}
        />
      </ScrollView>
    </View>
  )
});

export default BannerDetail;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
