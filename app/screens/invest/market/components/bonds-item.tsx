import React, { useCallback, useMemo } from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { getMoneyLabel, numberWithCommas, truncateString } from "../../../../constants/variable"
import AppButton from "../../../../components/app-button/AppButton"
import { ms, ScaledSheet } from "react-native-size-matters"
import { FONT_SEMI_BOLD_12, MARGIN_BOTTOM_4 } from "../../../../styles/common-style"
import { fontFamily } from "../../../../constants/font-family"
import { color } from "../../../../theme"
import moment from "moment"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"
import { useStores } from "../../../../models"

interface Props {
  item: any
}

const BondsItem = React.memo(({ item }: Props) => {
  const {investStore} = useStores()
  const money = item?.info?.parValueShares * item?.info?.totalReleaseVolume

  const maxInterest = useMemo(()=> {
    return item?.info?.interestRate
      .filter((e) => e?.rate)
      .reduce((previousValue, nextValue) =>
        previousValue?.rate > nextValue?.rate ? previousValue : nextValue,
      );
  },[item])

  const watchDetail = useCallback(() => {
    navigate(ScreenNames.BONDS_DETAIL, {slug: item?.slug})
  }, [])

  const handleBuy = useCallback(async () => {
    await investStore.getBondsDetail(item?.slug)
    navigate(ScreenNames.BUY_BONDS)
  }, [])

  return (
    <Pressable onPress={watchDetail} style={styles.container}>
      <View style={styles.firstContainer}>
        <AppText value={truncateString(item?.name, 10)} fontFamily={fontFamily.semiBold} color={color.primary} style={MARGIN_BOTTOM_4}/>
        <AppText value={"Trái phiếu"} color={color.palette.green}/>
      </View>
      <View style={styles.secondContainer}>
        <AppText value={getMoneyLabel(money)} fontSize={ms(14)} style={MARGIN_BOTTOM_4}/>
        <AppText value={`Cập nhật ngày ${moment(item?.updatedAt).format("DD/MM")}`}
                 fontSize={ms(10)}
                 color={color.palette.grayChateau} />
      </View>
      <View>
        <AppText value={`${maxInterest?.rate}%`} style={FONT_SEMI_BOLD_12} color={color.palette.green} textAlign={'right'}/>
        <AppText value={`${maxInterest?.time} tháng`} color={color.palette.orange} style={FONT_SEMI_BOLD_12}/>
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
  },
  secondContainer: {

  },
  btn: {
    width: "60@s",
    height: "30@s",
    borderRadius: '4@s'
  },
})
