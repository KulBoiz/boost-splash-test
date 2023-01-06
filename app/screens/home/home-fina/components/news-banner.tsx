import React, { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { hexToRgbA, width } from "../../../../constants/variable"
import FastImage from "react-native-fast-image"
import Carousel from "react-native-snap-carousel"
import { ms, ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../../models"
import { ScreenNames } from "../../../../navigators/screen-names"
import { navigate } from "../../../../navigators"
import { AppText } from "../../../../components/app-text/AppText"
import { fontFamily } from "../../../../constants/font-family"
import { color } from "../../../../theme"


interface Props {
  label?: string
  style?: ViewStyle | any
}

const HomeBanner = observer((props: Props) => {
  const { label, style } = props
  const { bannerStore } = useStores()
  const ref = useRef()
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    bannerStore.getPublicNews()
  }, [])

  const news = bannerStore.publicNews ?? []

  const onPressAll = React.useCallback(() => {
    navigate(ScreenNames.BANNER_LIST)
  },[])

  const _renderItem = useCallback(({ item }) => {
    const onPress = () => {
      navigate(ScreenNames.BANNER_DETAIL, { url: item?.slug })
    }

    return (
      <Pressable style={styles.container} onPress={onPress}>
        <FastImage source={{ uri: item?.image ?? "" }} style={styles.image} resizeMode={"stretch"} />
        <View style={styles.blurContainer}>
          <AppText value={item?.title} numberOfLines={1} style={styles.bannerText} />
          <AppText value={`${activeDot+1}/${news.length}`} fontSize={ms(10)} color={color.text} />
        </View>
      </Pressable>
    )
  }, [activeDot])

  return (
    <View style={style}>
      <View style={styles.wrapLabel}>
        {!!label && <AppText value={label} style={styles.label} />}
        <AppText value={'Tất cả'} onPress={onPressAll} color={color.primary}/>
      </View>
      <View style={styles.bannerContainer}>
        <Carousel
          ref={ref.current}
          key={(e, i) => e?.id + i.toString()}
          data={news}
          renderItem={_renderItem}
          sliderWidth={width - ms(50)}
          itemWidth={width - ms(50)}
          loop
          inactiveSlideScale={1}
          autoplay
          onSnapToItem={(index) => setActiveDot(index)}
        />
      </View>
    </View>
  )
})

export default HomeBanner

const styles = ScaledSheet.create({
  container: {
    marginBottom: 2,
  },
  wrapLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: '16@s',
    marginBottom: "12@s"
  },
  bannerContainer: {
    paddingHorizontal: "25@ms",
  },
  blurContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    backgroundColor: hexToRgbA(color.palette.black, 0.5),
    height: "20@s",
    alignItems: "center",
    paddingHorizontal: "8@s",
    borderBottomLeftRadius: '4@s',
    borderBottomRightRadius: '4@s'
  },
  image: {
    height: "174@ms",
    borderRadius: "4@s",
  },
  bannerText: {
    color: color.text,
    fontSize: "10@ms",
    textTransform: "uppercase",
    width: "90%",
  },
  label: {
    fontSize: "14@ms",
    fontFamily: fontFamily.semiBold,
    color: "rgba(0, 0, 0, 0.85)",
  },
})
