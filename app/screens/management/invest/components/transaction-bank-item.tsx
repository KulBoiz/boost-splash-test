import React, { useCallback } from "react"
import { View, Pressable, Alert, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import {
  ALIGN_CENTER,
  FONT_BOLD_12,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_4,
  MARGIN_BOTTOM_8,
  ROW,
} from "../../../../styles/common-style"
import { color } from "../../../../theme"
import FastImage from "react-native-fast-image"
import { images } from "../../../../assets/images"
import Clipboard from "@react-native-clipboard/clipboard"
import { hexToRgbA, numberWithCommas } from "../../../../constants/variable"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
  item: any
}

interface ItemProps {
  title: string
  content: string
  cantChange?: boolean
  style?: ViewStyle | any

  handleCopy?(): void
}

const Item = React.memo(({ title, content, handleCopy, cantChange, style }: ItemProps) => {
  return (
    <View style={style}>
      <AppText style={[FONT_REGULAR_12, MARGIN_BOTTOM_4]}>
        {title} {cantChange && <AppText value={"(Không được thay đổi)"} color={color.palette.angry} />}
      </AppText>
      <Pressable onPress={handleCopy} style={[ROW, ALIGN_CENTER]}>
        <AppText value={content} style={FONT_BOLD_12} />
        {handleCopy && <FastImage source={images.common_copy} style={styles.icon} />}
      </Pressable>
    </View>
  )
})
const TransactionBankItem = React.memo(({ item }: Props) => {
  const productDetailInfo = item?.transactionPartnerLog?.productDetailInfo
  const content = item?.transactionPartnerLog?.metaData?.transferContent
  const bankName = productDetailInfo?.dataBank?.name
  const bankNumber = productDetailInfo?.bankNumber
  const account = item?.productName

  const alert = useCallback(() => {
    Alert.alert("Đã copy vào clipboard")
  }, [])

  const copyBankNumber = useCallback(() => {
    // Clipboard.setString(bankNumber)
    alert()
  }, [])

  const copyContent = useCallback(() => {
    Clipboard.setString(content)
    alert()
  }, [])

  const copyAccount = useCallback(() => {
    Clipboard.setString(account)
    alert()
  }, [])

  return (
    <View style={styles.container}>
      <Item title={"Ngân hàng"} content={bankName ?? ""} style={MARGIN_BOTTOM_8} />
      <Item title={"Số tài khoản"} content={bankNumber ?? ""} style={MARGIN_BOTTOM_8} handleCopy={copyBankNumber} />
      <Item title={"Số tiền thanh toán"} content={`${numberWithCommas(item?.netAmount)} vnđ`} style={MARGIN_BOTTOM_8} />
      <Item title={"Nội dung"} content={content} cantChange handleCopy={copyContent} style={MARGIN_BOTTOM_8} />
      <Item title={"Tài khoản"} content={account} handleCopy={copyAccount} />
    </View>
  )
})

export default TransactionBankItem

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.primary,
    borderStyle: "dashed",
    padding: "12@s",
    borderRadius: "8@s",
    marginTop: "16@s",
    backgroundColor: hexToRgbA(color.primary, 0.03),
  },
  icon: {
    width: "16@s",
    height: "16@s",
    marginLeft: "2@s",
  },
})
