import React from 'react';
import { View } from 'react-native';
import InfoBox from "../../../components/info-box"
import ItemView from "../../loan/components/item-view"
import { ScaledSheet } from "react-native-size-matters"
import { getFullName, getGender } from "../../../constants/variable"
import moment from "moment"

interface Props{
  item: any
  deal: any
}

const BeneficiaryInfo = React.memo(({ item, deal }: Props) => {
  const user = deal?.user
  return (
    <View style={styles.container}>
      <InfoBox title={'Thông tin người thụ hưởng bảo hiểm'}>
        <ItemView title={'Họ và tên:'} content={getFullName(user)} style={styles.item}/>
        <ItemView title={'Ngày sinh:'} content={user?.birthday ? moment(user?.birthday).format('DD/MM/YYYY') : '_'} style={styles.item}/>
        <ItemView title={'Giới tính:'} content={getGender(user?.gender)} style={styles.item}/>
        <ItemView title={'Địa chỉ gmail:'} content={user?.emails[0]?.email ?? '_'} style={styles.item}/>
        <ItemView title={'CMND/CCCD/Hộ chiếu'} content={user?.idNumber ?? '_'} style={styles.item}/>
        <ItemView title={'Số điện thoại:'} content={user?.tels[0]?.tel ?? '_'} />
        {/* <ItemView title={'Quan hệ chủ hợp đồng:'} content={``} /> */}
      </InfoBox>
    </View>
  )
});

export default BeneficiaryInfo;

const styles = ScaledSheet.create({
  container: {
    marginBottom: '-8@s'
  },
  item: {
      marginBottom: '12@s'
  }
});
