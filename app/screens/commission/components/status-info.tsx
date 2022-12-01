import React from "react"
import { View } from "react-native"
import ItemView from "../../loan/components/item-view"
import InfoBox from "../../../components/info-box"
import { ScaledSheet } from "react-native-size-matters"
import RenderStatus from "../../../components/status/render-status"
import { commissionStatus } from "../constants"
import { formatDate } from "../../../constants/variable"

interface Props {
  commissionDetail: any
}

const StatusInfo = React.memo(({ commissionDetail }: Props) => {
  const status = commissionDetail?.status
  const transactionDetail = commissionDetail?.transactionDetail

  const content = React.useMemo(() => {
    return (
      <RenderStatus
        style={styles.statusContainer}
        status={commissionStatus(status)?.status}
        statusColor={commissionStatus(status)?.textColor}
        backgroundColor={commissionStatus(status)?.background} />
    )
  }, [status])

  return (
    <View style={styles.container}>
      <InfoBox title={"Trạng thái hồ sơ"}>
        <ItemView title={"Trạng thái:"} content={content} style={styles.itemContainer} />
        <ItemView title={"Ngày ghi nhận hoa hồng:"} content={formatDate(transactionDetail?.createdAt)} style={styles.itemContainer} />
        <ItemView title={"Ngày đối soát:"} content={"_"} style={styles.itemContainer} />
        {/* <ItemView title={"Ngày thanh toán:"} content={""} style={styles.itemContainer} />
        <ItemView title={"Người thanh toán:"} content={""} /> */}
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
  statusContainer: {
    paddingVertical: "1@s",
    paddingHorizontal: "8@s",
    borderRadius: "10@s",
    alignItems: "center",
  },
})
