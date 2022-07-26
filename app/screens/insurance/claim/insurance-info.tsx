import React from 'react';
import { View } from 'react-native';
import InfoBox from "../../../components/info-box"
import ItemView from "../../loan/components/item-view"
import { ScaledSheet } from "react-native-size-matters"
import { formatDate, numberWithCommas, truncateString } from "../../../constants/variable"
import moment from "moment"

interface Props{
  item: any
  deal: any
}

const InsuranceInfo = React.memo(({ item, deal }: Props) => {
  const data = item?.product
  const dealData = deal?.meta
  const startDate = deal?.meta?.time?.startTime ?? moment(deal?.meta?.time?.endTime).subtract(1, 'years')
  const endDate = deal?.meta?.time?.endTime ?? moment(deal?.meta?.time?.startTime).add(1, 'years')
  return (
    <View style={styles.container}>
      <InfoBox title={'Thông tin bảo hiểm'}>
        <ItemView title={'Nhà bảo hiểm:'} content={data?.org?.name} style={styles.item}/>
        <ItemView title={'Loại bảo hiểm:'} content={data?.category?.name} style={styles.item}/>
        <ItemView title={'Gói bảo hiểm:'} content={truncateString(dealData?.name, 42)} style={styles.item}/>
        <ItemView title={'Số tiền bảo hiểm:'} content={numberWithCommas(dealData?.amount)} style={styles.item}/>
        <ItemView title={'Mã hồ sơ:'} content={deal?.code ?? '_'} style={styles.item}/>
        <ItemView title={'Thời hạn hợp đồng:'} content={`${formatDate(startDate)} - ${formatDate(endDate)}`} />
      </InfoBox>
    </View>
  )
});

export default InsuranceInfo;

const styles = ScaledSheet.create({
  container: {},
  item: {
    marginBottom: '12@s'
  }
});

