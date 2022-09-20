import React from 'react';
import { View, Pressable } from 'react-native';
import AppButton from "../../../components/app-button/AppButton"
import { AppText } from "../../../components/app-text/AppText"
import {
  CONTAINER_PADDING,
  FONT_BOLD_14,
  FONT_BOLD_24, HIT_SLOP,
  MARGIN_BOTTOM_16,
} from "../../../styles/common-style"
import { color } from "../../../theme"
import { CheckProfileNoteSvg } from "../../../assets/svgs"
import { ScaledSheet } from "react-native-size-matters"
import { ScreenNames } from "../../../navigators/screen-names"
import { StackActions, useNavigation } from "@react-navigation/native"

interface Props{
  preStep(): void
}

const IntroduceStepTwo = React.memo(({ preStep }: Props) => {
  const navigation = useNavigation()

  const goToFinance = () => {
    navigation.dispatch(StackActions.push(ScreenNames.MANAGEMENT))
    preStep()
  }

  return (
    <View style={[styles.container, CONTAINER_PADDING]}>
        <View style={styles.item}>
          <CheckProfileNoteSvg />
          <AppText value={'Nhận hồ sơ thành công'} style={[FONT_BOLD_24, styles.text]}/>
          <AppText value={'Cảm ơn quý khách!'} style={[FONT_BOLD_24, styles.textThanks]}/>
        </View>
      <AppButton title={'Tạo thêm yêu cầu tư vấn'} onPress={preStep} containerStyle={MARGIN_BOTTOM_16}/>
      <Pressable hitSlop={HIT_SLOP} style={styles.pressHeight}>
        <AppText value={'Theo dõi hồ sơ'} underline style={FONT_BOLD_14} color={color.palette.blue} onPress={goToFinance}/>
      </Pressable>
    </View>
  )
});

export default IntroduceStepTwo;

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.palette.lightBlue,
      flex: 1,
      paddingBottom: '40@s',
      alignItems: "center",
    },
  text: {
      color: color.palette.blue,
      marginTop: '30@s'
  },
  pressHeight: {
    paddingTop: '4@s',
    height: '30@s'
  },
  textThanks: {
    color: color.palette.blue,
    fontSize:"20@ms",
    marginTop: '8@s'
  },
  item:{
      flex: 1,
      alignItems: "center",
    justifyContent: "center"
  }
});
