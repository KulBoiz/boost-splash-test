import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from "../../../../components/app-text/AppText"
import { numberWithCommas } from "../../../../constants/variable"
import { MARKET_CONTAINER } from "../../styles"
import { fontFamily } from "../../../../constants/font-family"
import { color } from "../../../../theme"
import { ms } from "react-native-size-matters"
import MarketCountdown from "../../components/market-countdown"
import moment from "moment"
import { MARGIN_BOTTOM_4, MARGIN_BOTTOM_8 } from "../../../../styles/common-style"
import { get, last } from "lodash"

interface Props{
  data: any
}

const NearestPrice = React.memo(({ data }: Props) => {
  const {priceUpdateHistories} = data?.info
  const endDate = moment(new Date()).add('hour', 2)
  const totalTime = moment(endDate).diff(new Date()).toString().slice(0, -3);
  const currentNav = get(last(priceUpdateHistories), 'price')

  return (
    <View style={[MARKET_CONTAINER, styles.container]}>
      <View>
        <AppText value={'Giá gần nhất'} fontSize={ms(14)} color={color.palette.osloGray} style={MARGIN_BOTTOM_4}/>
        <AppText value={numberWithCommas(currentNav)} fontFamily={fontFamily.bold} fontSize={ms(30)} color={color.primary}/>
        <AppText value={'Quỹ trái phiếu'} fontFamily={fontFamily.semiBold} color={color.palette.green}/>
      </View>

      <View>
        <AppText value={'Thời hạn đặt mua'} fontFamily={fontFamily.bold} fontSize={ms(11)} textAlign={"right"}/>
        <AppText value={'15:40 03/08/2022 (Giờ VN)'} fontSize={ms(11)} textAlign={"right"} style={MARGIN_BOTTOM_8}/>
        <MarketCountdown totalTime={+totalTime}/>
      </View>
    </View>
  )
});

export default NearestPrice;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
});
