import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { formatDate, numberWithCommas } from "../../../../constants/variable"
import {
  FONT_BOLD_14,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_4,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"
import { color } from "../../../../theme"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
  data: any
  navs: any
}

const Item = React.memo(({ item }: any) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <AppText value={"Tại ngày"} style={[FONT_REGULAR_12, MARGIN_BOTTOM_4]} color={color.palette.grayChateau} />
        <AppText value={formatDate(item?.navDate)} style={FONT_REGULAR_12} />
      </View>
      <View>
        <AppText value={"NAV/CCQ"} style={[FONT_REGULAR_12, MARGIN_BOTTOM_4]} color={color.palette.grayChateau}
                 textAlign={"right"} />
        <AppText value={`${numberWithCommas(item?.nav)} vnđ`} style={FONT_REGULAR_12} textAlign={"right"} />
      </View>
    </View>
  )
})
const MarketHistory = React.memo(({ data, navs }: Props) => {
  const [showMore, setShowMore] = useState(false)
  const fiveNavs = navs.slice(0, 5)
  const history = (showMore ? navs : fiveNavs) ?? []

  const toggleShowMore = useCallback(() => {
    setShowMore(!showMore)
  }, [showMore])

  return (
    <View style={styles.container}>
      <View style={[ROW, SPACE_BETWEEN]}>
        <AppText value={"Danh sách phiên giao dịch"} style={FONT_BOLD_14} />
        {navs.length > 5 &&
          <AppText value={!showMore ? "Xem thêm" : "Ẩn bớt"} style={FONT_REGULAR_12} color={color.primary}
                   onPress={toggleShowMore} />
        }
      </View>
      {history.map((item, index) => {
        return <Item key={index} item={item} />
      })}
    </View>
  )
})

export default MarketHistory

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "12@s",
    borderBottomWidth: 1,
    borderBottomColor: "#D9D9D9",

  },
})
