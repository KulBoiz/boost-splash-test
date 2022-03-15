import React, { FC } from "react"
import { View} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen } from "../../components"
import { color } from "../../theme"
import { ScreenNames } from "../../navigators/screen-names"
import { AppStackParamList } from "../../navigators/app-stack"
import {ScaledSheet} from 'react-native-size-matters'

export const HomeScreen: FC<StackScreenProps<AppStackParamList, ScreenNames.HOME>> = observer(
  ({ navigation }) => {
    // const nextScreen = () => navigation.navigate(ScreenNames.HOME)

    return (
      <View testID="WelcomeScreen" style={styles.full}>
          <Header headerTx="welcome.lastLabel" style={HEADER} titleStyle={HEADER_TITLE} />
      </View>
    )
  },
)
const styles = ScaledSheet.create({
  full: {flex: 1}
})
