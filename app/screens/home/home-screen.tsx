import React, { FC, useState } from "react"
import { BackHandler, ScrollView, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"
import { AppStackParamList } from "../../navigators/app-stack"
import { ScaledSheet } from 'react-native-size-matters'
import HeaderCard from "./components/HeaderCard"
import PaperHeader from "./components/PaperHeader"
import { paper } from "./constants"
import Finance from "./finance"
import ComingSoon from "./coming-soon"
import { useFocusEffect } from "@react-navigation/native"
import HomeBanner from "./components/home-banner"
import Insurance from "./insurance"
import { color } from "../../theme"
import { useStores } from "../../models"



export const HomeScreen: FC<StackScreenProps<AppStackParamList, ScreenNames.HOME>> = observer(
  ({ navigation }) => {
    useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
    });
    const [currentPage, setCurrentPage] = useState(1);
    // @ts-ignore

    const handleSelectPage = (value: number) => {
      setCurrentPage(value);
    };

    return (
      <View testID="WelcomeScreen" style={styles.full}>
        <HeaderCard />
        <ScrollView
          style={{ paddingTop: 20 }}
          nestedScrollEnabled
        >
          <HomeBanner />
          <View style={styles.wrapItem}>
            <PaperHeader paperData={paper} handleSelectPage={handleSelectPage} currentPage={currentPage} />
            <View style={styles.pagerView}>
              {currentPage === 1 && <Finance />}
              {currentPage === 2 && <Insurance />}
              {currentPage === 3 && <ComingSoon />}
            </View>
          </View>

          <View style={{ height: 200 }} />
        </ScrollView>
      </View>
    )
  },
)
const styles = ScaledSheet.create({
  full: {
    flex: 1,
    backgroundColor: color.palette.lightBlue
  },

  pagerView: {
    flex: 1,
    alignItems: "center",
    marginTop: '-5@s'
  },
  wrapItem: {
    marginTop: '24@s'
  }
})
