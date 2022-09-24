import React from "react"
import { View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"
import { formatTimeDate, numberWithCommas } from "../../../../constants/variable"
import { ALIGN_CENTER, MARGIN_BOTTOM_16, MARGIN_BOTTOM_4, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import MarketCountdown from "../../components/market-countdown"
import moment from "moment"

interface Props {
}

interface ItemProps {
  title: string
  content: string
  textAlign?: 'left' | 'right'
}

const Item = React.memo(({ title, content, textAlign = 'left'}: ItemProps) => {
  return (
    <View>
      <AppText value={title} fontSize={ms(11)} color={color.text} style={MARGIN_BOTTOM_4} textAlign={textAlign}/>
      <AppText value={content} fontSize={ms(11)} color={color.text} fontFamily={fontFamily.bold}  textAlign={textAlign}/>
    </View>
  )
})

const FundInfo = React.memo((props: Props) => {
  const endDate = moment(new Date()).add("hour", 2)
  const totalTime = moment(endDate).diff(new Date()).toString().slice(0, -3)

  return (
    <View style={styles.container}>
      <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER, MARGIN_BOTTOM_16]}>
        <Item title={"TVPF"} content={"Quỹ trái phiếu"} />
        <Item title={"Thời hạn đặt mua"} content={formatTimeDate(new Date())} textAlign={"right"}/>
      </View>
      <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER]}>
        <Item title={"Giá gần nhất"} content={numberWithCommas("13112.12")} />
        <MarketCountdown totalTime={+totalTime} style={styles.timeContainer} />
      </View>
    </View>
  )
})

export default FundInfo

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.palette.navi,
    flex: 1,
    paddingVertical: "20@s",
    paddingHorizontal: "16@s",
    borderRadius: '4@s'
  },
  timeContainer: {
    backgroundColor: color.background,
  },
})
