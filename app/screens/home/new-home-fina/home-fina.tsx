import React, { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import TabSelect from "../components/tab-select"
import HomeFinance from "./home-finance"
import { color } from "../../../theme"
import BottomView from "../../../components/bottom-view"
import { Header } from "../insurance/header"
import { isIphoneX } from "react-native-iphone-x-helper"
import { ScaledSheet } from "react-native-size-matters"

interface Props { }

const HomeFina = React.memo((props: Props) => {
  const [index, setIndex] = useState(0)
  return (
    <View style={styles.container}>
      <Header >
        <TabSelect {...{ index, setIndex }} />
      </Header>
      <ScrollView style={styles.scrollView}>
        <HomeFinance />
        <BottomView height={100} />
      </ScrollView>
    </View>
  )
});

export default HomeFina;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },

  scrollView: {
    marginTop: isIphoneX() ? "155@s" : "130@s",
  },
});
