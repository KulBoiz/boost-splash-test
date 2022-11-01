import React, { useMemo } from "react"
import { View, ViewStyle } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../../constants/font-family"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import InvestItem from "./invest-item"
import { FONT_REGULAR_12 } from "../../../../styles/common-style"
import { checkVolatility } from "../../../../constants/variable"


interface Props {
  label: string
  data: any[]
  style?: ViewStyle | any
  header?: string
  type?: 'fund' | 'bonds'
  onPress?(): void
}

const InvestItemContainer = React.memo((props: Props) => {
  const { label, style, data = [], onPress, type = 'bonds' } = props

  return (
    <View style={[styles.container, style]}>
      <View style={styles.wrapLabel}>
        <AppText value={label} style={styles.label} />
        {onPress && <AppText value={"Tất cả"} style={FONT_REGULAR_12} color={color.primary} onPress={onPress} /> }
      </View>

      <View style={styles.itemContainer}>
        {data.map((e, i) => {
          let maxInterest
          if (type === 'bonds') {
          useMemo(() => {
              maxInterest = e?.info?.interestRate
                .filter((e) => e?.rate)
                .reduce((previousValue, nextValue) =>
                  previousValue?.rate > nextValue?.rate ? previousValue : nextValue,
                )
            }, [e])
          }
          const volatility = type !== 'bonds' ? e?.info?.volatilityOverTime?.inOneYear: maxInterest?.rate
          return <InvestItem
            icon={e?.org?.image?.url}
            status={checkVolatility(volatility) ? "down" : "up" }
            title={type !== 'bonds' ? e?.code : e?.productCodeOfTheInvestor}
            key={`${e?.id?.toString() ?? ""}${i.toString()}`}
            percent={volatility}
            slug={e?.slug}
            type={type}
          />
        })}
      </View>
    </View>
  )
})

export default InvestItemContainer

const styles = ScaledSheet.create({
  container: {},
  wrapLabel: {
    flexDirection: "row",
    paddingHorizontal: "16@ms",
    marginBottom: "12@s",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: "14@ms",
    fontFamily: fontFamily.semiBold,
    color: "rgba(0, 0, 0, 0.85)",
  },
  itemContainer: {
    paddingVertical: "8@s",
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: "12@ms",
    backgroundColor: color.palette.F9FBFF,
  },
})
