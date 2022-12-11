import React from "react"
import { View, ViewStyle } from "react-native"
import { ALIGN_CENTER, MARGIN_BOTTOM_16, ROW, SPACE_BETWEEN } from "../../../../../styles/common-style"
import MarketCountdown from "../../../components/market-countdown"
import { AppText } from "../../../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../../../constants/font-family"
import { color } from "../../../../../theme"
import moment from "moment"
import { formatDate, formatTimeDate, numberWithCommas } from "../../../../../constants/variable"
import { get, head } from "lodash"

interface Props {
  data: any
}

interface ItemProps {
  title: string
  content: string
  style?: ViewStyle | any
  alignRight?: boolean
}


const Item = React.memo(({ title, content, style, alignRight }: ItemProps) => {
  return (
    <View style={style}>
      <AppText value={title} fontSize={ms(11)} fontFamily={fontFamily.regular} textAlign={alignRight ? "right" : "left"}
               color={color.text} />
      <AppText value={content} fontSize={ms(11)} fontFamily={fontFamily.bold} textAlign={alignRight ? "right" : "left"}
               color={color.text} />
    </View>
  )
})

const SaleFundInformation = React.memo(({ data }: Props) => {
  const endDate = moment(data?.info?.closedOrderBookTime).add(1, 'day')
  const totalTime = moment(endDate).diff(new Date()).toString().slice(0, -3)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={[ROW, SPACE_BETWEEN]}>
          <Item title={"Phiên giao dịch"} content={`${formatDate(data?.info?.preOrderMatchingSession)}`} />
          <Item title={"Thời điểm đóng sổ lệnh"} alignRight content={formatTimeDate(data?.info?.closedOrderBookTime)} style={MARGIN_BOTTOM_16} />
        </View>
        <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER]}>
          <MarketCountdown totalTime={+totalTime} style={styles.timeContainer} />
          <Item title={"NAV/CCQ kỳ trước"} content={`${numberWithCommas(data?.info?.navCurrently)}đ`} alignRight />
        </View>
      </View>
    </View>
  )
})

export default SaleFundInformation

const styles = ScaledSheet.create({
  container: {},
  timeContainer: {
    backgroundColor: color.background,
  },
  headerContainer: {
    paddingHorizontal: "16@s",
    paddingVertical: "20@s",
    backgroundColor: color.palette.navi,
    borderRadius: "4@s",
  },
})
