import React from 'react';
import { View } from 'react-native';
import AppButton from "../../../components/app-button/AppButton"
import { AppText } from "../../../components/app-text/AppText"
import {
  CONTAINER_PADDING,
  FONT_BOLD_14,
  FONT_BOLD_24,
  MARGIN_BOTTOM_16,
} from "../../../styles/common-style"
import { color } from "../../../theme"
import { CheckProfileNoteSvg } from "../../../assets/svgs"
import { ScaledSheet } from "react-native-size-matters"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"

interface Props{
  preStep(): void
}

const IntroduceStepTwo = React.memo(({ preStep }: Props) => {
  const goToFinance = () => {
    navigate(ScreenNames.FINANCE, {index: 2})
  }
  return (
    <View style={[styles.container, CONTAINER_PADDING]}>
        <View style={styles.item}>
          <CheckProfileNoteSvg />
          <AppText value={'Nhận hồ sơ thành công'} style={[FONT_BOLD_24, styles.text]}/>
          <AppText value={'Cảm ơn quý khách!'} style={[FONT_BOLD_24, styles.textThanks]}/>
        </View>
      <AppButton title={'Tạo thêm yêu cầu tư vấn'} onPress={preStep} containerStyle={MARGIN_BOTTOM_16}/>
      <AppText value={'Theo dõi hồ sơ'} underline style={FONT_BOLD_14} color={color.palette.blue} onPress={goToFinance}/>
    </View>
  )
});

export default IntroduceStepTwo;

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.palette.lightBlue,
      flex: 1,
      paddingBottom: 30,
      alignItems: "center",

    },
  text: {
      color: color.palette.blue,
      marginTop: '40@s'
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
