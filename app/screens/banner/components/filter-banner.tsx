import React, { useRef, useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"

interface Props {
  data: any[]
  onPress(e: any): void
}


const FilterBanner = React.memo((props: Props) => {
  const flatList = useRef<FlatList>(null)
  const { data, onPress } = props
  const [selectItem, setSelectItem] = useState(0)

  const setKeySelect = (item, index) => {
    setSelectItem(index)
    onPress(item?.id)
    // @ts-ignore
    flatList?.current?.scrollToIndex({animated: true, index: index})
  }

  const renderItem = ({ item, index }) => {
    const isSelect = selectItem === index
    return (
      <Pressable
        onPress={() => setKeySelect(item, index)}
        style={[styles.box, {
          borderBottomColor: isSelect ? color.primary : color.palette.iron,
          borderBottomWidth: isSelect ? 2 : 1,
          }
        ]}
      >
        <AppText
          value={`${item?.name}`}
          fontSize={ms(12)}
          color={isSelect ? color.palette.blue : "#788198"}
          fontFamily={isSelect ? fontFamily.bold : fontFamily.medium}
        />
      </Pressable>
    )
  }
  return (
    <View>
      {!!data?.length &&
        <FlatList
          ref={flatList}
          keyExtractor={(e, i) => i.toString()}
          data={data}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />
      }
    </View>
  )
})

export default FilterBanner

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    paddingHorizontal: "16@s",
    paddingVertical: "12@s",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.background,
  },
})
