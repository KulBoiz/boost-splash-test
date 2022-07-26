import React from 'react';
import { View } from 'react-native';
import InfoBox from "../../../components/info-box"
import ItemView from "../../loan/components/item-view"
import { ScaledSheet } from "react-native-size-matters"
import { getFullName } from "../../../constants/variable"

interface Props{
  item: any
  deal: any
}

const BuyerInfo = React.memo(({ item , deal}: Props) => {
  const  user = deal?.source


  return (
    <View style={styles.container}>
      <InfoBox title={'Thông tin người mua'}>
        <ItemView title={'Họ và tên:'} content={getFullName(user)} style={styles.item}/>
        <ItemView title={'Ngày sinh:'} content={`_`} style={styles.item}/>
        <ItemView title={'Giới tính:'} content={`_`} style={styles.item}/>
        <ItemView title={'Địa chỉ gmail:'} content={user?.emails[0]?.email ?? '_'} style={styles.item}/>
        <ItemView title={'Số CMND / CCCD / Hộ chiếu:'} content={user?.idNumber ?? '_'} style={styles.item}/>
        <ItemView title={'Số điện thoại:'} content={user?.tels[0]?.tel ?? '_'} style={styles.item}/>
        <ItemView title={'Công ty:'} content={'_'} style={styles.item}/>
        <ItemView title={'Chức vụ:'} content={`_`} />
      </InfoBox>
    </View>
  )
});

export default BuyerInfo;

const styles = ScaledSheet.create({
  container: {},
  item: {
    marginBottom: '12@s'
  }
});
;
