import React from "react"
import { View } from "react-native"
import ItemView from "../../loan/components/item-view"
import InfoBox from "../../../components/info-box"
import { ScaledSheet } from "react-native-size-matters"
import { numberWithCommas } from "../../../constants/variable"

interface Props {
  commissionDetail: any

}

const CommissionInfo = React.memo(({ commissionDetail }: Props) => {
  const percent = `${+((commissionDetail?.amount || 0) / (commissionDetail?.transactionDetail?.amount || 0) * 100).toFixed(2)}`
  const commission = `${commissionDetail?.amount} vnđ`

  return (
    <View style={styles.container}>
      <InfoBox title={"Thông tin hoa hồng"}>
        <ItemView title={"Hoa hồng nhận được:"} content={numberWithCommas(commission)} style={styles.itemContainer} />
        <ItemView title={"Tỷ lệ:"} content={`${percent}%`}/>
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
