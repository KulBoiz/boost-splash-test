import React from "react"
import { Pressable, View } from "react-native"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { FONT_MEDIUM_14, MARGIN_BOTTOM_8 } from "../../../styles/common-style"
import TypeBanner from "./type-banner"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props {
  item: any
}

const SmallBannerItem = React.memo(({ item }: Props) => {
  const onPress = React.useCallback(()=> {
    navigate(ScreenNames.BANNER_DETAIL,{url: item?.slug})
  },[])

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <FastImage source={{ uri: item?.image }} style={styles.image} />
      <View style={styles.wrapText}>
        <AppText value={item?.title} style={[FONT_MEDIUM_14, MARGIN_BOTTOM_8]} numberOfLines={2} />
        <TypeBanner item={item} type={"column"}/>
      </View>
    </Pressable>
  )
})

export default SmallBannerItem

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row", alignItems: "center", marginBottom: '20@s'
  },
  wrapText:{
    width: '50%'
  },
  image: {
    width: "148@s",
    height: "80@s",
    marginRight: "10@s",
    borderRadius: '4@s'
  },
})
