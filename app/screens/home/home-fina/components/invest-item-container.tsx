import React, { useCallback } from "react"
import { View, ViewStyle } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../../constants/font-family"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import InvestItem from "./invest-item"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"


interface Props {
  label: string
  data: any[]
  style?: ViewStyle | any
  header?: string
}

const InvestItemContainer = React.memo((props: Props) => {
  const { label, style, data = [], header } = props

  const handlePress = useCallback(() => {
    navigate(ScreenNames.INVEST)
  }, [])

  return (
    <View style={[styles.container, style]}>
      <AppText value={label} style={styles.label} />
      <View style={styles.itemContainer}>
        {data.map((e, i) => {
          return <InvestItem
            icon={e?.image}
            status={e?.status}
            title={e?.title?.toString()}
            key={`${e?.title?.toString() ?? ""}${i.toString()}`}
            onPress={handlePress}
            percent={e?.percent}
            header={header}
          />
        })}
      </View>
    </View>
  )
})

export default InvestItemContainer

const styles = ScaledSheet.create({
  container: {},
  label: {
    fontSize: "14@ms",
    fontFamily: fontFamily.semiBold,
    marginLeft: "16@ms",
    marginBottom: "12@s",
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
