import React from 'react';
import { View } from 'react-native';
import HomeItem from "./components/home-item"
import { LOAN_PRODUCT, SUPPORT_TOOL } from "./constants"
import LoanPackage from "./components/loan-package"
import HomeBanner from "./components/home-banner"
import { ScaledSheet } from "react-native-size-matters"

interface Props{}

const HomeFinance = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <HomeItem data={LOAN_PRODUCT} label={'Sản phẩm vay'} style={styles.itemMargin}/>
      <LoanPackage />
      <HomeItem data={SUPPORT_TOOL} label={'Công cụ hỗ trợ'} style={styles.itemMargin}/>
      <HomeBanner />
    </View>
  )
});

export default HomeFinance;

const styles = ScaledSheet.create({
    container: {},
  itemMargin :{
    marginVertical: '24@s'
  }
});
