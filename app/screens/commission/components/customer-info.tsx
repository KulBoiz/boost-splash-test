import React from "react"
import { View } from "react-native"
import ItemView from "../../loan/components/item-view"
import InfoBox from "../../../components/info-box"
import { ScaledSheet } from "react-native-size-matters"
import { getEmail, getFullName, getPhone } from "../../../constants/variable"
import { COMMISSION_ROLE_SPECIFY_LABEL_MAPPING } from "../constants"

interface Props {
  commissionDetail: any
}

const CustomerInfo = React.memo(({ commissionDetail }: Props) => {
  const user = commissionDetail?.user
  return (
    <View style={styles.container}>
      <InfoBox title={"Thông tin khách hàng"}>
        <ItemView title={"Tên người nhận:"} content={getFullName(user)} style={styles.itemContainer} />
        <ItemView title={"Số điện thoại:"} content={getPhone(user)} style={styles.itemContainer} />
        <ItemView title={"Địa chỉ email:"} content={getEmail(user)} style={styles.itemContainer} />
        <ItemView title={"Tư cách"} content={COMMISSION_ROLE_SPECIFY_LABEL_MAPPING[commissionDetail?.roleSpecify]} style={styles.itemContainer} />
        <ItemView title={"Tổ chức"} content={user?.org?.name ?? '_'} contentStyle={styles.company}/>
      </InfoBox>
    </View>
  )
})

export default CustomerInfo

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    marginBottom: "12@s",
  },
  company: {
    textAlign: 'right'
  }
})
