import React, { useCallback } from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { numberWithCommas } from "../../../../constants/variable"
import AppButton from "../../../../components/app-button/AppButton"
import { ms, ScaledSheet } from "react-native-size-matters"
import { FONT_SEMI_BOLD_12, MARGIN_BOTTOM_4 } from "../../../../styles/common-style"
import { fontFamily } from "../../../../constants/font-family"
import { color } from "../../../../theme"
import moment from "moment"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"

interface Props {
}

const percent = 8.3
const MarketItem = React.memo((props: Props) => {
  const watchDetail = useCallback(() => {
    navigate(ScreenNames.MARKET_DETAIL)
  }, [])

  const handleBuy = useCallback(() => {
    navigate(ScreenNames.BUY_BONDS)
  }, [])

  return (
    <Pressable onPress={watchDetail} style={styles.container}>
      <View style={styles.firstContainer}>
        <AppText value={"TVPF"} fontFamily={fontFamily.semiBold} color={color.primary} style={MARGIN_BOTTOM_4}/>
        <AppText value={"Quỹ trái phiếu"} color={color.palette.green}/>
      </View>
      <View style={styles.secondContainer}>
        <AppText value={numberWithCommas(20123123)} fontSize={ms(14)} style={MARGIN_BOTTOM_4}/>
        <AppText value={`Cập nhật ngày ${moment(new Date()).format("DD/MM")}`}
                 fontSize={ms(10)}
                 color={color.palette.grayChateau} />
      </View>
      <AppText value={`${percent}%`} color={color.palette.green} />
      <AppButton onPress={handleBuy} title={"MUA"} containerStyle={styles.btn} titleStyle={FONT_SEMI_BOLD_12} />
    </Pressable>
  )
})

export default MarketItem

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: color.palette.offWhite,
    paddingVertical: '12@s',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  firstContainer: {
  },
  secondContainer: {

  },
  btn: {
    width: "60@s",
    height: "30@s",
    borderRadius: '4@s'
  },
})
