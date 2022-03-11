import React, { FC, useState } from "react"
import { View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { NavigatorParamList } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import {ScaledSheet} from 'react-native-size-matters'
import FirstScreen from "./first-screen"
import SecondScreen from "./second-screen"
import ThirdScreen from "./third-screen"
import AppButton from "../../components/AppButton/AppButton"
import { color } from "../../theme"
import { AppText } from "../../components/AppText/AppText"
import FourthScreen from "./fourth-screen"

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, ScreenNames.WELCOME>> = observer(
  ({ navigation }) => {
    const [screen, setScreen] = useState<number>(1)
    // const nextScreen = () => navigation.navigate("demo")

    const _renderScreen = () => {
      switch (screen){
        case 1: return <FirstScreen />;
        case 2: return <SecondScreen />;
        case 3: return <ThirdScreen />;
        case 4: return <FourthScreen />;
      }
    }
    const _nextScreen = () => {
     setScreen((prevState) => prevState + 1)
      if (screen === 4){
        navigation.navigate(ScreenNames.FIFTH_SCREEN)
      }
    }
    const _preScreen = () => {
      setScreen((prevState) => prevState - 1)
    }

    return (
      <View testID="WelcomeScreen" style={styles.container}>
        <View style={styles.wrapSkip}>
          <AppText value={'SKIP'} onPress={_preScreen}/>
        </View>
        {_renderScreen()}
        <AppButton title={'Tiếp theo'} onPress={_nextScreen} containerStyle={styles.button}/>
      </View>
    )
  },
)
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  wrapSkip:{
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '100@s',
    paddingRight: '20@s'
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: '40@s',
    marginBottom: '30@s',
    width: '40%'
  }
})
