import React, { useState } from "react"
import { ScrollView, View } from "react-native"
import TabSelect from "../components/tab-select"
import FinanceTab from "./finance-tab"
import { color } from "../../../theme"
import { Header } from "../components/header"
import { isIphoneX } from "react-native-iphone-x-helper"
import { ScaledSheet } from "react-native-size-matters"
import InsuranceTab from "./insurance-tab"
import InvestTab from "./invest-tab"

interface Props {
}

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
        {index === 2 && <InvestTab />}
      </ScrollView>
    </View>
  )
})

export default HomeFina

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  scrollView: {
    marginTop: isIphoneX() ? "150@s" : "140@s",
  },
})
