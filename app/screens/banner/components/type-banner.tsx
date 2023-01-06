import React from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { ALIGN_CENTER, FONT_REGULAR_12, ROW } from "../../../styles/common-style"

interface Props {
  item: any
  type: 'row' | 'column'
}

const TypeBanner = React.memo(({ item, type }: Props) => {
  const isRow = type === 'row'

  return (
    <View style={isRow ? [ROW, ALIGN_CENTER] : undefined}>
      <View  style={[ROW, ALIGN_CENTER , !isRow && { marginBottom: 8 }]}>
        <FastImage source={images.banner_team} style={styles.team} />
        <AppText value={item?.author} style={FONT_REGULAR_12}/>
      </View>
      <View style={[ROW, ALIGN_CENTER]}>
        <FastImage source={images.banner_type} style={[styles.type, isRow && {marginLeft: '15%'}]} />
        <AppText value={item?.category?.name} style={FONT_REGULAR_12} />
      </View>

    </View>
  )
})

export default TypeBanner

const styles = ScaledSheet.create({
  type: {
    width: "16@s",
    height: "16@s",
    marginRight: '6@s'
  },
  team: {
    width: "12@s",
    height: "16@s",
    marginRight: '6@s',
  },
})
