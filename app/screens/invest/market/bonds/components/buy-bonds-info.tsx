import React from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../../../components/app-text/AppText"
import {
  ALIGN_CENTER,
  FONT_BOLD_12,
  FONT_REGULAR_12, FONT_REGULAR_14, MARGIN_BOTTOM_16,
  MARGIN_BOTTOM_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../../styles/common-style"
import { color } from "../../../../../theme"
import { hexToRgbA } from "../../../../../constants/variable"
import FastImage from "react-native-fast-image"
import { FinaPaySvg } from "../../../../../assets/svgs"
import ItemSelect from "../../../components/item-select"
import { fontFamily } from "../../../../../constants/font-family"

interface Props {
  detail: any
}

interface ItemProps {
  title: string
  content: string
  style?: ViewStyle | any
  contentColor?: string

}

const Item = React.memo(({ title, content, style, contentColor }: ItemProps) => {
  return (
    <View style={[ROW, SPACE_BETWEEN]}>
      <View style={[ROW, ALIGN_CENTER, style]}>
        <View style={styles.smallCircle} />
        <AppText value={title} style={FONT_REGULAR_12} />
      </View>
      <AppText value={content} color={contentColor ?? color.palette.black} style={FONT_BOLD_12}/>
    </View>
  )
})

const BuyBondsInfo = React.memo(({ detail }: Props) => {
  const tax = detail?.tax ?? 0
  return (
    <View>
      <View style={styles.container}>
        <Item title={"Lãi suất dự kiến (nhận lãi cuối kỳ)"} content={`${detail?.info?.interestPeriod ?? 0}%/năm`} style={MARGIN_BOTTOM_8} contentColor={color.primary}/>
        <Item title={"Phí giao dịch"} content={`${tax}%`} />
      </View>

      <View style={styles.paymentContainer}>
        <AppText value={'Phương thức thanh toán nhà cung cấp yêu cầu'} fontFamily={fontFamily.bold} style={MARGIN_BOTTOM_16}/>
        <ItemSelect />
      </View>
    </View>
  )
})

export default BuyBondsInfo

const styles = ScaledSheet.create({
  container: {
    backgroundColor: hexToRgbA(color.primary, 0.1),
    padding: "16@s",
  },
  paymentContainer:{
    paddingHorizontal: '16@s',
    paddingVertical: '20@s'
  },
  smallCircle: {
    width: "2@s",
    height: "2@s",
    borderRadius: "1@s",
    backgroundColor: color.palette.black,
    marginRight: "10@s",

  },
})
