import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { CheckedSvg } from '../../../assets/svgs';
import { AppText } from "../../../components/app-text/AppText";
import { useStores } from '../../../models';
import { color } from "../../../theme";
import ItemView from '../../loan/components/item-view';

interface Props {
}

const Document = React.memo((props: Props) => {
  const { loanStore } = useStores()
  const { loanDetail } = loanStore
  const { product } = loanDetail
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AppText style={styles.title} value={"Thông tin khoản vay"} />
        <View style={styles.contentItem}>
          <ItemView style={styles.item} title={"loan.infoLoan.info.loanDemand"} content={product?.name} />
          <ItemView style={styles.item} title={"loan.infoLoan.info.collateral"} content={loanDetail?.realEstateInfo?.apartmentCode} />
          <ItemView style={styles.item} title={"loan.infoLoan.info.money"} content={loanDetail?.loanMoney ? `${loanDetail?.loanMoney?.toLocaleString()} VNĐ` : ''} />
          <ItemView style={styles.item} title={"loan.infoLoan.info.time"} content={loanDetail?.timeLoan ? `${loanDetail?.timeLoan} Năm` :  ''} />
        </View>
      </View>

      <View style={styles.content}>
        <AppText style={styles.title} value={"Giấy tờ của khách"} />
        <View style={styles.contentItem}>
          <ItemView style={styles.item} title={"loan.infoLoan.document.CCCD"} content={<CheckedSvg />} />
          <ItemView style={styles.item} title={"loan.infoLoan.document.marriageRegistration"} content={<CheckedSvg />} />
          <ItemView style={styles.item} title={"loan.infoLoan.document.salaryStatement"} content={<CheckedSvg />} />
          <ItemView style={styles.item} title={"loan.infoLoan.document.laborContract"} content={<CheckedSvg />} />
          <View style={styles.viewMore}>
            <AppText style={styles.viewMoreText} value={'Xem thêm'} />
          </View>
        </View>
      </View>
    </View>
  )
});

export default Document;

const styles = ScaledSheet.create({
  container: {
  },
  content: {
    marginBottom: '16@s'
  },
  title: {
    marginBottom: '8@s'
  },
  contentItem: {
    borderRadius: '8@s',
    padding: '8@s',
    backgroundColor: color.palette.white,
  },
  item: {
    padding: '8@s',
  },
  viewMore: {
    borderTopWidth: 1,
    borderTopColor: color.palette.EEEEEE,
    margin: '8@s',
  },
  viewMoreText: {
    paddingTop: '16@s',
    color: color.palette.blue,
    textAlign: 'center'
  }
});
