import React from 'react';
import { View } from 'react-native';
import { AppText } from "../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import {
  CalculatorSvg,
  CarLoanSvg,
  ConsumerLoanSvg,
  HouseLoanSvg, NoteSvg,
  ProfileAddSvg,
  RepairLoanSvg,
} from "../../assets/svgs"
import { color } from "../../theme"
import { width } from "../../constants/variable"
import LoanItem from "./components/loan-item"
import LoanSupportTool from "./components/loan-support-tool"
import BankInfo from "../loan/components/bank-info"
import { item } from "./constants"
import { ScreenNames } from "../../navigators/screen-names"
import { navigate } from "../../navigators"

const widthHeight = width - ms(32)

interface Props{}

const Finance = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'Sản Phẩm Vay'} style={styles.title}/>
      <View style={styles.wrapIcon}>
        <LoanItem icon={<HouseLoanSvg/>} title={'home.finance.homeLoan'}/>
        <LoanItem icon={<CarLoanSvg/>} title={'home.finance.carLoan'}/>
        <LoanItem icon={<ConsumerLoanSvg/>} title={'home.finance.consumerLoan'}/>
        <LoanItem icon={<RepairLoanSvg/>} title={'home.finance.repairLoad'}/>
      </View>
      <View style={styles.wrapLoan}>
        <View style={styles.row}>
          <AppText value={'gói vay nổi bật'} style={styles.title} capitalize/>
          <AppText value={'Tất Cả'} color={color.palette.blue}/>
        </View>
        <BankInfo item={item} hasBorder />
      </View>
      <AppText value={'Công cụ hỗ trợ'} style={styles.title}/>
      <LoanSupportTool icon={<CalculatorSvg />} title={'Tính khả năng vay'} />
      <LoanSupportTool icon={<ProfileAddSvg />} title={'Giới thiệu khách vay'} onPress={()=> navigate(ScreenNames.INTRODUCE_LOAN_CUSTOMER)} />
      <LoanSupportTool icon={<NoteSvg />} title={'Quản lý hồ sơ vay'} hideBorder onPress={()=> navigate(ScreenNames.FINANCE)}/>
    </View>
  )
});

export default Finance;

const styles = ScaledSheet.create({
    container: {
      borderTopLeftRadius: 0,
      borderRadius: '8@s',
      padding: '16@ms',
      width: widthHeight,
      backgroundColor: color.background
    },
  row: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: '8@s'
  },
  title: {
    fontSize: '12@ms',
    color: '#AAADB7',
  },
  wrapLoan: {
    marginBottom: '24@s'
  },
  wrapIcon:{
      flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: '24@s'
  }

});
