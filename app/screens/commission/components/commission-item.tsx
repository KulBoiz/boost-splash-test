import React, { useCallback } from "react"
import { Pressable, View } from "react-native"
import FastImage from "react-native-fast-image"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { formatDate, hexToRgbA, numberWithCommas } from "../../../constants/variable"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import RenderStatus from "../../../components/status/render-status"
import { commissionStatus } from "../constants"
import { ROW, SPACE_BETWEEN } from "../../../styles/common-style"

interface Props {
  item?: any
}

const CommissionItem = React.memo((props: Props) => {
  const { item } = props
  const status = item?.status ?? ""

  const goToDetail = useCallback(() => {
    navigate(ScreenNames.COMMISSION_DETAIL, { id: item?.id })
  }, [])

  return (
    <Pressable style={styles.container} onPress={goToDetail}>
      <FastImage source={commissionStatus(status)?.icon} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <View style={[ROW, SPACE_BETWEEN]}>
          <AppText value={item?.transactionDetail?.code} style={styles.name} />
          <AppText
            value={`(${Number((item?.amount || 0) / (item?.transactionDetail?.amount || 0) * 100).toFixed(2)}%) ${numberWithCommas(item?.amount.toFixed(0))} vnđ`}
            style={styles.name} />
        </View>
        <View style={[ROW, SPACE_BETWEEN]}>
          <AppText value={formatDate(item?.createdAt)} fontSize={ms(11)} fontFamily={fontFamily.semiBold}
                   color={hexToRgbA(color.palette.black, 0.5)} />
          <RenderStatus
            style={styles.statusContainer}
            status={commissionStatus(status)?.status}
            statusColor={commissionStatus(status)?.textColor}
            backgroundColor={commissionStatus(status)?.background} />
        </View>
      </View>
    </Pressable>
  )
})

export default CommissionItem

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "12@s",
    backgroundColor: color.background,
    borderRadius: "12@s",
    marginBottom: "12@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 5,
  },
  icon: {
    width: "36@s",
    height: "36@s",
    marginRight: "12@s",
  },
  name: {
    fontSize: "12@ms",
    fontFamily: fontFamily.bold,
    marginBottom: "8@s",
  },
  statusContainer: {
    paddingVertical: "1@s",
    paddingHorizontal: "8@s",
    borderRadius: "10@s",
    alignItems: "center",
  },
})
