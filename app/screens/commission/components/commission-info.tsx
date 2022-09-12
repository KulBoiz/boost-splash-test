import React from "react"
import { View } from "react-native"
import ItemView from "../../loan/components/item-view"
import InfoBox from "../../../components/info-box"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
}

const CommissionInfo = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <InfoBox title={"Thông tin hoa hồng"}>
        <ItemView title={"Hoa hồng nhận được:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Tỷ lệ:"} content={""}/>
      </InfoBox>
    </View>
  )
})

export default CommissionInfo

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    marginBottom: "12@s",
  },
})
