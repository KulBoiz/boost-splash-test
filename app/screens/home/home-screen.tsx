import React, { FC, useRef, useState } from "react"
import { Animated, ScrollView, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"
import { AppStackParamList } from "../../navigators/app-stack"
import {ScaledSheet} from 'react-native-size-matters'
import { AppText } from "../../components/app-text/AppText"
import HeaderCard from "./components/HeaderCard"
import Carousel from 'react-native-snap-carousel';
import { width } from "../../constants/variable"
import FastImage from "react-native-fast-image"
import PaginationDot from "../../components/pagination-dot/pagination-dot"
import PaperHeader from "./components/PaperHeader"
import { images } from "../../assets/images"
import { color } from "../../theme"
import { TxKeyPath } from "../../i18n"

const data = [0,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,4,2,2,4,7,9,12,3,41,23]
const carousel = [
  {
    url: 'https://images.pexels.com/photos/4835429/pexels-photo-4835429.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  },
  {url: 'https://images.pexels.com/photos/8110956/pexels-photo-8110956.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'},
  {url: 'https://images.pexels.com/photos/7120424/pexels-photo-7120424.png?auto=compress&cs=tinysrgb&dpr=2&w=500'}
]

const paper = [
  {
    key: 1,
    title: 'home.finance.finance' as TxKeyPath,
    image: images.bank,
    background: color.palette.orange
  },{
    key: 2,
    title: 'home.insurance.insurance' as TxKeyPath,
    image: images.insurance,
    background: color.palette.blue

  },{
    key: 3,
    title: 'home.invest.invest' as TxKeyPath,
    image: images.invest,
    background: color.palette.green

  },
]
export const HomeScreen: FC<StackScreenProps<AppStackParamList, ScreenNames.HOME>> = observer(
  ({ navigation }) => {
    // const nextScreen = () => navigation.navigate(ScreenNames.HOME)
    const animatedHeaderValue = new Animated.Value(0)
    const ref = useRef()
    const [activeDot, setActiveDot] = useState(1)
    const _renderItem = ({item, index}) => {
      return (
        <View style={{alignItems: 'center'}}>
          <FastImage source={{uri : item.url}} style={styles.image}/>
        </View>
      );
    }
    return (
      <View testID="WelcomeScreen" style={styles.full}>
        <HeaderCard animatedValue={animatedHeaderValue} />
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
              {nativeEvent : {contentOffset: {y : animatedHeaderValue}}}],
            {useNativeDriver: false},
          )}
        >
          <Carousel
            ref={ref.current}
            key={(e, i)=> i.toString()}
            data={carousel}
            renderItem={_renderItem}
            sliderWidth={width}
            itemWidth={width}
            loop
            autoplay
            onSnapToItem={(index) => setActiveDot( index ) }
          />
          <PaginationDot length={carousel.length} activeDot={activeDot} />

          <PaperHeader paperData={paper} handleSelectPage={()=>{}} currentPage={1}/>
          {data.map((e, i)=> (
            <AppText key={i} value={e} style={{marginVertical: 20}}/>
          ))}
        </ScrollView>
      </View>
    )
  },
)
const styles = ScaledSheet.create({
  full: {flex: 1},
  image:{
    width: '305@s',
    height: '170@s',
    borderRadius: '8@s'
  }

})
