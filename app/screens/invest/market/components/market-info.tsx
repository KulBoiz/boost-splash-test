import React from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { numberWithCommas } from "../../../../constants/variable"
import { FONT_MEDIUM_12, MARGIN_BOTTOM_4 } from "../../../../styles/common-style"
import { color } from "../../../../theme"
import { get, head } from "lodash"
import { mappingLabelTypeOfFund } from "../constants"

interface Props{
  data: any
  navs: any
}
interface ItemProps{
  title: string
  content: string
  style?: ViewStyle | any
}

const Item = React.memo(({title, content, style}: ItemProps)=> {
  return(
    <View style={style}>
      <AppText value={title} style={[FONT_MEDIUM_12, MARGIN_BOTTOM_4]} color={color.primary}/>
      <AppText value={content} style={FONT_MEDIUM_12}/>
    </View>
  )
})
const MarketInfo = React.memo(({ data, navs}: Props) => {
  const conversionFee = data?.info?.conversionFee
  const currentNav = get(head(navs), 'nav')
  // const program = data?.info?.programList ? data?.info?.programList?.map(e=> e.name).join(', ') : null
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Item title={'Tên quỹ đầu tư'} content={data?.name} style={styles.itemMargin}/>
        <Item title={'Tổ chức phát hành'} content={data?.org?.name}  style={styles.itemMargin}/>
        <Item title={'Giá gần nhất'} content={numberWithCommas(currentNav)}  style={styles.itemMargin}/>
        <Item title={'Loại đầu tư'} content={mappingLabelTypeOfFund(data?.info?.typeOfFund)}  style={styles.itemMargin}/>
         {/* {program && <Item title={'Chương trình đầu tư'} content={program}  style={styles.itemMargin}/> } */}
        <Item title={'Phí chuyển đổi'} content={conversionFee ? `${conversionFee}%` : '0%'} />
      </View>
    </View>
  )
});

export default MarketInfo;

const styles = ScaledSheet.create({
    container: {},
  body: {
    backgroundColor: '#EEF3FF',
    padding: '12@s',
    borderRadius: '8@s',
    // marginTop: '16@s'
  },
  itemMargin: {
      marginBottom: '12@s'
  }
});
