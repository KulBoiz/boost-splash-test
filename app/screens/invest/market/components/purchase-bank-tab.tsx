import React, { useCallback } from "react"
import { Alert, Pressable, View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { images } from "../../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import {
  ALIGN_CENTER,
  FONT_BOLD_12,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_4,
  MARGIN_BOTTOM_8,
  ROW,
} from "../../../../styles/common-style"
import { color } from "../../../../theme"
import Clipboard from "@react-native-clipboard/clipboard"

interface Props {
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

const bankNumber = "9012545454545"
const content = "911CL788FN123"
const account = "QUY DAU TU TRAI PHIEU BAO THINH VINACAPITAL"

const PurchaseBankTab = React.memo((props: Props) => {
  const alert = useCallback(() => {
    Alert.alert("Đã copy vào clipboard")
  }, [])

  const copyBankNumber = useCallback(() => {
    Clipboard.setString(bankNumber)
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
      <View style={styles.itemContainer}>
        <Item title={"Ngân hàng"} content={"Standard Chartered"} style={MARGIN_BOTTOM_8} />
        <Item title={"Số tài khoản"} content={bankNumber} style={MARGIN_BOTTOM_8} handleCopy={copyBankNumber}/>
        <Item title={"Số tiền thanh toán"} content={"100,000 vnđ"} />
      </View>
      <View style={styles.middleContainer}>
        <Item title={"Nội dung"} content={content} cantChange handleCopy={copyContent}/>
      </View>
      <View style={styles.itemContainer}>
        <Item title={"Tài khoản"} content={account} style={MARGIN_BOTTOM_8} handleCopy={copyAccount}/>
        <Item title={"Tên chi nhánh"} content={"TPHCM"} />
      </View>
    </View>
  )
})

export default PurchaseBankTab

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    padding: "12@s",
    backgroundColor: color.palette.lightBlue,
    borderRadius: "8@s",
  },
  middleContainer: {
    marginVertical: "8@s",
  },
  icon: {
    width: "16@s",
    height: "16@s",
    marginLeft: '2@s'
  },
})
