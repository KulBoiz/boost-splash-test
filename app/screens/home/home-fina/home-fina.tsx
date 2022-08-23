import React, { useEffect, useState } from "react"
import { View, ScrollView } from "react-native"
import TabSelect from "../components/tab-select"
import FinanceTab from "./finance-tab"
import { color } from "../../../theme"
import BottomView from "../../../components/bottom-view"
import { Header } from "../header"
import { isIphoneX } from "react-native-iphone-x-helper"
import { s, ScaledSheet } from "react-native-size-matters"
import InsuranceTab from "./insurance-tab"
import InDeveloping from "../../../components/in-developing"

interface Props { }

const HomeFina = React.memo((props: Props) => {
  const [index, setIndex] = useState(0)

  return (
    <View style={styles.container}>
      <Header>
         <TabSelect {...{ index, setIndex }} />
      </Header>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {index === 0 && <FinanceTab />}
        {index === 1 && <InsuranceTab />}
        {index === 2 &&
          <View style={{flex:1, paddingTop: s(120)}}>
            <InDeveloping notShowHeader/>
          </View>
        }
        <BottomView height={100} />
      </ScrollView>
    </View>
  )
});

export default HomeFina;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background

  },
  scrollView: {
    marginTop: isIphoneX() ? "175@s" : "155@s",
  },
});
