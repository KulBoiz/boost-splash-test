import React, { useRef, useState } from "react"
import { View, ScrollView, Animated, StatusBar } from "react-native"
import Header from "./components/header"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import HomeFinance from "./home-finance"
import BottomView from "../../components/bottom-view"
import ComingSoon from "../home/home-fina/coming-soon"
import HomeInsurance from "./home-insurance"
import { isAndroid } from "../../constants/variable"
import { isIphoneX } from "react-native-iphone-x-helper"

interface Props{}

const SCROLL_SNAPPING_THRESHOLD = 16;

const NewHome = React.memo((props: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');
  const [index, setIndex] = useState(0)


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#429BFB'} barStyle={'light-content'}/>
      <Header {...{index, setIndex, animatedValue}}/>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        ref={scrollViewRef}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          scrollDirection.current =
            offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
          lastOffsetY.current = offsetY;
          animatedValue.setValue(offsetY);
        }}
        // onScrollEndDrag={e => {
        //   if (isAndroid){
        //     const offsetY = e.nativeEvent.contentOffset.y;
        //     if (offsetY > SCROLL_SNAPPING_THRESHOLD) {
        //       scrollViewRef.current?.scrollTo({
        //         y: scrollDirection.current === 'down' ? 100 : 0,
        //         animated: true,
        //       });
        //     }
        //   }
        // }}
        scrollEventThrottle={16}>
        {index === 0 && <HomeFinance />}
        {index === 1 && <HomeInsurance />}
        {index === 2 && <ComingSoon />}
        <BottomView height={100}/>
      </ScrollView>

    </View>
  )
});

export default NewHome;

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: color.background
  },
  scrollView:{
    paddingTop: isIphoneX() ? '240@s' : '225@s',
  }
});
