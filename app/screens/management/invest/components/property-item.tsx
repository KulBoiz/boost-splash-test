import React from "react"
import { View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { images } from "../../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"
import { ALIGN_CENTER, FONT_BOLD_14, ROW } from "../../../../styles/common-style"
import { checkVolatility, convertToInt } from "../../../../constants/variable"
import { Pressable } from "native-base"
import { mappingLabelTypeOfFund } from "../../../invest/market/constants"

interface Props {
  item?: any
  onOpenSuccess(e: any): void
}

const PropertyItem = React.memo((props: Props) => {
  const { item, onOpenSuccess } = props
  const total = (item?.holdingVolume * (item?.navCurrent - item?.navInvested))?.toFixed(0) ?? 0
  const haveMinus = checkVolatility(item?.interestOrHole)

  return (
    <Pressable style={styles.container} onPress={()=> onOpenSuccess(item)}>
        <View style={[ROW, ALIGN_CENTER]}>
          <FastImage source={images.vinacapital}
                     style={styles.image} />
          <View style={styles.itemContainer}>
            <View>
              <AppText value={item?.code} color={color.primary} style={FONT_BOLD_14}/>
              <AppText value={mappingLabelTypeOfFund(item?.info?.typeOfFund)} color={color.textColor.hint}/>
            </View>

            <View style={{alignItems: 'flex-end'}}>
              <AppText value={`${convertToInt(total)}ᵈ`} fontFamily={fontFamily.bold} color={haveMinus ? color.textColor.error : color.green.green_01}/>
              <View style={[ROW, ALIGN_CENTER]}>
                <AppText value={`${item?.interestOrHole?.toFixed(0)}%`} color={haveMinus ? color.textColor.error : color.green.green_01}/>
                <FastImage source={images.asset_arrow_up} style={[styles.arrow, haveMinus && {transform: [{ rotate: "180deg" }]}]} tintColor={haveMinus ? color.textColor.error : color.green.green_01}/>
              </View>
            </View>
          </View>
        </View>

    </Pressable>
  )
})

export default PropertyItem

const styles = ScaledSheet.create({
  container: {
    marginBottom: "12@s",
    borderWidth: 1,
    borderRadius: '8@s',
    padding: '12@s',
    borderColor: color.palette.E9EBEF
  },
  itemContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: "14@ms",
    fontFamily: fontFamily.regular,
    fontWeight: "500",
  },
  icon: {
    width: "34@s",
    height: "34@s",
  },
  arrow: {
    width: '6@s',
    height: '12@s',
    marginLeft: '2@s'
  },
  image: {
    width: "34@s",
    height: "34@s",
    borderRadius: "4@s",
    marginRight: '8@s'
  },
})
