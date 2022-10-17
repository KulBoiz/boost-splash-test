import React from 'react';
import { View } from 'react-native';
import { ALIGN_CENTER, FONT_BOLD_14, MARGIN_BOTTOM_4, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { AppText } from "../../../../components/app-text/AppText"
import { formatDate } from "../../../../constants/variable"
import { color } from "../../../../theme"
import { MARKET_CONTAINER } from "../../styles"

interface Props{}

const MarketChange = React.memo((props: Props) => {
  return (
    <View style={MARKET_CONTAINER}>
        <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER, MARGIN_BOTTOM_4]}>
          <AppText value={"Thay đổi so với đầu năm"} style={FONT_BOLD_14}/>
          <AppText value={"+0%"} style={FONT_BOLD_14} color={color.palette.green}/>
        </View>
      <AppText value={formatDate(new Date())} />

    </View>
  )
});

export default MarketChange;

