import React, { useCallback, useEffect, useState } from "react"
import { View, ScrollView } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { RouteProp, useRoute } from "@react-navigation/native"
import { ScreenNames } from "../../../navigators/screen-names"
import { AppText } from "../../../components/app-text/AppText"
import { useStores } from "../../../models"
import RenderHtml from "react-native-render-html"
import { hexToRgbA, width } from "../../../constants/variable"
import { ScaledSheet } from "react-native-size-matters"
import FastImage from "react-native-fast-image"
import { color } from "../../../theme"
import { LoadingComponent } from "../../../components/loading"
import { NavigatorParamList } from "../../../navigators/params-list"
import { ALIGN_CENTER, FONT_MEDIUM_12, FONT_REGULAR_12, ROW } from "../../../styles/common-style"
import { images } from "../../../assets/images"
import Share from "react-native-share"
import { DOMAIN } from "@env"
import BannerProgress from "./banner-progress"
import RenderStatus from "../../../components/status/render-status"

interface Props {
  url: string
}

const BannerDetail = React.memo((props: Props) => {
  const { bannerStore } = useStores()
  const route = useRoute<RouteProp<NavigatorParamList, ScreenNames.BANNER_DETAIL>>()
  const id = route?.params?.url
  const [data, setData]: any = useState()
  const [loading, setLoading] = useState(true)
  const [scrollViewHeight, setScrollViewHeight] = useState(0)
  const [scrollViewContentHeight, setScrollViewContentHeight] = useState(0)
  const [progress, setProgress] = useState(0)
  const category = data?.category?.name ? data?.category?.name?.toUpperCase() : ''
  const options = {
    title: "",
    subject: "",
    message: ``,
    url: `${DOMAIN}tin-tuc/${id}`,
  }

  const shareQr = useCallback(async () => {
    Share.open({ ...options })
  }, [id])

  useEffect(() => {
    if (id) {
      setLoading(true)
      bannerStore.getPublicBannerDetail(id).then((response) => {
        setData({ ...response?.data, hashtags: [...response?.resultHashtag?.data] })
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return <LoadingComponent />
  }

  const updateProgressBar = (value) => {
    setProgress(
      Math.abs(
        value.nativeEvent.contentOffset.y /
        (scrollViewContentHeight - scrollViewHeight),
      ),
    )
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={"BÁO MỚI FINA"} isBlue />
      <ScrollView
        contentContainerStyle={styles.body}
        bounces={false}
        onContentSizeChange={(width, height) => {
          setScrollViewContentHeight(height)
        }}
        onScroll={updateProgressBar}
        onLayout={(event) =>
          setScrollViewHeight(event.nativeEvent.layout.height)
        }
        scrollEventThrottle={16}
      >
        <View>
          {data?.image && <FastImage source={{ uri: data?.image }} style={styles.image} resizeMode={"stretch"} />}
          <View style={styles.titleContainer}>
            <AppText value={category} style={FONT_MEDIUM_12} color={color.primary} />
            <AppText value={data?.title || ""} style={styles.title} />
            <View style={[ROW, ALIGN_CENTER]}>
              <FastImage source={images.banner_team} style={styles.team} />
              <AppText value={data?.author} style={FONT_REGULAR_12} />
            </View>
          </View>
        </View>
        <RenderHtml
          contentWidth={width}
          baseStyle={styles.description}
          source={{ html: `${data?.description ?? ""}` }}
        />
        <RenderHtml
          contentWidth={width}
          baseStyle={styles.description}
          source={{ html: `${data?.content ?? ""}` }}
        />
        {data?.hashtags &&
          <View style={styles.wrapHashtag}>
            {data?.hashtags?.map((value, index) => {
              return <RenderStatus
                key={index} style={styles.hashtag} status={`#${value?.name}`}
                backgroundColor={hexToRgbA(color.primary, 0.1)} statusColor={color.primary} />
            })}
          </View>
        }
      </ScrollView>
      <BannerProgress progress={progress} shareQr={shareQr} />
    </View>
  )
})

export default BannerDetail

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },
  body: {
    paddingBottom: "50@s",
  },
  description: {
    paddingHorizontal: "16@s",
  },
  titleContainer: {
    marginTop: "-10%",
    marginBottom: "16@s",
    padding: "20@s",
    borderRadius: "8@s",
    marginHorizontal: "16@s",
    backgroundColor: color.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  wrapHashtag: {
    marginTop: '8@s',
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: "12@s",
  },
  hashtag: {
    borderRadius: "4@s",
    marginHorizontal: '4@s'
  },
  title: {
    fontSize: "20@s",
    marginVertical: "10@s",
  },
  team: {
    width: "12@s",
    height: "16@s",
    marginRight: "6@s",
  },
  image: {
    width: "100%",
    height: "200@s",
    marginBottom: "8@s",
  },

})
