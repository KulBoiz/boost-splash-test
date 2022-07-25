import React from 'react';
import { View, StyleSheet } from 'react-native';
import InfoBox from "../../../components/info-box"
import ItemView from "../../loan/components/item-view"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  item: any
}

const BeneficiaryInfo = React.memo(({ item }: Props) => {

  return (
    <View style={styles.container}>
      <InfoBox title={'Thông tin người thụ hưởng bảo hiểm'}>
        <ItemView title={'Họ và tên:'} content={``} style={styles.item}/>
        <ItemView title={'Ngày sinh:'} content={``} style={styles.item}/>
        <ItemView title={'Giới tính:'} content={``} style={styles.item}/>
        <ItemView title={'Địa chỉ gmail:'} content={``} style={styles.item}/>
        <ItemView title={'CMND/CCCD/Hộ chiếu'} content={``} style={styles.item}/>
        <ItemView title={'Số điện thoại:'} content={``} style={styles.item}/>
        <ItemView title={'Quan hệ chủ hợp đồng:'} content={``} />
      </InfoBox>
    </View>
  )
});

export default BeneficiaryInfo;

const styles = ScaledSheet.create({
    container: {},
  item: {
      marginBottom: '12@s'
  }
});
