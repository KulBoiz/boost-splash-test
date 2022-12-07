import React from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import {
  ALIGN_CENTER,
  FONT_BOLD_12,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_4,
  MARGIN_BOTTOM_8,
  MARGIN_TOP_16, MARGIN_TOP_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"
import { checkVolatility, numberWithCommas } from "../../../../constants/variable"
import { fontFamily } from "../../../../constants/font-family"
import FastImage from "react-native-fast-image"
import { images } from "../../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
  item: any
}

interface ItemProps {
  leftTitle: string
  rightTitle: string
  textColor?: string
  leftStyle?: TextStyle | any
  rightStyle?: TextStyle | any
  style?: ViewStyle | any
  showIcon?: boolean
}

const Item = React.memo((props: ItemProps) => {
  const { leftTitle, rightTitle, rightStyle, textColor, leftStyle, style, showIcon = false } = props
  const haveMinus = checkVolatility(rightTitle)

  return (
    <View style={[ROW, SPACE_BETWEEN, style]}>
      <AppText value={leftTitle} style={leftStyle} color={textColor ?? color.textColor.hint} />
      <View style={[ROW, ALIGN_CENTER]}>
        <AppText value={rightTitle} style={rightStyle} color={textColor ?? color.textColor.hint} />
        {showIcon && <FastImage source={images.asset_arrow_up} style={[styles.arrow, haveMinus && {transform: [{ rotate: "180deg" }]}]} tintColor={haveMinus ? color.textColor.error : color.green.green_01}/>}
      </View>
    </View>
  )
})

const PropertyDetailItem = React.memo(({ item }: Props) => {
  const total = ((item?.navCurrent - item?.navInvested) * item?.holdingVolume).toFixed(2)
  const haveMinus = checkVolatility(item?.interestOrHole)

  return (
    <View style={styles.container}>
      <Item leftTitle={`Tổng lợi nhuận`} rightTitle={`Tỉ suất lợi nhuận`} style={MARGIN_BOTTOM_4} />
      <Item leftTitle={`${numberWithCommas(total)}ᵈ`} rightTitle={`${item?.interestOrHole?.toFixed(2)}%`} showIcon leftStyle={{ fontFamily: fontFamily.semiBold }}
            textColor={haveMinus ? color.textColor.error : color.green.green_01} />
      <Item leftTitle={`Chương trình`} rightTitle={`Lợi nhuận`} style={[MARGIN_TOP_16, MARGIN_BOTTOM_4]} />
      {item?.productProgramList?.map((val, id) => (
        <Item key={id} style={MARGIN_BOTTOM_8} leftTitle={val?.nameEn} leftStyle={FONT_REGULAR_12}
              rightStyle={FONT_BOLD_12} textColor={color.palette.black}
              rightTitle={`${numberWithCommas((val?.holdingVolume * (item?.navCurrent - item?.navInvested))?.toFixed(2))}ᵈ`} />
      ))}
      <Item leftTitle={`Số lượng CCQ`} rightTitle={`Giá hiện tại`} style={[MARGIN_TOP_8, MARGIN_BOTTOM_4]}/>
      <Item leftTitle={item?.holdingVolume} leftStyle={FONT_REGULAR_12} rightStyle={FONT_BOLD_12}
            rightTitle={`${numberWithCommas(item?.navCurrent)}ᵈ`} textColor={color.palette.black} />
    </View>
  )
})

export default PropertyDetailItem

const styles = ScaledSheet.create({
  container: {},
  arrow: {
    width: '6@s',
    height: '12@s',
    marginLeft: '2@s'
  },
})
