import React, { FC, useState } from "react"
import { Animated, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"
import {ScaledSheet} from 'react-native-size-matters'
import FirstScreen from "./first-screen"
import SecondScreen from "./second-screen"
import ThirdScreen from "./third-screen"
import AppButton from "../../components/AppButton/AppButton"
import { color } from "../../theme"
import { AppText } from "../../components/AppText/AppText"
import FourthScreen from "./fourth-screen"
import { AuthStackParamList } from "../../navigators/auth-stack"
import { Pagination } from 'react-native-snap-carousel';
import PaginationDot from "../../components/pagination-dot/pagination-dot"

const SLIDER_DATA = [0,1,2,3]
export const WelcomeScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.WELCOME>> = observer(
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
    }

    const _preScreen = () => {
      setScreen((prevState) => prevState - 1)
    }

    const _goToFifth = ()=> {
      navigation.navigate(ScreenNames.FIFTH_SCREEN)
    }
    return (
      <View testID="WelcomeScreen" style={styles.container}>
        <View style={styles.wrapSkip}>
          <AppText value={'SKIP'} onPress={_preScreen}/>
        </View>
        {_renderScreen()}
        <PaginationDot length={SLIDER_DATA.length} activeDot={screen - 1} dotContainer={styles.dotContainer}/>
        <AppButton title={'Tiếp theo'} onPress={screen < 4 ? _nextScreen : _goToFifth} containerStyle={styles.button}/>
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
  },
  dotContainer:{
    position: 'absolute',
    bottom: '20@s',
    left: '10@s'
  }
})
