import React from 'react';
import { View } from 'react-native';
import ItemView from "./item-view"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"

interface Props{}

const ProductInfo = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText tx={"loan.productInfo"} style={styles.label}/>
      <ItemView title={'loan.preferentialTime'} content={'108 tháng'} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.preferentialInterestRate'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.interestRateAfterIncentives'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.referenceInterestRate'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.amplitude'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.maximumLoanRate'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.maximumLoanPeriod'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.minimumLoanPeriod'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.maximumLoanAmount'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
      <ItemView title={'loan.minimumLoanAmount'} content={''} style={styles.itemStyle} contentStyle={styles.content} />
    </View>
  )
});

export default ProductInfo;
ProductInfo.displayName ='ProductInfo'

const styles = ScaledSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: color.background,
      borderRadius: '8@s',
      paddingHorizontal: '16@ms'
    },
  label:{
    fontFamily: fontFamily.regular,
    fontWeight: '500',
    fontSize: '14@ms',
    marginTop: '16@s'
  },
  itemStyle:{
    paddingVertical: '12@s',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  content: {
      color: color.palette.blue
  }
});
