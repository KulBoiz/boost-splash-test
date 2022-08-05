import React, { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, View } from "react-native"
import { observer } from "mobx-react-lite"
import { truncateString, width } from "../../../../constants/variable"
import PaginationDot from "../../../../components/pagination-dot/pagination-dot"
import FastImage from "react-native-fast-image"
import Carousel from 'react-native-snap-carousel';
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../../models"
import { ScreenNames } from "../../../../navigators/screen-names"
import { navigate } from "../../../../navigators"
import { AppText } from "../../../../components/app-text/AppText"
import { fontFamily } from "../../../../constants/font-family"
import RenderHtml from 'react-native-render-html';


interface Props{}

const HomeBanner = observer((props: Props) => {
  // @ts-ignore
  const {bannerStore} = useStores()
  const ref = useRef()
  const [activeDot, setActiveDot] = useState(0)

  useEffect(()=> {
    bannerStore.getPublicNews()
  }, [])

  const news = bannerStore.publicNews ?? []

  const _renderItem = useCallback(({ item }) => {
    const onPress = () => {
      navigate(ScreenNames.BANNER_DETAIL, {url : item?.slug})
    }

    return (
      <Pressable style={{alignItems: 'center'}} onPress={onPress}>
        <FastImage source={{uri : item?.image}} style={styles.image} resizeMode={'stretch'}/>
        <AppText value={item?.title} style={styles.title} numberOfLines={2}/>
        <RenderHtml
          contentWidth={width}
          baseStyle={styles.html}
          source={{ html: truncateString(item?.description.trimLeft(), 85)}}
        />
      </Pressable>
    );
  },[])

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref.current}
        key={(e, i)=> e?.id + i.toString()}
        data={news}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width - 100}
        loop
        // autoplay
        onSnapToItem={(index) => setActiveDot( index ) }
      />
      {/* <PaginationDot length={news?.length} activeDot={activeDot} dotShape={'oval'} /> */}
    </View>
  )
});

export default HomeBanner;

const styles = ScaledSheet.create({
  container: {},
  image:{
    width: '250@s',
    height: '160@s',
    borderRadius: '8@s'
  },
  title: {
    fontSize: '15@ms',
    fontFamily: fontFamily.bold,
    marginVertical: '8@s',
    marginHorizontal: '12@s'
  },
  description: {
    marginHorizontal: '12@s',
    fontSize: '12@ms',
  },
  html: {
    marginHorizontal: '12@s',
    fontSize: '12@ms',
    color: '#777777'
  }
});
