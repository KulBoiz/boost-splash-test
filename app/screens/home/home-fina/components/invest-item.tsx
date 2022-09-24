import React, { useCallback, useState } from "react"
import { Pressable, View } from "react-native"
import { ms, ScaledSheet } from "react-native-size-matters"
import { ScreenNames } from "../../../../navigators/screen-names"
import { navigate } from "../../../../navigators"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"
import { images } from "../../../../assets/images"
import { FastImage } from "../../../../components/fast-image/fast-image"


interface Props {
  icon: number | string
  title: string
  onPress(): void
  percent?: number
  header?: string
  status?: 'up' | 'down'
}

const InvestItem = React.memo((props: Props) => {
  const { icon, title, onPress, percent, header, status} = props
  const isUp = status === 'up'

  const handlePress = useCallback(() => {
      navigate(ScreenNames.INVEST)
    }, [])



  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={[styles.wrapStatus, {backgroundColor: isUp ? color.palette.green : color.palette.angry}]}>
        <FastImage source={images.home_arrow_up} style={isUp ? styles.iconArrow : styles.iconArrowDown}/>
        <AppText value={`${percent ?? '0'}%`} fontSize={ms(8)} fontFamily={fontFamily.medium} color={color.palette.white} />
      </View>
      <View style={styles.circle}>
        <FastImage
          source={{ uri: icon }}
          style={styles.icon}
          resizeMode={'contain'}
        />
      </View>
      <AppText value={title} style={styles.text} numberOfLines={2}/>
    </Pressable>
  )
});

export default InvestItem;

const styles = ScaledSheet.create({
  container: {
    width: '20%',
    alignItems: "center",
    marginVertical: '4@s'
  },
  wrapStatus: {
    flexDirection: 'row',
    borderRadius: '5@s',
    paddingVertical: '1@s',
    paddingHorizontal: '2@s',
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 5,
    zIndex: 1
  },
  circle: {
    width: '32@s',
    height: '32@s',
    borderRadius: '16@s',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.background
  },
  iconArrow: {
    width: '10@s',
    height: '10@s',
  },
  iconArrowDown: {
    width: '10@s',
    height: '10@s',
    transform: [
      {rotate: '180deg'}
    ]
  },
  icon: {
    width: '20@s',
    height: '20@s',
  },
  text: {
    marginTop: '4@s',
    width: '90%',
    fontSize: '10@ms',
    lineHeight: '13@ms',
    fontFamily: fontFamily.medium,
    textAlign: "center",
  },

});
