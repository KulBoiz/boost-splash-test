import React, { useCallback } from 'react';
import { FlatList, View, ViewStyle } from "react-native"
import { AppText } from '../../../../components/app-text/AppText';
import { ALIGN_CENTER, FONT_BOLD_14, FONT_REGULAR_12, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { hexToRgbA, numberWithCommas } from "../../../../constants/variable"
import { color } from "../../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import PropertyItem from "./property-item"
import { FastImage } from "../../../../components/fast-image/fast-image"
import { images } from "../../../../assets/images"
// import { PieChart } from "react-native-gifted-charts";

interface Props{}

interface LabelProps{
  backgroundColor: string
  title: string
  content: string
}

interface ItemProps{
  title: string
  value: string
  style?: ViewStyle | any
}

const Item  = React.memo(({title, value, style}: ItemProps)=> {
  return (
    <View style={style}>
      <AppText value={title} style={FONT_REGULAR_12} color={hexToRgbA(color.text, 0.6)}/>
      <AppText value={value} style={FONT_BOLD_14} color={color.text}/>
    </View>
  )
})

const RenderLabel = React.memo(({backgroundColor, title, content }: LabelProps)=> {
  return (
    <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
      <View style={[styles.square, {backgroundColor}]}/>
      <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
        <AppText value={title} color={hexToRgbA(color.text, 0.6)}/>
        <AppText value={content} color={color.text}/>
      </View>
    </View>
  )
})

const green = '#4CD864'
const yellow = '#FBE947'
const cyan = '#76FFFF'

const PropertyInfo = React.memo((props: Props) => {
  const renderItem = useCallback(({item})=> {
    return <PropertyItem item={item}/>
  },[])

  const pieData = [
    {value: 54, color: cyan, text: '54%'},
    {value: 40, color: yellow, text: '30%'},
    {value: 20, color: green, text: '26%'},
  ];

  return (
    <View style={styles.container}>
      <FastImage source={images.invest_background} style={styles.image}>

        {/* <PieChart */}
        {/* donut */}
        {/* isThreeD */}
        {/* showText */}
        {/* textColor="black" */}
        {/* radius={170} */}
        {/* textSize={20} */}
        {/* showTextBackground */}
        {/* textBackgroundRadius={26} */}
        {/* data={pieData} */}
        {/* /> */}
      <View style={styles.body}>
        <Item title={'Giá trị đang bán/ chuyển đổi'} value={`${numberWithCommas(0)}`}/>
        <Item title={'Giá trị đầu tư trung bình'} value={`${numberWithCommas(12312312)} VNĐ`}/>
        <RenderLabel backgroundColor={cyan} title={'Quỹ trái phiếu'} content={`%`} />
        <RenderLabel backgroundColor={yellow} title={'Quỹ cổ phiếu'} content={`%`} />
        <RenderLabel backgroundColor={green} title={'Quỹ cân bằng'} content={`%`} />
      </View>
      </FastImage>

      <FlatList keyExtractor={(e,i) => i.toString()} data={[0,1]} renderItem={renderItem} contentContainerStyle={styles.flatList} />
    </View>
  )
});

export default PropertyInfo;

const styles = ScaledSheet.create({
    container: {},
  image:{
    width: '100%',
    paddingVertical: '16@s'
  },
  flatList: {
    paddingHorizontal: '16@s',
    paddingVertical: '12@s'
  },
  square: {
      width: '10@s',
    height: '10@s',
    marginRight: '8@s'
  },
  body: {
      width: '50%'
  }
});
