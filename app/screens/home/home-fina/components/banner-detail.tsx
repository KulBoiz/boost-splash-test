import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import AppHeader from "../../../../components/app-header/AppHeader"
import { RouteProp, useRoute } from "@react-navigation/native"
import { ScreenNames } from "../../../../navigators/screen-names"
import { AppText } from '../../../../components/app-text/AppText';
import { useStores } from '../../../../models';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';
import { width } from "../../../../constants/variable";
import { s, ScaledSheet } from "react-native-size-matters"
import FastImage from 'react-native-fast-image';
import { color } from '../../../../theme';
import { LoadingComponent } from '../../../../components/loading';
import { NavigatorParamList } from "../../../../navigators/params-list"


interface Props {
  url: string
}

const BannerDetail = React.memo((props: Props) => {
  // @ts-ignore
  const { bannerStore } = useStores()
  const route = useRoute<RouteProp<NavigatorParamList, ScreenNames.BANNER_DETAIL>>()
  const id = route?.params?.url
  const [data, setData]: any = useState()
  const [loading, setLoading] =  useState(true)

  useEffect(() => {
    if (id) {
      setLoading(true)
      bannerStore.getPublicBannerDetail(id).then((response) => {
        setData(response?.data)
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return <LoadingComponent />
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={''}/>
      <ScrollView contentContainerStyle={styles.webContainer}>
        <View>
          <AppText value={data?.title || ''} style={styles.title} />
          <View style={styles.time}>
            <AppText value={`${moment(data?.updatedAt).format('YYYY-MM-DD HH:mm')} - `} />
            <AppText value={data?.author || ''}/>
          </View>

          {data?.image && <FastImage source={{ uri: data?.image }} style={styles.image} resizeMode={'stretch'}/>}
          <RenderHtml
            contentWidth={width}
            source={{ html: `${data?.description ?? ''}` }}
          />
          {/* <AppText value={data?.description} /> */}
        </View>

        <RenderHtml
          contentWidth={width}
          source={{ html: `${data?.content ?? ''}` }}
        />
      </ScrollView>
    </View>
  )
});

export default BannerDetail;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: color.palette.white,
  },
  webContainer: {
    paddingVertical: '8@s'
  },
  title: {
    fontSize: '16@s',
    color: color.palette.blue,
  },
  time: {
    marginVertical: '8@s',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: width - s(32),
    marginBottom: '8@s',
  }
});
