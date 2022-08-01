import React, { useState } from "react"
import { View, ImageBackground } from "react-native"
import { AppText } from '../../../components/app-text/AppText';
import moment, { Moment } from 'moment';
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { images } from '../../../assets/images';
import AppButton from "../../../components/app-button/AppButton"
import {
  ALIGN_CENTER, FONT_BOLD_12,
  FONT_BOLD_14,
  FONT_MEDIUM_12,
  MARGIN_BOTTOM_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../styles/common-style"
import Countdown from "./countdown"
import { FastImage } from "../../../components/fast-image/fast-image"
import { WarningSvg } from "../../../assets/svgs"
import { fontFamily } from "../../../constants/font-family"
import { getTimeLeft } from "../constants"

interface Props{
  startDate?: Moment
  endDate?: Moment
  config?: any
}
export const status = {
  effective: "effective",
  expire: "expire",
  almostExpired: "almost_expired"
}

const BackgroundImage = ({ type, children }: {type: 'small'| 'big', children: React.ReactNode}) => {
  return (
    <View style={type === 'small' ? styles.smallContainer : styles.bigContainer}>
      <ImageBackground source={images.insurance_detail} style={styles.background}>
        {children}
      </ImageBackground>
    </View>
  )
}
const ExtendButton = ({onPress}: {onPress(): void}) => {
  return(
    <AppButton title={'Gia hạn ngay'} onPress={onPress} containerStyle={styles.btn} titleStyle={FONT_BOLD_14}/>
  )
}
const ValidityCheck = React.memo(({ startDate, endDate, config }: Props) => {
  const [isExpired, setIsExpired] = useState(false)
  const time = moment(endDate).diff(new Date()).toString().slice(0, -3);

  const checkStatus = React.useCallback(() => {
    if ((Number(moment(endDate).format('x')) - +moment(new Date()).format('x')) > getTimeLeft(config?.countdown, config?.typeCountdown)){
      return status.effective
    }
    if ((Number(moment(endDate).format('x')) - +moment(new Date()).format('x') ) < getTimeLeft(config?.countdown, config?.typeCountdown) && moment().diff(moment(endDate), 'second') !== 0){
      return status.almostExpired
    }
    return status.expire
  },[])

  const backgroundColorHeader = checkStatus() === status.effective ?
    color.palette.green: checkStatus() === status.expire ?
      color.palette.angry : color.palette.orange

  const image = checkStatus() === status.effective ?
    images.circle_tick: checkStatus() === status.expire ?
      images.circle_x : images.circle_clock


  const extendContract = ()=> {
    //
  }
  const handleExpired = () => {
    setIsExpired(true)
  }
  const renderHeader = () => {
    return(
      <View style={[styles.header, {backgroundColor: backgroundColorHeader}]}>
        <FastImage source={image} style={styles.icon}/>
        <AppText color={color.palette.white} value={checkStatus() === status.effective ?
          'Có hiệu lực': (checkStatus() === status.expire || isExpired) ?
          "Hết hiệu lực" : "Gần hết hiệu lực"} style={FONT_MEDIUM_12} />
      </View>
    )
  }
  const renderItem = () => {
    if (checkStatus() === status.effective){
      return (
        <BackgroundImage type={'small'}>
          <View style={ALIGN_CENTER}>
            <AppText value={'Có hiệu lực từ ngày'} fontSize={s(12)}/>
            <AppText value={moment(startDate).format('DD/MM/YYYY')} style={styles.dateText}/>
          </View>
        </BackgroundImage>
      )
    }
    if (checkStatus() === status.expire || isExpired){
      return (
        <BackgroundImage type={'small'}>
          <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
            <View style={[ROW, ALIGN_CENTER]}>
              <WarningSvg style={{marginRight: s(8)}}/>
              <AppText fontSize={s(12)}>
                Để gia hạn hợp đồng vui{'\n'}lòng chọn
                <AppText value={' “Gia hạn ngay"'} style={FONT_BOLD_12}/>
              </AppText>
            </View>
            {/* <ExtendButton onPress={extendContract}/> */}
          </View>
        </BackgroundImage>
      )
    }if (checkStatus() === status.almostExpired){
      return (
        <BackgroundImage type={'big'}>
          <AppText value={'Hợp đồng sắp đến hạn'} style={MARGIN_BOTTOM_8}/>
          <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
            <Countdown totalTime={time} callback={handleExpired}/>
            {/* <ExtendButton onPress={extendContract}/> */}
          </View>
        </BackgroundImage>
      )
    }
  }
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderItem()}
    </View>
  )
});

export default ValidityCheck;

const styles = ScaledSheet.create({
  container: {},
  icon:{
    width: '20@s',
    height: '20@s',
    marginRight: '8@s'
  },
  dateText: {
    fontSize: '20@ms',
    color: color.palette.orange,
    fontFamily: fontFamily.bold,
    marginTop: '6@s'
  },
  header: {
    flexDirection: 'row',
    height: '30@s',
    alignItems: "center",
    justifyContent: "center"
  },
  smallContainer: {
    height: '70@s'
  },
  bigContainer: {
    height: '100@s'
  },
  background: {
    flex: 1,
    paddingHorizontal: '16@s',
    justifyContent: "center"
  },
  btn: {
    width: '150@ms',
    height: '44@s',
    borderRadius: '40@s'
  }
});
