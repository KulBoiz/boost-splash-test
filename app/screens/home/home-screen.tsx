import React, { FC, useRef, useState } from "react"
import { Animated, BackHandler, ScrollView, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"
import { AppStackParamList } from "../../navigators/app-stack"
import {ScaledSheet} from 'react-native-size-matters'
import HeaderCard from "./components/HeaderCard"
import PaperHeader from "./components/PaperHeader"
import { paper } from "./constants"
import Finance from "./finance"
import ComingSoon from "./coming-soon"
import { useFocusEffect } from "@react-navigation/native"
import HomeBanner from "./components/home-banner"



export const HomeScreen: FC<StackScreenProps<AppStackParamList, ScreenNames.HOME>> = observer(
  ({ navigation }) => {
    useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
    });
    const animatedHeaderValue = new Animated.Value(0)
    const [currentPage, setCurrentPage] = useState(1);

    const handleSelectPage = (value: number) => {
      setCurrentPage(value);
    };

    return (
      <View testID="WelcomeScreen" style={styles.full}>
        <HeaderCard animatedValue={animatedHeaderValue} />
        <ScrollView
          style={{paddingTop: 50}}
          nestedScrollEnabled
          scrollEventThrottle={16}
          onScroll={Animated.event([
              {nativeEvent : {contentOffset: {y : animatedHeaderValue}}}],
            {useNativeDriver: false},
          )}
        >
          <HomeBanner />
          <View style={styles.wrapItem}>
            <PaperHeader paperData={paper} handleSelectPage={handleSelectPage} currentPage={currentPage}/>
            <View style={styles.pagerView}>
              {currentPage === 1 ?
                <Finance />
                :
                <ComingSoon />
              }
            </View>
          </View>

          <View style={{height: 200}}/>
        </ScrollView>
      </View>
    )
  },
)
const styles = ScaledSheet.create({
  full: {flex: 1},

  pagerView: {
    flex: 1,
    alignItems: "center",
    marginTop: '-5@s'
  },
  wrapItem: {
    marginTop: '24@s'
  }
})
