import React, { useCallback, useMemo } from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { formatDate, getMoneyLabel, numberWithCommas, truncateString } from "../../../../../constants/variable"
import AppButton from "../../../../../components/app-button/AppButton"
import { ms, ScaledSheet } from "react-native-size-matters"
import { FONT_SEMI_BOLD_12, FONT_SEMI_BOLD_14, MARGIN_BOTTOM_4 } from "../../../../../styles/common-style"
import { fontFamily } from "../../../../../constants/font-family"
import { color } from "../../../../../theme"
import moment from "moment"
import { navigate } from "../../../../../navigators"
import { ScreenNames } from "../../../../../navigators/screen-names"
import { useStores } from "../../../../../models"
import { first, get, last } from "lodash"
import { mappingLabelTypeOfFund } from "../../constants"

interface Props {
  item: any
}

const BondsItem = React.memo(({ item }: Props) => {
  const {investStore} = useStores()
  const priceUpdateHistories = item?.info?.priceUpdateHistories
  const currentNav = get(last(priceUpdateHistories), 'price')
  const firstNav = get(first(priceUpdateHistories), 'price')
  const percent =  0

  const watchDetail = useCallback(() => {
    navigate(ScreenNames.FUND_DETAIL, {slug: item?.slug})
  }, [item])

  const handleBuy = useCallback(async () => {
    await investStore.getBondsDetail(item?.slug)
    navigate(ScreenNames.BUY_FUND)
  }, [])

  return (
    <Pressable onPress={watchDetail} style={styles.container}>
      <View style={styles.firstContainer}>
        <AppText value={truncateString(item?.code, 10)} fontFamily={fontFamily.semiBold} color={color.primary} style={MARGIN_BOTTOM_4}/>
        <AppText value={mappingLabelTypeOfFund(item?.info?.typeOfFund)} color={color.palette.green}/>
      </View>
      <View style={styles.secondContainer}>
        <AppText value={numberWithCommas(currentNav)} fontSize={ms(14)} style={MARGIN_BOTTOM_4} color={'#2EBD85'}/>
        <AppText value={`${formatDate(item?.updatedAt)}`}
                 fontSize={ms(10)}
                 color={color.palette.grayChateau} />
      </View>
      <View style={[styles.rateContainer, {backgroundColor: color.palette.palegreen}]}>
        <AppText value={`+${percent.toFixed(2)}%`} style={FONT_SEMI_BOLD_14} color={color.palette.white} textAlign={'right'}/>
      </View>
      <AppButton onPress={handleBuy} title={"MUA"} containerStyle={styles.btn} titleStyle={FONT_SEMI_BOLD_12} />
    </Pressable>
  )
})

export default BondsItem

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
    flex: 1
  },
  secondContainer: {
    flex: 1

  },
  rateContainer: {
    minWidth: '70@s',
    height: '34@s',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '4@s',
    marginRight: '24@s'
  },
  btn: {
    width: "60@s",
    height: "30@s",
    borderRadius: '4@s'
  },
})