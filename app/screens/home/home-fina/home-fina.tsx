import React from "react"
import { ScrollView, View } from "react-native"
import FinanceTab from "./finance-tab"
import { color } from "../../../theme"
import { hasNotch } from "react-native-device-info"
import { ScaledSheet } from "react-native-size-matters"


interface Props {
}

const HomeFina = React.memo((props: Props) => {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
       <FinanceTab />
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
    marginTop: hasNotch() ? "150@s" : "140@s",
  },
})
