import React from "react"
import { View } from "react-native"
import ItemView from "../../loan/components/item-view"
import InfoBox from "../../../components/info-box"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
}

const StatusInfo = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <InfoBox title={"Trạng thái hồ sơ"}>
        <ItemView title={"Trạng thái:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Ngày ghi nhận hoa hồng:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Ngày đối soát:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Ngày thanh toán:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Người thanh toán:"} content={""}/>
      </InfoBox>
    </View>
  )
})

export default StatusInfo

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    marginBottom: "12@s",
  },
})
