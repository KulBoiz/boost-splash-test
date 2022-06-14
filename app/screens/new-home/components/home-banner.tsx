import React, { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, View } from "react-native"
import { observer } from "mobx-react-lite"
import { width } from "../../../constants/variable"
import PaginationDot from "../../../components/pagination-dot/pagination-dot"
import FastImage from "react-native-fast-image"
import Carousel from 'react-native-snap-carousel';
import { ms, ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../models"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"

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
        itemWidth={width - ms(105)}
        inactiveSlideScale={1}
        activeSlideAlignment={'start'}
        onSnapToItem={(index) => setActiveDot( index ) }
      />
      <PaginationDot length={news?.length} activeDot={activeDot} dotShape={'oval'} />
    </View>
  )
});

export default HomeBanner;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '24@ms'
  },
  image:{
    width: '240@s',
    height: '140@s',
    borderRadius: '8@s'
  },
});
