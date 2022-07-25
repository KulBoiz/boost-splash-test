import React from 'react';
import { View, StyleSheet } from 'react-native';
import InfoBox from "../../../components/info-box"
import ItemView from "../../loan/components/item-view"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  item: any
}

const InsuranceInfo = React.memo(({ item }: Props) => {
  const data = item?.product
  return (
    <View style={styles.container}>
      <InfoBox title={'Thông tin bảo hiểm'}>
        <ItemView title={'Nhà bảo hiểm:'} content={data?.org?.name} style={styles.item}/>
        <ItemView title={'Loại bảo hiểm:'} content={data?.category?.name} style={styles.item}/>
        <ItemView title={'Gói bảo hiểm:'} content={``} style={styles.item}/>
        <ItemView title={'Số tiền bảo hiểm:'} content={``} style={styles.item}/>
        <ItemView title={'Mã hồ sơ:'} content={``} style={styles.item}/>
        <ItemView title={'Thẻ cứng bảo hiểm:'} content={``} style={styles.item}/>
        <ItemView title={'Thời hạn hợp đồng:'} content={``} />
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

