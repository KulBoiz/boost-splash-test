import { useFocusEffect } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { BackHandler, View } from "react-native"
import { ScaledSheet } from 'react-native-size-matters'
import { color } from "../../../theme"



export const BankHomeScreen = observer(
  ({ navigation }) => {
    useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
    });
    const [currentPage, setCurrentPage] = useState(1);
    // @ts-ignore

    return (
      <View testID="WelcomeScreen" style={styles.full}>
       
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
