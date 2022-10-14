import React, { useCallback, useState } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import { FONT_REGULAR_14, MARGIN_BOTTOM_16 } from "../../../styles/common-style"
import { FinaPaySvg } from "../../../assets/svgs"
import { ScaledSheet } from "react-native-size-matters"
import { PAYMENT_METHOD, PAYMENT_METHOD_TYPE } from "../constants"

interface Props {
}

interface ItemProps {
  label: string
  isSelect: boolean
  style?: ViewStyle | any

  setSelect(): void
}

const Item = React.memo(({ isSelect, label, setSelect, style }: ItemProps) => {
  const isString = typeof label === "string"
  return (
    <Pressable style={[styles.itemSelect, { borderColor: isSelect ? color.primary : color.palette.D9D9D9 }, style]}
               onPress={setSelect}>
      {isString ?
        <AppText value={label} style={FONT_REGULAR_14} />
        :
        <FinaPaySvg />
      }
      <View style={[styles.circle, { borderColor: isSelect ? color.primary : color.palette.D9D9D9 }]}>
        {isSelect && <View style={styles.mediumCircle} />}
      </View>
    </Pressable>
  )
})

const ItemSelect = React.memo((props: Props) => {
  const [select, setSelect] = useState<PAYMENT_METHOD_TYPE>(PAYMENT_METHOD_TYPE.FINA)

  const handleSelect = useCallback((value) => {
    setSelect(value)
  }, [select])

  return (
    <View style={styles.container}>
      {PAYMENT_METHOD.map((e, i) => {
          const isSelect = select === e.value
          const lastItem = PAYMENT_METHOD.length === i + 1
          return <Item
            label={e.label}
            isSelect={isSelect}
            key={e.value}
            setSelect={() => handleSelect(e.value)}
            style={!lastItem && MARGIN_BOTTOM_16}
          />
        },
      )}
    </View>
  )
})

export default ItemSelect

const styles = ScaledSheet.create({
  container: {},
  itemSelect: {
    height: "60@s",
    paddingHorizontal: "16@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: "8@s",
  },
  circle: {
    width: "14@s",
    height: "14@s",
    borderRadius: "7@s",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mediumCircle: {
    width: "8@s",
    height: "8@s",
    borderRadius: "4@s",
    backgroundColor: color.primary,
  },
})
