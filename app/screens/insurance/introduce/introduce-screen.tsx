import React, { useRef, useState } from "react"
import { View } from "react-native"
import {ScaledSheet} from 'react-native-size-matters'
import PaginationDot from "../../../components/pagination-dot/pagination-dot"
import AppButton from "../../../components/app-button/AppButton"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { InsuranceFirstSvg, InsuranceSecondSvg, InsuranceThirdSvg } from "../../../assets/svgs"
import IntroduceItem from "./components/IntroduceItem"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"
import { useStores } from "../../../models"
import { width } from "../../../constants/variable"
import Carousel from 'react-native-snap-carousel';
import { FONT_MEDIUM_14 } from "../../../styles/common-style"

const SLIDER_DATA = [0,1,2]
export const IntroduceScreen = React.memo(() => {
  const {insuranceStore} = useStores()
  const ref = useRef()
  const [screen, setScreen] = useState<number>(0)

    const _renderScreen = ({item, index}) => {
      switch (index){
        case 0: return  <IntroduceItem svg={<InsuranceFirstSvg />} label={'insurance.firstLabel'} content={'insurance.firstContent'} />
        case 1: return  <IntroduceItem svg={<InsuranceSecondSvg />} label={'insurance.secondLabel'} content={'insurance.secondContent'} />
        case 2: return  <IntroduceItem svg={<InsuranceThirdSvg />} label={'insurance.thirdLabel'} content={'insurance.thirdContent'} />
      }
    }
    const _nextScreen = () => {
      // @ts-ignore
      ref?.current?.snapToNext()
    }

    const _goToInsurance = ()=> {
      insuranceStore.setIsFirstTime()
      navigate(ScreenNames.INSURANCE_SCREEN)
    }

    return (
      <View style={styles.container}>
            <View style={styles.wrapSkip}>
              <AppText value={'Bỏ qua'} onPress={_goToInsurance} style={FONT_MEDIUM_14} color={color.palette.blue}/>
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
            <AppButton title={'Tiếp tục'} onPress={screen < 2 ? _nextScreen : _goToInsurance} containerStyle={styles.button}/>
      </View>
    )
})

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  wrapSkip:{
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: '90@vs',
    paddingRight: '36@ms',
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
