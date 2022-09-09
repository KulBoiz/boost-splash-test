import React from "react"
import { View } from "react-native"
import ItemView from "../../loan/components/item-view"
import InfoBox from "../../../components/info-box"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
}

const CustomerInfo = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <InfoBox title={"Thông tin khách hàng"}>
        <ItemView title={"Tên người nhận:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Số điện thoại:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Địa chỉ email:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Tư cách"} content={""} style={styles.itemContainer} />
        <ItemView title={"Tổ chức"} content={""} />
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
})
