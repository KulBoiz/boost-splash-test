import React from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import {
  ALIGN_CENTER,
  FONT_BOLD_14,
  FONT_REGULAR_12, FONT_SEMI_BOLD_14,
  MARGIN_BOTTOM_16, MARGIN_BOTTOM_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"
import { hexToRgbA, numberWithCommas } from "../../../../constants/variable"
import { color } from "../../../../theme"
import { ms, ScaledSheet } from "react-native-size-matters"
import { FastImage } from "../../../../components/fast-image/fast-image"
import { images } from "../../../../assets/images"
import { PieChart } from "react-native-gifted-charts"
import { fontFamily } from "../../../../constants/font-family"

interface Props {
  asset: Array<any>
}

interface LabelProps {
  backgroundColor: string
  title: string
  content: string
  style?: any
}

interface ItemProps {
  title: string
  value: string
  style?: ViewStyle | any
}

const Item = React.memo(({ title, value, style }: ItemProps) => {
  return (
    <View style={style}>
      <AppText value={title} style={FONT_REGULAR_12} color={hexToRgbA(color.text, 0.6)} />
      <AppText value={value} style={FONT_BOLD_14} color={color.text} />
    </View>
  )
})

const RenderLabel = React.memo(({ backgroundColor, title, content, style }: LabelProps) => {
  return (
    <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, style]}>
      <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
        <View style={[styles.square, { backgroundColor }]} />
        <AppText value={title} color={hexToRgbA(color.text, 0.6)} />
      </View>
      <AppText value={content} color={color.text} fontFamily={fontFamily.bold} />
    </View>
  )
})

const green = "#4CD864"
const yellow = "#FBE947"
const cyan = "#76FFFF"
const pink = "#FF4FB8"

const PropertyInfo = React.memo(({ asset }: Props) => {
  let totalFund = 0;
  const totalBond = 0;
  const totalMoney = 0;

  if (asset.length > 0) {
    asset.forEach((fund: any) => {
      totalFund = totalFund + fund?.navCurrent * fund?.holdingVolume;
    });
  }

  const total = totalFund + totalBond;

  const pieData = [
    { value: totalBond, color: cyan, text: "35%" },
    { value: totalFund, color: yellow, text: "15%" },
    { value: totalMoney, color: green, text: "35%" },
    { value: 0, color: pink, text: "15%" },
  ]

  return (
    <View style={styles.container}>
      <FastImage source={images.asset_background} style={styles.image}>
        <View style={ROW}>
          <Item title={"Giá trị đang bán/ chuyển đổi"} value={`${numberWithCommas(0)} VNĐ`}
                style={MARGIN_BOTTOM_16} />
          <View style={{width: '8%'}}/>
          <Item title={"Giá trị đầu tư"} value={`${numberWithCommas(total)} VNĐ`}
                style={MARGIN_BOTTOM_16} />
        </View>
        <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, MARGIN_BOTTOM_16]}>
          <View style={styles.chartContainer}>
            <PieChart
              data={pieData}
              donut
              // showGradient
              sectionAutoFocus
              radius={ms(65)}
              innerRadius={ms(40)}
              innerCircleColor={"#0B2EA0"}
            />
          </View>
          <View style={styles.body}>
            <AppText value={'Phân bổ vốn'} style={[FONT_SEMI_BOLD_14, MARGIN_BOTTOM_8]} color={color.text}/>
            <RenderLabel backgroundColor={cyan} title={"Quỹ trái phiếu"} content={`0%`} style={styles.item} />
            <RenderLabel backgroundColor={yellow} title={"Quỹ cổ phiếu"} content={`100%`} style={styles.item} />
            <RenderLabel backgroundColor={green} title={"Quỹ cân bằng"} content={`0%`} style={styles.item} />
            <RenderLabel backgroundColor={pink} title={"Trái phiếu"} content={`0%`} />
          </View>
        </View>
      </FastImage>

    </View>
  )
})

export default PropertyInfo

const styles = ScaledSheet.create({
  container: {
    // padding: "16@s",
  },
  image: {
    width: "100%",
    padding: "16@s",
    // paddingBottom: "-16@s",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: "-16@s",
  },

  square: {
    width: "10@s",
    height: "10@s",
    marginRight: "8@s",
  },
  body: {
    width: "45%",
  },
  item: {
    marginBottom: "12@s",
  },
})
