import React, { useState } from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../../theme"
import { FONT_BOLD_12, FONT_REGULAR_12 } from "../../../../../styles/common-style"

interface Props {
  filterData: any
  onPress(e: any): void
}

const ChartFilter = React.memo((props: Props) => {
  const { filterData = [], onPress } = props
  const [currentLabel, setCurrentLabel] = useState(filterData[0].label)

  const handlePress = React.useCallback((e)=> {
    setCurrentLabel(e.label)
    onPress(e.data)
  },[currentLabel])

  return (
    <View style={styles.container}>
      {filterData.map((value, index) => {
        const isSelect = value.label === currentLabel
        return (
          <Pressable key={index} onPress={()=> handlePress(value)}
                     style={[styles.itemContainer, { backgroundColor: isSelect ? color.primary : color.palette.lighterGrey }]}>
            <AppText value={value.label} style={isSelect ? FONT_BOLD_12 : FONT_REGULAR_12}
                     color={isSelect ? color.text : color.palette.black} />
          </Pressable>
        )
      })}
    </View>
  )
})

export default ChartFilter

const styles = ScaledSheet.create({
  container: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: '16@s',
    marginBottom: '20@s'
  },
  itemContainer: {
    paddingHorizontal: "14@s",
    paddingVertical: "6@s",
    borderRadius: '4@s'
  },
})
