import React from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { FONT_BOLD_14, FONT_REGULAR_14 } from "../../../../styles/common-style"
import { color } from "../../../../theme"

interface Props{
  index: number
  setIndex(id: number): void
}

const InvestTabBar = React.memo(({ index, setIndex }: Props) => {
  const isAsset = index === 0

  return (
    <View style={{backgroundColor: isAsset ? '#0B2A8F' : color.background}}>

    <View style={styles.container}>
      <View style={styles.leftBtn}>
        <Pressable style={[styles.btn, isAsset && styles.select]} onPress={()=> setIndex(0)}>
          <AppText value={'Tài sản'} style={isAsset ? FONT_BOLD_14 : FONT_REGULAR_14} color={isAsset ? color.textColor.warning : color.text}/>
        </Pressable>
      </View>

      <View style={styles.rightBtn}>
        <Pressable style={[ styles.btn, !isAsset && styles.select]} onPress={()=> setIndex(1)}>
          <AppText value={'Giao dịch'} style={!isAsset ? FONT_BOLD_14 : FONT_REGULAR_14} color={!isAsset ? color.textColor.warning : color.text}/>
        </Pressable>
      </View>
    </View>
    </View>

  )
});

export default InvestTabBar;

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: color.primary,
    justifyContent: "space-between",
    borderBottomLeftRadius: '16@s',
    borderBottomRightRadius: '16@s',
  },
  leftBtn: {
    flex:1,
    alignItems: 'flex-end',
    marginRight: '5%'
  },
  rightBtn: {
    flex:1,
    alignItems: 'flex-start',
    marginLeft: '5%'
  },
  btn: {
    paddingVertical: '12@s'
  },
  select: {
    borderBottomWidth: 2,
    borderBottomColor: color.palette.orange,
    width: '60@s',
    alignItems: "center"
  },
});
