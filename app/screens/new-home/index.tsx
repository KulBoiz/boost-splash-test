import React, { useRef, useState } from "react"
import { View, ScrollView, Animated } from "react-native"
import Header from "./components/header"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import HomeFinance from "./home-finance"

interface Props{}

const SCROLL_SNAPPING_THRESHOLD = 20;

const NewHome = React.memo((props: Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');
  const [index, setIndex] = useState(0)


  return (
    <>
      <Header {...{index, setIndex, animatedValue}}/>
      <ScrollView style={styles.container}
                  showsVerticalScrollIndicator={false}
                  ref={scrollViewRef}
                  onScroll={e => {
                    const offsetY = e.nativeEvent.contentOffset.y;
                    scrollDirection.current =
                      offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
                    lastOffsetY.current = offsetY;
                    animatedValue.setValue(offsetY);
                  }}
                  onScrollEndDrag={e => {
                    const offsetY = e.nativeEvent.contentOffset.y;
                    if (offsetY > SCROLL_SNAPPING_THRESHOLD) {
                      scrollViewRef.current?.scrollTo({
                        y: scrollDirection.current === 'down' ? 100 : 0,
                        animated: true,
                      });
                    }
                  }}
                  scrollEventThrottle={16}>
        <HomeFinance />
        <View style={{height: 100}}/>
      </ScrollView>
    </>
  )
});

export default NewHome;

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: color.background
  },

});
