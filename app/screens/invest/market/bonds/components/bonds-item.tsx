import React, { useCallback, useMemo } from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { truncateString } from "../../../../../constants/variable"
import AppButton from "../../../../../components/app-button/AppButton"
import { ms, ScaledSheet } from "react-native-size-matters"
import { FONT_BOLD_14, FONT_SEMI_BOLD_12 } from "../../../../../styles/common-style"
import { fontFamily } from "../../../../../constants/font-family"
import { color } from "../../../../../theme"
import { navigate } from "../../../../../navigators"
import { ScreenNames } from "../../../../../navigators/screen-names"
import { useStores } from "../../../../../models"

interface Props {
  item: any
}

const BondsItem = React.memo(({ item }: Props) => {
  const {investStore} = useStores()
  // const money = item?.info?.parValueShares * item?.info?.totalReleaseVolume

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
    // await investStore.getBondsDetail(item?.slug)
    // navigate(ScreenNames.BUY_BONDS)
    navigate(ScreenNames.EKYC)
  }, [])

  return (
    <Pressable onPress={watchDetail} style={styles.container}>
      <View style={styles.firstContainer}>
        <AppText value={truncateString(item?.productCodeOfTheInvestor, 10)} style={FONT_BOLD_14} color={color.primary} />
        {/* <AppText value={"Trái phiếu"} color={color.palette.green}/> */}
      </View>
      <View style={styles.secondContainer}>
        <AppText value={`${maxInterest?.rate}%`} fontSize={ms(16)} fontFamily={fontFamily.bold} color={color.primary} />
        <AppText value={'năm'}
                 fontSize={ms(12)}
                 color={color.palette.grayChateau} />
      </View>
      <View style={styles.secondContainer}>
        <AppText value={maxInterest?.time} fontSize={ms(16)} fontFamily={fontFamily.bold} color={color.palette.orange}/>
        <AppText value={`tháng`}
                 fontSize={ms(12)}
                 color={color.palette.grayChateau} />
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
    flex: 0.7
  },
  secondContainer: {
    flex: 1,
    alignItems: "center"
  },
  rateContainer: {
    width: '70@s',
    height: '34@s',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '4@s'
  },
  btn: {
    width: "60@s",
    height: "30@s",
    borderRadius: '4@s'
  },
})
