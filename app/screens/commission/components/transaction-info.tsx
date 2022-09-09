import React from "react"
import { View } from "react-native"
import ItemView from "../../loan/components/item-view"
import InfoBox from "../../../components/info-box"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
}

const TransactionInfo = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <InfoBox title={"Thông tin giao dịch"}>
        <ItemView title={"Lý do chi trả:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Mã giải ngân:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Số tiền giải ngân:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Ngày giải ngân:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Giải ngân đợt 1:"} content={""}/>
      </InfoBox>
    </View>
  )
})

export default TransactionInfo

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    marginBottom: "12@s",
  },
})
