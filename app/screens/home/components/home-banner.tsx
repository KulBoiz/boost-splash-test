import React, { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, View } from "react-native"
import { observer } from "mobx-react-lite"
import { width } from "../../../constants/variable"
import PaginationDot from "../../../components/pagination-dot/pagination-dot"
import FastImage from "react-native-fast-image"
import Carousel from 'react-native-snap-carousel';
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"


interface Props{}

const HomeBanner = observer((props: Props) => {
  const {bannerStore} = useStores()
  const ref = useRef()
  const [activeDot, setActiveDot] = useState(0)

  useEffect(()=> {
    bannerStore.getPublicBanners()
  },[])

  const banners = bannerStore.publicBanners ?? []
  const _renderItem = useCallback(({item}) => {
    return (
      <Pressable style={{alignItems: 'center'}} onPress={()=> navigate(ScreenNames.BANNER_DETAIL, {url : item?.link})}>
        <FastImage source={{uri : item?.mobileImage?.url}} style={styles.image}/>
      </Pressable>
    );
  },[])

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref.current}
        key={(e, i)=> e?.id + i.toString()}
        data={banners}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width}
        loop
        autoplay
        onSnapToItem={(index) => setActiveDot( index ) }
      />
      <PaginationDot length={banners?.length} activeDot={activeDot} dotShape={'oval'} />
    </View>
  )
});

export default HomeBanner;

const styles = ScaledSheet.create({
    container: {},
  image:{
    width: '305@s',
    height: '170@s',
    borderRadius: '8@s'
  },
});
