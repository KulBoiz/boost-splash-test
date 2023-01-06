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

const BigBannerItem = React.memo(({ item }: Props) => {
  const onPress = React.useCallback(()=> {
    navigate(ScreenNames.BANNER_DETAIL,{url: item?.slug})
  },[])
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FastImage source={{ uri: item?.image }} style={styles.image} />
      <AppText value={item?.title} style={[FONT_MEDIUM_14, MARGIN_BOTTOM_8]} numberOfLines={2}/>
      <TypeBanner item={item} type={"row"} />
    </Pressable>
  )
})

export default BigBannerItem

const styles = ScaledSheet.create({
  container: {
    marginBottom: '28@s'
  },
  image: {
    height: "184@s",
    marginBottom: "12@s",
    borderRadius: '4@s'
  },
})
