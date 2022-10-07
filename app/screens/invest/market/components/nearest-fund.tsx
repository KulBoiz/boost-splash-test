import React from "react"
import { View } from 'react-native';
import { MARKET_CONTAINER } from "../../styles"
import { AppText } from "../../../../components/app-text/AppText"
import { FONT_BOLD_12, FONT_BOLD_14, FONT_MEDIUM_12, MARGIN_BOTTOM_4 } from "../../../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { numberWithCommas } from "../../../../constants/variable"
import {maxBy, get, minBy, last} from 'lodash'

interface Props{
  data: any
}
interface NavItemProps{
  title: string
  amount: any
}

const NavItem = React.memo(({ title, amount }: NavItemProps)=> {
  return(
    <View style={styles.item}>
      <AppText value={title} style={[FONT_MEDIUM_12, MARGIN_BOTTOM_4]}/>
      <AppText value={`${numberWithCommas(amount)} vnđ`} style={FONT_BOLD_12}/>
    </View>
  )
})

const NearestFund = React.memo(({ data }: Props) => {
  const {info} = data
  const {priceUpdateHistories} = info

  const currentNav = get(last(priceUpdateHistories), 'price')
  const highestNav = get(maxBy(priceUpdateHistories, 'price'), 'price')
  const lowestNav = get(minBy(priceUpdateHistories, 'price'), 'price')

  return (
    <View style={MARKET_CONTAINER}>
      <AppText value={"Giá đơn vị quỹ gần nhất"} style={FONT_BOLD_14}/>
      <View style={styles.itemContainer}>
        <NavItem title={'NAV hiện tại'} amount={numberWithCommas(currentNav)}/>
        <NavItem title={'NAV cao nhất'} amount={numberWithCommas(highestNav)}/>
        <NavItem title={'NAV thấp nhất'} amount={numberWithCommas(lowestNav)}/>
      </View>
    </View>
  )
});

export default NearestFund;

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: '12@s'
  },
  item: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#F5F5F5',
    marginHorizontal: '5@s',
    paddingVertical: "16@s",
    borderRadius: "8@s",
  },
});
