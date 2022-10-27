import React from "react"
import { View } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../../theme"
import { fontFamily } from "../../../../../constants/font-family"
import { formatTimeDate, numberWithCommas, truncateString } from "../../../../../constants/variable"
import { ALIGN_CENTER, MARGIN_BOTTOM_16, MARGIN_BOTTOM_4, ROW, SPACE_BETWEEN } from "../../../../../styles/common-style"
import MarketCountdown from "../../../components/market-countdown"
import moment from "moment"
import { useStores } from "../../../../../models"
import { get } from "lodash"
import { mappingLabelTypeOfFund } from "../../constants"

interface Props {
  navs: any
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

const FundInfo = React.memo(({ navs }: Props) => {
  const {investStore} = useStores()
  const {bondsDetail} = investStore
  const orderAndTransferMoneyToBuyDate = bondsDetail?.info?.orderAndTransferMoneyToBuyDate
  const endDate = moment(orderAndTransferMoneyToBuyDate)
  const totalTime = moment(endDate).diff(new Date()).toString().slice(0, -3)
  const currentNav = get(navs[0], 'nav')

  return (
    <View style={styles.container}>
      <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER, MARGIN_BOTTOM_16]}>
        <Item title={truncateString(bondsDetail?.name, 30)} content={mappingLabelTypeOfFund(bondsDetail?.info?.typeOfFund)} />
        <Item title={"Thời hạn đặt mua"} content={formatTimeDate(orderAndTransferMoneyToBuyDate)} textAlign={"right"}/>
      </View>
      <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER]}>
        <Item title={"Giá gần nhất"} content={numberWithCommas(currentNav)} />
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
