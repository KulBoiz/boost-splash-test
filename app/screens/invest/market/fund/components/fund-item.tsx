import React, { useCallback, useEffect, useState } from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { checkVolatility, formatDate, numberWithCommas, truncateString } from "../../../../../constants/variable"
import AppButton from "../../../../../components/app-button/AppButton"
import { ms, ScaledSheet } from "react-native-size-matters"
import { FONT_SEMI_BOLD_12, FONT_SEMI_BOLD_14, MARGIN_BOTTOM_4 } from "../../../../../styles/common-style"
import { fontFamily } from "../../../../../constants/font-family"
import { color } from "../../../../../theme"
import { navigate } from "../../../../../navigators"
import { ScreenNames } from "../../../../../navigators/screen-names"
import { useStores } from "../../../../../models"
import { get, head } from "lodash"
import { mappingLabelTypeOfFund } from "../../constants"
import SignKycModal from "../../../ekyc/components/sign-modal"
import { observer } from "mobx-react-lite"

interface Props {
  item: any
}

const FundItem = observer(({ item }: Props) => {
  const { investStore, authStoreModel, ekycStore } = useStores()
  const [price, setPrice] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    investStore.getCurrentNav(item?.id).then(e => setPrice(e))
  }, [])

  const currentNav = get(head(price), "nav")
  const currentData = get(head(price), "navDate")
  const percent = +item?.info?.volatilityOverTime?.inOneYear ?? 0

  const watchDetail = useCallback(() => {
    navigate(ScreenNames.FUND_DETAIL, { slug: item?.slug })
  }, [item])

  const closeModal = React.useCallback(() => {
    setVisible(false)
  }, [])

  const pressContinue = React.useCallback(() => {
    setVisible(false)
    navigate(ScreenNames.TRADE_REGISTRATION)
  }, [])


  const handleBuy = useCallback(async () => {
    if (authStoreModel?.investmentNumber) {
      const contractStatus = await ekycStore.checkContractStatus()
      const isFullSubmission = contractStatus?.isFullSubmission
      if (!isFullSubmission) {
        setVisible(true)
        return
      }
      await investStore.getBondsDetail(item?.slug)
      navigate(ScreenNames.BUY_FUND)
      return
    }
    ekycStore.checkSyncMio().then(res => {
      if (res) {
        navigate(ScreenNames.SYNC_ACCOUNT)
        return
      }
      navigate(ScreenNames.EKYC)
    })
  }, [])

  return (
    <Pressable onPress={watchDetail} style={styles.container}>
      <View style={styles.firstContainer}>
        <AppText value={truncateString(item?.code, 10)} fontFamily={fontFamily.semiBold} color={color.primary}
                 style={MARGIN_BOTTOM_4} />
        <AppText value={mappingLabelTypeOfFund(item?.info?.typeOfFund)} color={color.palette.green} />
      </View>
      <View style={styles.secondContainer}>
        <AppText value={numberWithCommas(currentNav)} fontSize={ms(14)} style={MARGIN_BOTTOM_4}
                 color={checkVolatility(percent) ? color.palette.down : color.palette.up} />
        <AppText value={`${formatDate(currentData)}`}
                 fontSize={ms(10)}
                 color={color.palette.grayChateau} />
      </View>
      <View
        style={[styles.rateContainer, { backgroundColor: checkVolatility(percent) ? color.palette.down : color.palette.up }]}>
        <AppText value={`${checkVolatility(percent) ? "" : "+"}${percent?.toFixed(2)}%`} style={FONT_SEMI_BOLD_14}
                 color={color.palette.white}
                 textAlign={"right"} />
      </View>
      <AppButton onPress={handleBuy} title={"MUA"} containerStyle={styles.btn} titleStyle={FONT_SEMI_BOLD_12} />
      <SignKycModal visible={visible} closeModal={closeModal} onPress={pressContinue} />
    </Pressable>
  )
})

export default FundItem

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: color.palette.offWhite,
    paddingVertical: "8@s",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstContainer: {
    flex: 1,
  },
  secondContainer: {
    flex: 1,

  },
  rateContainer: {
    minWidth: "70@s",
    height: "34@s",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4@s",
    marginRight: "24@s",
  },
  btn: {
    width: "60@s",
    height: "30@s",
    borderRadius: "4@s",
  },
})
