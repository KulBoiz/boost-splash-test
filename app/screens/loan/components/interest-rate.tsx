import React from 'react';
import { View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import { ALIGN_CENTER } from "../../../styles/common-style"

interface Props{
  interestRate: string | number
  month?: string | number
  endow: string | number
}

const InterestRate = React.memo(({ interestRate, endow, month = 12 }: Props) => {
  return(
      <View style={styles.container}>
        <View style={ALIGN_CENTER}>
          <AppText value={'LÃI SUẤT'} style={styles.month}/>
          <AppText value={` ${interestRate}%`} style={styles.endow}/>
          <AppText value={`(${month} THÁNG)`} style={styles.month}/>
        </View>
        <View style={styles.separate}/>
        <View style={ALIGN_CENTER}>
          <AppText value={'ƯU ĐÃI'} style={styles.month}/>
          <AppText value={endow} style={styles.endow}/>
          <AppText value={'THÁNG'} style={styles.month}/>
        </View>
      </View>
  )
})

InterestRate.displayName = 'InterestRate'

export default InterestRate;


const styles = ScaledSheet.create({
  container:{
    backgroundColor: color.palette.lightBlue,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: '8@s'
  },
  separate: {
    width: 1,
    height: '28@s',
    backgroundColor: '#DDD9D9',
    marginHorizontal: '60@s',
  },
  endow: {
    fontSize: '17@ms',
    fontFamily: fontFamily.bold,
    lineHeight: '24@ms'
  } ,
  month: {
    fontSize: '8.5@ms'
  }

});
