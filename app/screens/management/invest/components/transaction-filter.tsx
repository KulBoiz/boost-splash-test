import React from "react"
import { Pressable, View } from "react-native"
import { INVEST_TRANSACTION_TYPE } from "../../../../constants/types"
import { AppText } from "../../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { FONT_REGULAR_12 } from "../../../../styles/common-style"

interface Props {
  type: INVEST_TRANSACTION_TYPE

  setType(e: INVEST_TRANSACTION_TYPE): void
}

const TYPES = [
  {
    title: "Lệnh đặt mua",
    value: INVEST_TRANSACTION_TYPE.BUY,
  },
  {
    title: "Lệnh đặt bán",
    value: INVEST_TRANSACTION_TYPE.SELL,
  },
]
const TransactionFilter = React.memo(({ type, setType }: Props) => {
  return (
    <View style={styles.container}>
      {TYPES.map((value, index) => {
        const isSelect = type === value.value
        return (
          <Pressable
            key={index} onPress={() => setType(value.value)}
            style={[styles.itemContainer,
            { backgroundColor: isSelect ? color.primary : color.background }]}>
            <AppText style={FONT_REGULAR_12} value={value.title} color={isSelect ? color.text : color.primary}/>
          </Pressable>
        )
      })}
    </View>
  )
})

export default TransactionFilter

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: '12@s'
  },
  itemContainer: {
    flex:1,
    alignItems: "center",
    paddingVertical: "5@s",
    marginVertical: '12@s',
    borderRadius: '4@s',
    borderWidth: 1,
    borderColor: color.primary,
    marginHorizontal: '4@s'
  },
})
