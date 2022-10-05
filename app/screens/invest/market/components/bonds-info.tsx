import React, { useMemo } from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { formatDate, numberWithCommas } from "../../../../constants/variable"
import {
  FONT_BOLD_14,
  FONT_MEDIUM_12,
  MARGIN_BOTTOM_4,
  MARGIN_BOTTOM_8,
  MARGIN_TOP_16,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"

interface Props {
  data: any
}

interface ItemProps {
  title: string
  content: string
  style?: ViewStyle | any
}

interface ItemVerticalProps {
  title: string
  content: string
  textAlign?: "left" | "right"
}


const Item = React.memo(({ title, content, style }: ItemProps) => {
  return (
    <View style={[ROW, SPACE_BETWEEN, style]}>
      <AppText value={title} style={[FONT_MEDIUM_12, MARGIN_BOTTOM_4]} color={color.primary} />
      <AppText value={content} style={FONT_MEDIUM_12} />
    </View>
  )
})

const ItemVertical = React.memo(({ title, content, textAlign = "left" }: ItemVerticalProps) => {
  return (
    <View>
      <AppText value={title} fontSize={ms(11)} color={color.text} style={MARGIN_BOTTOM_4} textAlign={textAlign} />
      <AppText value={content} fontSize={ms(11)} color={color.text} fontFamily={fontFamily.bold}
               textAlign={textAlign} />
    </View>
  )
})


const BondsInfo = React.memo(({ data }: Props) => {
  const maxInterest = useMemo(() => {
    return data?.info?.interestRate
      .filter((e) => e?.rate)
      .reduce((previousValue, nextValue) =>
        previousValue?.rate > nextValue?.rate ? previousValue : nextValue,
      )
  }, [data])
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={[ROW, SPACE_BETWEEN, MARGIN_BOTTOM_8]}>
          <ItemVertical title={"Mã sản phẩm"} content={"Quỹ trái phiếu"} />
          <ItemVertical title={"Tên TCPH:"} content={numberWithCommas(data?.org?.name)} textAlign={"right"} />
        </View>
        <View style={[ROW, SPACE_BETWEEN]}>
          <ItemVertical title={"Mã trái phiếu:"} content={data?.productCodeOfTheInvestor} />
          <ItemVertical title={"Ngày đáo hạn:"} content={formatDate(data?.info?.maturityDate)} textAlign={"right"} />
        </View>

      </View>
      <View style={styles.body}>
        <Item title={"Kì hạn trái phiếu:"} content={`${maxInterest?.time} tháng`} style={styles.itemMargin} />
        <Item title={"Mệnh giá:"} content={`${numberWithCommas(data?.info?.parValueShares)} VNĐ/trái phiếu`}
              style={styles.itemMargin} />
        <Item title={"Khối lượng chào bán:"} content={`${numberWithCommas(data?.info?.totalReleaseVolume)} trái phiếu`}
              style={styles.itemMargin} />
        <Item title={"Lãi suất:"} content={`${maxInterest?.rate}%/ năm`} style={styles.itemMargin} />
        <Item title={"Kỳ trả lãi:"} content={`${maxInterest?.time} tháng`} style={styles.itemMargin} />
        <Item title={"Ngày phát hành:"} content={formatDate(data?.info?.releaseDate)} style={styles.itemMargin} />
        <Item title={"Phí giao dịch:"} content={"0"} />
      </View>
      <AppText value={'Thông tin doanh nghiệp'} fontSize={ms(20)} color={color.primary} style={MARGIN_TOP_16}/>
      <AppText value={data?.org?.name} style={FONT_BOLD_14}/>
    </View>
  )
})

export default BondsInfo

const styles = ScaledSheet.create({
  container: {
    padding: "16@s",
  },
  infoContainer: {
    backgroundColor: color.palette.navi,
    paddingVertical: "20@s",
    paddingHorizontal: "16@s",
    borderRadius: "4@s",
    justifyContent: "space-between",
  },
  body: {
    backgroundColor: "#EEF3FF",
    padding: "12@s",
    borderRadius: "8@s",
    marginTop: "16@s",
  },
  itemMargin: {
    marginBottom: "12@s",
  },
})
