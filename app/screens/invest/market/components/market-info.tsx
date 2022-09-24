import React from 'react';
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { numberWithCommas } from "../../../../constants/variable"
import { FONT_MEDIUM_12, MARGIN_BOTTOM_4 } from "../../../../styles/common-style"
import { color } from "../../../../theme"

interface Props{}
interface ItemProps{
  title: string
  content: string
  style?: ViewStyle | any
}
const testTitle = 'TVPF là quỹ đầu tư trái phiếu với chiến lược đầu tư trung và dài hạn (1-2 năm) để mang lại lợi nhuận ổn định'

const Item = React.memo(({title, content, style}: ItemProps)=> {
  return(
    <View style={style}>
      <AppText value={title} style={[FONT_MEDIUM_12, MARGIN_BOTTOM_4]} color={color.primary}/>
      <AppText value={content} style={FONT_MEDIUM_12}/>
    </View>
  )
})
const MarketInfo = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={testTitle} fontSize={ms(16)}/>
      <View style={styles.body}>
        <Item title={'Tên quỹ đầu tư'} content={'QUY DAU TU TRAI PHIEU BAO THINH FINACAPITAL'} style={styles.itemMargin}/>
        <Item title={'Tổ chức phát hành'} content={'VINA Capital'}  style={styles.itemMargin}/>
        <Item title={'Giá gần nhất'} content={numberWithCommas(223213.123)}  style={styles.itemMargin}/>
        <Item title={'Tài sản đầu tư'} content={'Trái phiếu, Công cụ có thu nhập ổn định'}  style={styles.itemMargin}/>
        <Item title={'Phí chuyển đổi'} content={'0%'} />
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
    marginTop: '16@s'
  },
  itemMargin: {
      marginBottom: '12@s'
  }
});
