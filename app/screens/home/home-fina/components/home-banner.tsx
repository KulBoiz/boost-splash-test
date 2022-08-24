import React, { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { truncateString, width } from "../../../../constants/variable"
import FastImage from "react-native-fast-image"
import Carousel from 'react-native-snap-carousel';
import { ms, ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../../models"
import { ScreenNames } from "../../../../navigators/screen-names"
import { navigate } from "../../../../navigators"
import { AppText } from "../../../../components/app-text/AppText"
import { fontFamily } from "../../../../constants/font-family"
import RenderHtml from 'react-native-render-html';
import { color } from "../../../../theme"


interface Props{
  type?: "big" | 'small'
  label?: string
  style?: ViewStyle | any
}

const HomeBanner = observer((props: Props) => {
  const {label, type = 'big', style} = props

  const isBigType = type ===  'big'
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
      <Pressable style={isBigType ? styles.container : styles.smallContainer} onPress={onPress}>
        <FastImage source={{uri : item?.image ?? ''}} style={isBigType ? styles.image : styles.smallImage} resizeMode={'stretch'}/>
        <View  style={isBigType && styles.contentContainer}>
          <AppText value={item?.title} style={isBigType ? styles.title : styles.smallTitle} numberOfLines={isBigType ? 1 : 2}/>
          {isBigType &&
            <RenderHtml
              contentWidth={width}
              baseStyle={styles.html}
              // source={{ html: truncateString(item?.description.trimLeft(), 85)}}
              source={{ html: truncateString(item?.description.trimRight(), 75)}}
            />
        }
        </View>
      </Pressable>
    );
  },[])

  return (
    <View style={style}>
      {!!label && <AppText value={label} style={styles.label}/>}
      <Carousel
        ref={ref.current}
        key={(e, i)=> e?.id + i.toString()}
        data={news}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={isBigType ? width - 100 : width -215}
        loop={isBigType}
        activeSlideAlignment={!isBigType ? "start"  : 'center'}
        inactiveSlideScale={1}
        containerCustomStyle={!isBigType && {marginHorizontal: ms(16)}}
        // autoplay
        onSnapToItem={(index) => setActiveDot( index ) }
      />
      {/* <PaginationDot length={news?.length} activeDot={activeDot} dotShape={'oval'} /> */}
    </View>
  )
});

export default HomeBanner;

const styles = ScaledSheet.create({
  container: {
    width: '250@s',
    marginBottom: 2
  },
  smallContainer: {
    width: '144@s',
  },
  image:{
    width: '250@s',
    height: '140@s',
    borderTopRightRadius: '8@s',
    borderTopLeftRadius: '8@s'
  },
  smallImage:{
    height: "80@s",
    width: "144@s",
    borderRadius: '8@s'
  },
  contentContainer: {
    height: '80@s',
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s',
    paddingHorizontal: '10@s',
    paddingBottom: '4@s',
    paddingTop: '8@s',
    backgroundColor: color.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  title: {
    fontSize: '15@ms',
    fontFamily: fontFamily.bold,
  },
  smallTitle: {
    fontSize: '12@ms',
    fontFamily: fontFamily.bold,
    marginTop: '12@s'
  },
  description: {
    marginHorizontal: '12@s',
    fontSize: '12@ms',
  },
  html: {
    fontSize: '12@ms',
    color: '#777777'
  },
  label: {
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    marginLeft: '16@ms',
    marginBottom: '12@s',
    color: 'rgba(0, 0, 0, 0.85)'
  },
});
