import React, { useState } from "react"
import { View, StyleSheet, ScrollView } from "react-native"
import TabSelect from "../components/tab-select"
import HomeFinance from "./home-finance"
import { color } from "../../../theme"
import BottomView from "../../../components/bottom-view"

interface Props{}

const HomeFina = React.memo((props: Props) => {
  const [index, setIndex] = useState(0)
  return (
    <ScrollView style={styles.container}>
      <TabSelect {...{index, setIndex}} />
       <HomeFinance />
      <BottomView height={100} />
    </ScrollView>
  )
});

export default HomeFina;

const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
      flex:1
    },
});
