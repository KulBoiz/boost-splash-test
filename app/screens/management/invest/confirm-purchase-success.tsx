import React from "react"
import { View, StyleSheet } from "react-native"
import { InvestSuccessSvg } from "../../../assets/svgs"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { FONT_MEDIUM_12, FONT_REGULAR_12, FONT_REGULAR_14, MARGIN_BOTTOM_8 } from "../../../styles/common-style"
import ItemView from "../../loan/components/item-view"
import { formatDate, formatDateTime, numberWithCommas } from "../../../constants/variable"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import { useStores } from "../../../models"
import info from "../../loan-profile/components/info"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props {
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

const ConfirmPurchaseSuccess = React.memo((props: Props) => {
  const { investStore } = useStores()
  const item = JSON.parse(investStore.transactionInformation)
  const type = item?.orderType?.name
  const productInfo = item?.transactionPartnerLog?.productInfo?.info

  const onPress = React.useCallback(() => {
    navigate(ScreenNames.HOME)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <InvestSuccessSvg style={styles.icon} />
        <AppText value={"Xác nhận thanh toán thành công"} fontFamily={fontFamily.bold} fontSize={ms(18)}
                 style={MARGIN_BOTTOM_8} />
        <AppText value={"Cảm ơn Quý khách đã đặt xác nhận thanh toán "} style={FONT_REGULAR_14}
                 color={color.palette.grayChateau} textAlign={"center"} />
        <View style={styles.itemContainer}>
          <ItemView title={"Tổ chức phát hành"} content={<RightContent content={"VinaCapital"} />}
                    style={styles.item} />
          <ItemView title={"Loại lệnh"} content={<RightContent content={type} />} style={styles.item} />
          <ItemView title={"Số tiền mua"} content={<RightContent content={`${numberWithCommas(item?.netAmount)} đ`} />}
                    style={styles.item} />
          <ItemView title={"Ngày đặt lệnh"}
                    content={<RightContent content={formatDateTime(item?.transactionPartnerLog?.createdAt)}
                                           note={GMT} />}
                    style={styles.item} />
          <ItemView title={"Phiên khớp lệnh"}
                    content={<RightContent content={formatDate(productInfo?.nextOrderMatchingSession)} />}
                    style={styles.item} />
          <ItemView title={"Sổ  lệnh đóng"}
                    content={<RightContent content={`Trước ${formatDateTime(productInfo?.closedOrderBookTime)}`} note={GMT} />}
                    contentStyle={{ flex: 1.5 }} style={styles.item} />
          <ItemView title={"NAV kỳ trước"}
                    content={<RightContent content={`${numberWithCommas(productInfo?.navPre)} đ`} />}
                    style={styles.item} />
          <ItemView title={"Mã lệnh"} content={<RightContent content={item?.code} />} style={styles.item} />
          <ItemView title={"Trạng thái"} content={<RightContent content={item?.statusName} />} />
        </View>
      </View>

      <View style={styles.wrapBtn}>
        <AppButton title={"Hoàn tất"} onPress={onPress} />
      </View>
    </View>
  )
})

export default ConfirmPurchaseSuccess

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "16@s",
  },
  itemContainer: {
    width: "100%",
    marginTop: "24@s",
    borderWidth: 1,
    borderColor: color.primary,
    paddingVertical: "12@s",
    paddingHorizontal: "16@s",
    borderRadius: "8@s",
  },
  icon: {
    marginBottom: "40@s",
  },
  item: {
    marginBottom: "12@s",
  },
  wrapBtn: {
    paddingBottom: "24@s",
    paddingHorizontal: "16@s",
  },
})
