import React from "react"
import { View } from "react-native"
import ItemView from "../../loan/components/item-view"
import InfoBox from "../../../components/info-box"
import { ScaledSheet } from "react-native-size-matters"
import { COMMISSION_REASON_SPEND_MAPPING } from "../constants"
import { formatDate, numberWithCommas } from "../../../constants/variable"

interface Props {
  commissionDetail: any
}

const TransactionInfo = React.memo(({ commissionDetail }: Props) => {
  const code = commissionDetail?.transaction?.code ?? '_'
  const transactionType = commissionDetail?.transactionType;
  const amount = numberWithCommas(commissionDetail?.transactionDetail?.amount)
  const date = formatDate(commissionDetail?.transactionDetail?.createdAt)

  return (
    <View style={styles.container}>
      <InfoBox title={"Thông tin giao dịch"}>
        <ItemView title={"Lý do chi trả:"} content={COMMISSION_REASON_SPEND_MAPPING[transactionType]} style={styles.itemContainer} />
        <ItemView title={"Mã giải ngân:"} content={code} style={styles.itemContainer} />
        <ItemView title={"Số tiền giải ngân:"} content={`${amount} vnđ`} style={styles.itemContainer} />
        <ItemView title={"Ngày giải ngân:"} content={date} style={styles.itemContainer} />
        {/* <ItemView title={"Giải ngân đợt 1:"} content={""}/> */}
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
