import React, { useCallback } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import {
  ALIGN_CENTER,
  FONT_BOLD_14,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_16,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"
import { hexToRgbA, numberWithCommas } from "../../../../constants/variable"
import { color } from "../../../../theme"
import { ms, ScaledSheet } from "react-native-size-matters"
import PropertyItem from "./property-item"
import { FastImage } from "../../../../components/fast-image/fast-image"
import { images } from "../../../../assets/images"
import { PieChart } from "react-native-gifted-charts"
import { fontFamily } from "../../../../constants/font-family"

interface Props {
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
      <AppText value={content} color={color.text} fontFamily={fontFamily.bold}/>
    </View>
  )
})

const green = "#4CD864"
const yellow = "#FBE947"
const cyan = "#76FFFF"

const PropertyInfo = React.memo((props: Props) => {
  const renderItem = useCallback(({ item }) => {
    return <PropertyItem item={item} />
  }, [])

  const pieData = [
    { value: 35, color: cyan, text: "35%" },
    { value: 15, color: yellow, text: "15%" },
    { value: 35, color: green, text: "35%" },
  ]

  return (
    <View style={styles.container}>
      <FastImage source={images.invest_background} style={styles.image}>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={ms(75)}
            innerRadius={ms(60)}
            innerCircleColor={"#143B82"}
          />
        </View>

        <View style={styles.body}>
          <Item title={"Giá trị đang bán/ chuyển đổi"} value={`${numberWithCommas(0)}`} style={MARGIN_BOTTOM_16} />
          <Item title={"Giá trị đầu tư trung bình"} value={`${numberWithCommas(12312312)} VNĐ`}
                style={MARGIN_BOTTOM_16} />
          <RenderLabel backgroundColor={cyan} title={"Quỹ trái phiếu"} content={`%`} style={styles.item} />
          <RenderLabel backgroundColor={yellow} title={"Quỹ cổ phiếu"} content={`%`} style={styles.item} />
          <RenderLabel backgroundColor={green} title={"Quỹ cân bằng"} content={`%`} />
        </View>
      </FastImage>

      <FlatList keyExtractor={(e, i) => i.toString()} data={[0]} renderItem={renderItem}
                contentContainerStyle={styles.flatList} />
    </View>
  )
})

export default PropertyInfo

const styles = ScaledSheet.create({
  container: {
    padding: '16@s'
  },
  image: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: "14@s",
    borderRadius: '8@s'
  },
  chartContainer:{
    alignItems: "center",
    marginBottom: '-16@s'
  },
  flatList: {
    paddingVertical: "12@s",
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
