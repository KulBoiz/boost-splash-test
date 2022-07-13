import React from 'react';
import { View, ImageBackground } from "react-native"
import { AppText } from '../../../components/app-text/AppText';
import { Moment } from "moment"
import moment from 'moment';
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { images } from '../../../assets/images';
import AppButton from "../../../components/app-button/AppButton"
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import Countdown from "./countdown"

interface Props{
  startDate?: Moment
  endDate?: Moment
}
const status = {
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
    <AppButton title={'Gia hạn ngay'} onPress={onPress} containerStyle={styles.btn}/>
  )
}
const ValidityCheck = React.memo(({ startDate, endDate }: Props) => {
  const date = 60 * 60 * 24 * 30
  const time = moment(endDate).diff(new Date).toString().slice(0, -3);

  const checkStatus = React.useCallback(() => {
    if (moment().diff(moment(endDate), 'second') < date && moment().diff(moment(endDate), 'second') !== 0){
      return status.almostExpired
    }
    if (moment().diff(moment(endDate), 'second') > date){
      return status.effective
    }
    return status.expire
  },[])

  const backgroundColorHeader = checkStatus() === status.effective ?
    color.palette.green: checkStatus() === status.expire ?
      color.palette.angry : color.palette.orange


  const extendContract = ()=> {
    //
  }
  const renderHeader = () => {
    return(
      <View style={[styles.header, {backgroundColor: backgroundColorHeader}]}>
        <AppText color={color.palette.white} value={checkStatus() === status.effective ?
          'Có hiệu lực': checkStatus() === status.expire ?
          "Hết hiệu lực" : "Gần hết hiệu lực"}/>
      </View>
    )
  }
  const renderItem = () => {
    if (checkStatus() === status.effective){
      return (
        <BackgroundImage type={'small'}>
          <AppText value={'Có hiệu lực từ ngày'} fontSize={s(12)}/>
          <AppText value={moment(startDate).format('DD/MM/YYYY')} style={styles.dateText}/>
        </BackgroundImage>
      )
    }
    if (checkStatus() === status.expire){
      return (
        <BackgroundImage type={'small'}>
          <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
            <AppText value={'Để gia hạn hợp đồng vui\nlòng chọn “Gia hạn ngay"'} fontSize={s(12)}/>
            <ExtendButton onPress={extendContract}/>
          </View>
        </BackgroundImage>
      )
    }if (checkStatus() === status.almostExpired){
      return (
        <BackgroundImage type={'big'}>
          <AppText value={'Hợp đồng sắp đến hạn'} style={MARGIN_BOTTOM_8}/>
          <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
            <Countdown  totalTime={time} />
            <ExtendButton onPress={extendContract}/>
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

  dateText: {
  fontSize: '20@ms',
    color: color.palette.orange,
    marginTop: '6@s'
  },
  header: {
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
    borderRadius: '40@s'
  }
});
