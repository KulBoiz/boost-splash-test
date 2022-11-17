import React, { useCallback } from "react"
import { View } from "react-native"
import { InvestSuccessSvg } from "../../assets/svgs"
import { AppText } from "../../components/app-text/AppText"
import { FONT_MEDIUM_12, FONT_REGULAR_12, FONT_REGULAR_14, MARGIN_BOTTOM_8 } from "../../styles/common-style"
import ItemView from "../loan/components/item-view"
import { formatDate, formatDateTime, numberWithCommas } from "../../constants/variable"
import { color } from "../../theme"
import { ms, ScaledSheet } from "react-native-size-matters"
import AppButton from "../../components/app-button/AppButton"
import { fontFamily } from "../../constants/font-family"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { useStores } from "../../models"
import { StackActions, useNavigation } from "@react-navigation/native"

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

const InvestSuccess = React.memo((props: Props) => {
  const navigation = useNavigation()
  const {investStore} = useStores()
  const {transactionInfo} = investStore
  const info = transactionInfo?.productInfo?.info
  const program = transactionInfo?.productDetailInfo?.name
  const type = transactionInfo?.metaData?.oderTypeCode === 'BUY' ? 'Mua' : 'Bán'

  const buyMore = useCallback(() => {
    navigation.dispatch(StackActions.pop(3))
  }, [])

  const complete = useCallback(() => {
    navigate(ScreenNames.APP)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <InvestSuccessSvg style={styles.icon} />
        <AppText value={"Đăng ký đầu tư định kỳ thành công"} fontFamily={fontFamily.bold} fontSize={ms(18)}
                 style={MARGIN_BOTTOM_8} />
        <AppText value={"Cảm ơn Quý khách đã đầu tư vào chứng chỉ quỹ của VINACAPITAL"} style={FONT_REGULAR_14}
                 color={color.palette.grayChateau} textAlign={"center"} />

        <View style={styles.itemContainer}>
          <ItemView title={"Quỹ đầu tư"} content={<RightContent content={"Quỹ đầu tư Trái phiếu FINA"} />}
                    style={styles.item} />
          <ItemView title={"Loại lệnh"}
                    content={<RightContent content={type} />} style={styles.item} />
          <ItemView title={"Ngày đặt lệnh"} content={<RightContent content={formatDateTime(transactionInfo?.createdAt)} note={GMT} />}
                    style={styles.item} />
          <ItemView title={"Phiên giao dịch"} content={<RightContent content={formatDate(info?.nextOrderMatchingSession)} note={GMT} />}
                    style={styles.item} />
          <ItemView title={"Chương trình"} content={<RightContent content={program} />} style={styles.item} />
          <ItemView title={"Số tiền mua"} content={<RightContent content={`${numberWithCommas(transactionInfo?.metaData?.amount)} vnđ`} />} />
        </View>
      </View>

      <View style={styles.wrapBtn}>
        <AppButton title={"Mua thêm"} onPress={buyMore} containerStyle={[styles.btn, styles.whiteBtn]}
                   titleStyle={styles.buyMore} />
        <AppButton title={"Hoàn tất"} onPress={complete} containerStyle={styles.btn} />
      </View>
    </View>
  )
})

export default InvestSuccess

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  icon: {
    marginBottom: "40@s",
  },
  body: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "16@s",
    justifyContent: "center",
  },
  itemContainer: {
    marginTop: "24@s",
    width: "100%",
    borderWidth: 1,
    borderColor: color.primary,
    paddingVertical: "12@s",
    paddingHorizontal: "16@s",
    borderRadius: "8@s",
  },
  item: {
    marginBottom: "12@s",
  },
  wrapBtn: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: "24@s",
    paddingHorizontal: "16@s",
  },
  whiteBtn: {
    borderWidth: 1,
    borderColor: color.primary,
    backgroundColor: color.background,
  },
  btn: {
    width: "48%",
  },
  buyMore: {
    color: color.primary,
  },
})
