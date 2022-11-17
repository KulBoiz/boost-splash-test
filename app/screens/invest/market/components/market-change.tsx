import React from 'react';
import { View } from 'react-native';
import { ALIGN_CENTER, FONT_BOLD_14, MARGIN_BOTTOM_4, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { AppText } from "../../../../components/app-text/AppText"
import { checkVolatility, formatDate } from "../../../../constants/variable"
import { color } from "../../../../theme"
import { MARKET_CONTAINER } from "../../styles"
import { get, head } from "lodash"

interface Props{
  item?: any
  navs: any
}

const green = '#049E26'

const MarketChange = React.memo(({ item, navs }: Props) => {
  const navDate = get(head(navs), 'navDate')
  const volatility = item?.info?.volatilityOverTime?.inOneYear

  return (
    <View style={MARKET_CONTAINER}>
        <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER, MARGIN_BOTTOM_4]}>
          <AppText value={"Thay đổi so với đầu năm"} style={FONT_BOLD_14}/>
          <AppText value={`${checkVolatility(volatility) ? '' : '+'}${volatility ?? 0}%`} style={FONT_BOLD_14}
                   color={checkVolatility(volatility) ? color.palette.down : green}/>
        </View>
      <AppText value={formatDate(navDate)} />

    </View>
  )
});

export default MarketChange;

