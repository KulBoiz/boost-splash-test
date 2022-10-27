import React, { useState } from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../../constants/font-family"
import { color } from "../../../../theme"

interface Props {
  filterData: any

  onPress(e: any): void
}

const backGroundColor = "#EBECF0"

const TypeFilter = React.memo((props: Props) => {
  const { filterData, onPress } = props
  const [currentLabel, setCurrentLabel] = useState(filterData[0]?.label)

  const handlePress = React.useCallback((val) => {
    setCurrentLabel(val?.label)
    onPress(val?.value)
  }, [currentLabel])

  return (
    <View style={styles.container}>
      {filterData.map((val, index) => {
        const isSelect = val.label === currentLabel
        return (
          <Pressable key={index} onPress={() => handlePress(val)}
                     style={[styles.itemContainer, { backgroundColor: isSelect ? backGroundColor : color.transparent }]}>
            <AppText value={val.label} fontSize={ms(14)} fontFamily={fontFamily.medium} />
          </Pressable>
        )
      })}
    </View>
  )
})

export default TypeFilter

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: '12@s'
  },
  itemContainer: {
    paddingVertical: "4@s",
    paddingHorizontal: "12@s",
    borderRadius: "2@s",
  },
})
