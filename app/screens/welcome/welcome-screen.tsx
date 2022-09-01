import React, { FC, useRef, useState } from "react"
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
import PaginationDot from "../../components/pagination-dot/pagination-dot"
import { useFocusEffect } from "@react-navigation/native"
import FifthScreen from "./fifth-screen"
import { width } from "../../constants/variable"
import Carousel from 'react-native-snap-carousel';
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { NavigatorParamList } from "../../navigators/params-list"

const SLIDER_DATA = [0,1,2]
export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, ScreenNames.WELCOME>> = observer(
  ({ navigation }) => {
    const ref = useRef()

    useFocusEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
    });
    const [screen, setScreen] = useState<number>(0)

    const _renderScreen = ({item, index}) => {
      switch (index){
        case 0: return <FirstScreen />;
        case 1: return <SecondScreen />;
        case 2: return <ThirdScreen />;
      }
    }
    const _nextScreen = () => {
      // @ts-ignore
      ref?.current?.snapToNext()
    }

    const _goToFifth = ()=> {
      setScreen(3)
    }

    return (
      <View testID="WelcomeScreen" style={styles.container}>
        {screen < 3 ?
          <>
            <StatusBar backgroundColor={color.background} barStyle={'dark-content'}/>
            <View style={styles.wrapSkip}>
              <AppText value={'Bỏ qua'} onPress={_goToFifth} color={color.palette.blue} style={FONT_MEDIUM_14}/>
            </View>
            <Carousel
              ref={ref}
              key={(e, i)=> e?.id + i.toString()}
              data={SLIDER_DATA}
              renderItem={_renderScreen}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={(index) => setScreen( index ) }
            />
            <PaginationDot length={SLIDER_DATA.length} activeDot={screen} dotContainer={styles.dotContainer} dotShape={'oval'}/>
            <AppButton title={'Tiếp tục '} onPress={screen < 2 ? _nextScreen : _goToFifth} containerStyle={styles.button}/>
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
    height: '90@vs',
    paddingRight: '36@ms'
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: '40@ms',
    marginBottom: '30@s',
    width: '35%'
  },
  dotContainer:{
    position: 'absolute',
    bottom: '20@s',
    left: '20@s'
  }
})
