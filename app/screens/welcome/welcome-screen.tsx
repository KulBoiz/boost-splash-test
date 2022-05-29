import React, { FC, useState } from "react"
import { BackHandler, StatusBar, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"
import {ScaledSheet} from 'react-native-size-matters'
import FirstScreen from "./first-screen"
import SecondScreen from "./second-screen"
import ThirdScreen from "./third-screen"
import AppButton from "../../components/app-button/AppButton"
import { color } from "../../theme"
import { AppText } from "../../components/app-text/AppText"
import FourthScreen from "./fourth-screen"
import { AuthStackParamList } from "../../navigators/auth-stack"
import PaginationDot from "../../components/pagination-dot/pagination-dot"
import { useFocusEffect } from "@react-navigation/native"
import FifthScreen from "./fifth-screen"

const SLIDER_DATA = [0,1,2]
export const WelcomeScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.WELCOME>> = observer(
  ({ navigation }) => {
    useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
    });
    const [screen, setScreen] = useState<number>(1)

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

    const _goToFifth = ()=> {
      setScreen(4)
    }
    return (
      <View testID="WelcomeScreen" style={styles.container}>
        {screen < 4 ?
          <>
            <StatusBar backgroundColor={color.background} barStyle={'dark-content'}/>
            <View style={styles.wrapSkip}>
              <AppText value={'SKIP'} onPress={_goToFifth}/>
            </View>
            {_renderScreen()}
            <PaginationDot length={SLIDER_DATA.length} activeDot={screen - 1} dotContainer={styles.dotContainer} dotShape={'oval'}/>
            <AppButton title={'Tiếp theo'} onPress={screen < 4 ? _nextScreen : _goToFifth} containerStyle={styles.button}/>
          </>
          : <FifthScreen />
        }
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
