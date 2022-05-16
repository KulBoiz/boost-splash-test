import React, { useState } from "react"
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

const SLIDER_DATA = [0,1,2]
export const IntroduceScreen = React.memo(() => {
  const {insuranceStore} = useStores()
    const [screen, setScreen] = useState<number>(1)

    const _renderScreen = () => {
      switch (screen){
        case 1: return  <IntroduceItem svg={<InsuranceFirstSvg />} label={'insurance.firstLabel'} content={'insurance.firstContent'} />
        case 2: return  <IntroduceItem svg={<InsuranceSecondSvg />} label={'insurance.secondLabel'} content={'insurance.secondContent'} />
        case 3: return  <IntroduceItem svg={<InsuranceThirdSvg />} label={'insurance.thirdLabel'} content={'insurance.thirdContent'} />
      }
    }
    const _nextScreen = () => {
      setScreen((prevState) => prevState + 1)
    }

    const _goToInsurance = ()=> {
      insuranceStore.setIsFirstTime()
      navigate(ScreenNames.INSURANCE_SCREEN)
    }

    return (
      <View style={styles.container}>
            <View style={styles.wrapSkip}>
              <AppText value={'Bỏ qua'} onPress={_goToInsurance}/>
            </View>
            {_renderScreen()}
            <PaginationDot length={SLIDER_DATA.length} activeDot={screen - 1} dotContainer={styles.dotContainer} dotShape={'oval'}/>
            <AppButton title={'Tiếp tục'} onPress={screen < 3 ? _nextScreen : _goToInsurance} containerStyle={styles.button}/>
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
    height: '100@s',
    paddingRight: '20@s',
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
