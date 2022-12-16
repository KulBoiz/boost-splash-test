import React from "react"
import { View } from "react-native"
import ItemView from "../../../loan/components/item-view"
import { AppText } from "../../../../components/app-text/AppText"
import { FONT_BOLD_14, FONT_MEDIUM_12, FONT_REGULAR_12, FONT_REGULAR_14, ROW } from "../../../../styles/common-style"
import { formatDate, formatDateTime, numberWithCommas } from "../../../../constants/variable"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { CautionSvg } from "../../../../assets/svgs"

interface Props {
  transactionInfo: any
  estimatedQuantity: string
  param: any
  data: any
}

interface RightContentProps {
  content: string
  note?: string
}

const RightContent = React.memo(({ content, note }: RightContentProps) => {
  return (
    <AppText style={FONT_MEDIUM_12}>
      {content} {note && <AppText value={`(${note})`} style={FONT_REGULAR_12} color={"#B9B9B9"} />}
    </AppText>
  )
})

const GMT = "Giờ VN"
const firstCaution = "Quý khách vui lòng chuyển khoản theo thông tin chuyển khoản ở bên dưới"
const secondCaution = "Sau khi chuyển khoản thành công, nhấn nút\n"
const thirdCaution = '“Xác nhận thanh toán"'

const PurchaseInfo = React.memo(({ transactionInfo, estimatedQuantity, param, data }: Props) => {
  const info = transactionInfo?.info
  const program = transactionInfo?.productDetailInfo?.name

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ItemView title={"Số tiền đầu tư"} content={<RightContent content={`${numberWithCommas(param?.amount)} vnđ`} />} style={styles.item} />
        <ItemView title={"Số lượng ước tính"}
                  content={<RightContent content={numberWithCommas(estimatedQuantity)} note={"Chứng chỉ"} />} style={styles.item} />
        <ItemView title={"Ngày đặt lệnh"} content={<RightContent content={formatDateTime(new Date())} note={GMT} />}
                  style={styles.item} />
        <ItemView title={"Sổ lệnh đóng"} content={<RightContent content={formatDateTime(info?.closedOrderBookTime)} note={GMT} />}
                  style={styles.item} />
        <ItemView title={"Phiên khớp lệnh"} content={<RightContent content={formatDate(info?.nextOrderMatchingSession)} />}
                  style={styles.item} />
        <ItemView title={"Phí mua"} content={<RightContent content={"0%"} />} style={styles.item} />
        <ItemView title={"Chương trình"} content={<RightContent content={`${data?.name}`} />} />
      </View>
      <View style={styles.cautionContainer}>
        <CautionSvg style={styles.icon} />
        <AppText value={firstCaution} style={[FONT_REGULAR_14, {width: '92%'}]} />
      </View>
      <View style={ROW}>
        <CautionSvg style={styles.icon} />
        <AppText style={FONT_REGULAR_14}>
          {secondCaution} <AppText value={thirdCaution} style={FONT_BOLD_14} color={color.primary} />
        </AppText>
      </View>
    </View>
  )
})

export default PurchaseInfo

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '16@s',
    borderBottomWidth:'8@s',
    borderBottomColor: color.palette.lightGrey,
    paddingBottom: '16@s'
  },
  body: {
    borderWidth: 1,
    borderColor: color.primary,
    paddingVertical: "12@s",
    paddingHorizontal: "16@s",
    borderRadius: "8@s",
  },
  item: {
    marginBottom: "12@s",
  },
  cautionContainer: {
    marginTop: '16@s',
    marginBottom: '12@s',
    flexDirection: "row"
  },
  icon: {
    marginRight: "10@s",
  },
})
