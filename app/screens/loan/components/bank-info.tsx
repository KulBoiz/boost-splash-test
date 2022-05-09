import React from 'react';
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import FastImage from "react-native-fast-image"
import { StarSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import InterestRate from "./interest-rate"
import BottomBankInfo from "./bottom-bank-info"

interface BankInfoProps{
  item: any
  hasBorder?: boolean
}

const BankInfo = React.memo((props: BankInfoProps) => {
  const {item, hasBorder} = props
  const imageUrl = item?.org?.image?.url
  const backgroundColor = item?.org?.backgroundColor
  const outstandingAdvantages = item?.outstandingAdvantages

  return (
    <View style={[styles.container, hasBorder && [styles.border, {borderColor: backgroundColor ?? color.lightBlack}]]}>
      <View style={[styles.header, {backgroundColor: backgroundColor ?? '#005992'}]}>
        <FastImage source={{uri:  imageUrl}} style={styles.bankIcon}/>
      </View>

      <View style={styles.body}>
        <View style={styles.headerContent}>
          <AppText value={item?.name} style={styles.name}/>
          {outstandingAdvantages &&
            <View style={styles.row}>
              <StarSvg />
              <AppText value={outstandingAdvantages} style={styles.outstandingAdvantages}/>
            </View>
          }
        </View>

        <View style={[styles.row, styles.interestRateContainer]}>
          <InterestRate title={'Lãi Suất'} content={item?.info?.preferentialRate} isInterestRate/>
          <View style={styles.separate}/>
          <InterestRate title={'Ưu Đãi'} content={item?.info?.preferentialTime} />
        </View>

        <View style={styles.contentContainer}>
          <AppText value={item?.advantages}/>
        </View>
        <BottomBankInfo  id={item?.id} />
      </View>
    </View>
  )
});

export default BankInfo;
BankInfo.displayName = 'BankInfo'

const styles = ScaledSheet.create({
  container: {
    borderRadius: '8@s',
    backgroundColor: color.palette.white
  },
  border: {
    borderWidth: 1
  },
  bankIcon: {
    width: '50@s',
    height:'25@s'
  },
  row: {
    flexDirection: 'row',
    alignItems: "center"
  },
  interestRateContainer: {
    paddingVertical: '16@s',
  },

  header: {
    borderTopRightRadius: '8@s',
    borderTopLeftRadius: '8@s',
    paddingHorizontal: '16@s',
    paddingVertical: '8@s',
    alignItems: 'flex-start',
    justifyContent:'center'
  },
  name: {
    lineHeight: '16@s',
    fontWeight: '500',
    fontSize: '12@ms',
    color: color.lightBlack
  },
  body: {
    paddingHorizontal: '16@ms',
    paddingBottom: '16@s'
  },
  headerContent: {
    paddingVertical: '16@s',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD9D9'
  },
  contentContainer: {

  },
  separate: {
    width: 1,
    height: '25@s',
    backgroundColor: '#DDD9D9',
    marginLeft: '30@s',
    marginRight: '25@s'
  },
  outstandingAdvantages: {
    lineHeight: '16@s',
    marginLeft: '8@ms',
    fontSize: '12@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.orange
  }
});
