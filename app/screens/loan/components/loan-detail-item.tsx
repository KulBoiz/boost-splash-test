import React from 'react';
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { StarSvg } from "../../../assets/svgs"
import FastImage from "react-native-fast-image"
import InterestRate from "./interest-rate"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"

interface Props{
  item: any
}

const LoanDetailItem = React.memo(({ item }: Props) => {
  const imageUrl = item?.org?.image?.url
  const outstandingAdvantages = item?.outstandingAdvantages

  return (
    <View style={styles.container}>
      <AppText value={item?.name} style={styles.name}/>
      {outstandingAdvantages &&
        <View style={styles.row}>
          <StarSvg />
          <AppText value={outstandingAdvantages} style={styles.outstandingAdvantages}/>
        </View>
      }
      <FastImage source={{uri:  imageUrl}} style={styles.bankIcon}/>
      <InterestRate interestRate={item?.info?.preferentialRate} endow={item?.info?.preferentialTime} month={12}/>
    </View>
  )
});

export default LoanDetailItem;
LoanDetailItem.displayName = 'LoanDetailItem'

const styles = ScaledSheet.create({
    container: {
      alignItems: "center",
      marginBottom: '30@s'
    },
  row: {
    flexDirection: 'row',
    alignItems: "center"
  },
  name: {
    textAlign: "center",
    fontFamily: fontFamily.semiBold,
    lineHeight: '16@s',
    fontWeight: '500',
    fontSize: '14@ms',
    color: color.lightBlack
  },
  bankIcon: {
    width: '50@s',
    height:'25@s',
    marginVertical: '8@s'
  },
  outstandingAdvantages: {
    lineHeight: '16@s',
    marginLeft: '8@ms',
    fontSize: '12@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.orange
  },
  interestItem: {
    alignItems: "center"
  },
  wrapInterest: {
    borderTopWidth: 1,
    borderTopColor: '#DDD9D9',
    paddingTop: '8@s',
  },
  separate: {
    width: 1,
    height: '25@s',
    backgroundColor: '#DDD9D9',
    marginLeft: '30@s',
    marginRight: '25@s'
  },
});
