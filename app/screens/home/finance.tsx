import React, { useCallback, useRef, useState } from "react"
import { View } from "react-native"
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
import { ScreenNames } from "../../navigators/screen-names"
import { navigate } from "../../navigators"
import { useStores } from "../../models"
import Carousel from 'react-native-snap-carousel';
import PaginationDot from "../../components/pagination-dot/pagination-dot"


const widthHeight = width - ms(32)

interface Props{}

const Finance = React.memo((props: Props) => {
  const {loanStore} =useStores()
  const ref = useRef()
  const [activeDot, setActiveDot] = useState(0)
  const data = loanStore?.products?.data?.slice(0, 10) || []

  const renderItem = useCallback(({item}) => {
    return (
      <View style={{width: widthHeight - ms(32)}}>
        <BankInfo item={item} hasBorder />
      </View>
    )
  },[])

  return (
    <View style={styles.container}>
      <AppText value={'Sản phẩm vay'} style={styles.title}/>
      <View style={styles.wrapIcon}>
        <LoanItem icon={<HouseLoanSvg/>} title={'home.finance.homeLoan'}/>
        <LoanItem icon={<CarLoanSvg/>} title={'home.finance.carLoan'}/>
        <LoanItem icon={<ConsumerLoanSvg/>} title={'home.finance.consumerLoan'}/>
        <LoanItem icon={<RepairLoanSvg/>} title={'home.finance.repairLoad'}/>
      </View>
      <View style={styles.wrapLoan}>
        <View style={styles.row}>
          <AppText value={'Gói vay nổi bật'} style={styles.title}/>
          <AppText value={'Xem thêm'} color={color.palette.blue} onPress={()=> navigate(ScreenNames.FINANCE, {index: 1})}/>
        </View>

        <Carousel
          ref={ref.current}
          key={(e, i)=> e.name + i.toString()}
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          loop
          onSnapToItem={(index) => setActiveDot( index ) }
        />
        <PaginationDot length={data.length} activeDot={activeDot} dotShape={'circle'}/>

      </View>
      <AppText value={'Công cụ hỗ trợ'} style={styles.title}/>
      <LoanSupportTool icon={<CalculatorSvg />} title={'Tính khả năng vay'} />
      <LoanSupportTool icon={<ProfileAddSvg />} title={'Giới thiệu khách vay'} onPress={()=> navigate(ScreenNames.REQUEST_COUNSELLING)} />
      <LoanSupportTool icon={<NoteSvg />} title={'Quản lý hồ sơ vay'} hideBorder onPress={()=> navigate(ScreenNames.FINANCE, {index: 2})}/>
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
  },
  title: {
    fontSize: '12@ms',
    color: '#AAADB7',
    marginBottom: '10@s'
  },
  wrapLoan: {
    marginBottom: '24@s'
  },
  wrapIcon:{
      flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: '24@s'
  },

});
