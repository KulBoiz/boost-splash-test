import React from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { formatDate, getMoneyLabel, hexToRgbA, numberWithCommas } from "../../../../../constants/variable"
import {
  FONT_BOLD_12,
  FONT_MEDIUM_12, FONT_SEMI_BOLD_12, MARGIN_BOTTOM_16,
  MARGIN_BOTTOM_4, MARGIN_BOTTOM_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../../styles/common-style"
import { color } from "../../../../../theme"
import { presets } from "../../../../../constants/presets"

interface Props {
  data: any
}

interface ItemProps {
  title: string
  content: string
  contentColor?: string
  style?: ViewStyle | any
}

interface NavItemProps {
  title: string
  amount: any
}

const NavItem = React.memo(({ title, amount }: NavItemProps) => {
  return (
    <View style={styles.item}>
      <AppText value={title} style={[FONT_MEDIUM_12, MARGIN_BOTTOM_4]} />
      <AppText value={amount} style={FONT_BOLD_12} numberOfLines={2} textAlign={'center'}/>
    </View>
  )
})

const Item = React.memo(({ title, content, style, contentColor }: ItemProps) => {
  return (
    <View style={[ROW, SPACE_BETWEEN, style]}>
      <AppText value={title} style={[FONT_MEDIUM_12, MARGIN_BOTTOM_4]} color={color.palette.deepGray} />
      <AppText value={content} style={FONT_SEMI_BOLD_12} color={contentColor ?? color.palette.black} />
    </View>
  )
})

const BondsInfo = React.memo(({ data }: Props) => {
  const org = data?.org
  const info = data?.info
  const { interestPeriod, maturityDate, parValueShares, totalReleaseVolume, releaseDate, tax } = info;
  const totalPar = totalReleaseVolume * parValueShares
  const haveInterestPeriod = interestPeriod ? `${interestPeriod} tháng` : 'Nhận lãi cuối kì'
  const interests = info?.interestRate?.filter(e => e?.rate) || [];
  const maxInterest = interests.length ? interests.reduce((a, b) => a.rate > b.rate ? a : b) : 0;

  return (
    <View style={styles.container}>
      <AppText value={'Thông tin trái phiếu'} style={[presets.label, MARGIN_BOTTOM_8]} color={color.primary}/>
      <View style={styles.itemContainer}>
        <NavItem title={"Mã sản phẩm"} amount={data?.sku} />
        <NavItem title={"Mã trái phiếu"} amount={data?.productCodeOfTheInvestor} />
      </View>
      <View style={styles.itemContainer}>
        <NavItem title={"Ngày đáo hạn"} amount={formatDate(maturityDate)} />
        <NavItem title={"Tên TCPH"} amount={org?.name}/>
      </View>

      <View style={styles.body}>
        <Item title={"Kì hạn trái phiếu:"} content={`${maxInterest?.time} tháng`} style={styles.itemMargin} />
        <Item title={"Tổng mệnh giá phát hành:"} content={getMoneyLabel(totalPar)} style={styles.itemMargin} />
        <Item title={"Mệnh giá:"} content={`${numberWithCommas(parValueShares)} VNĐ/trái phiếu`}
              style={styles.itemMargin} />
        <Item title={"Khối lượng chào bán:"} content={`${numberWithCommas(totalReleaseVolume)} trái phiếu`}
              style={styles.itemMargin} />
        <Item title={"Lãi suất:"} content={`${maxInterest?.rate}%/ năm`} style={styles.itemMargin} contentColor={color.palette.green} />
        <Item title={"Kỳ trả lãi:"} content={haveInterestPeriod} style={styles.itemMargin} contentColor={color.palette.orange} />
        <Item title={"Ngày phát hành:"} content={formatDate(releaseDate)} />
      </View>
    </View>
  )
})

export default BondsInfo

const styles = ScaledSheet.create({
  container: {
    padding: "16@s",
    borderBottomWidth: 4,
    borderBottomColor: hexToRgbA(color.palette.D9D9D9, 0.4),
    marginBottom: '12@s'
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: '12@s'
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    margin: "4@s",
    paddingHorizontal: '8@s',
    height: '70@s',
    borderRadius: "8@s",
  },
  body: {
    padding: "12@s",
    borderRadius: "8@s",
    marginTop: "16@s",
    borderWidth: 1,
    borderColor: color.primary
  },
  itemMargin: {
    marginBottom: "12@s",
  },
})
