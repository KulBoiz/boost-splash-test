import React from "react"
import { View, ViewStyle } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../theme"

interface Props {
  currentPosition: number
  stepCount: number
  style?: ViewStyle | any
}

interface ItemProps {
  isSelected: boolean
}

const RenderItem = React.memo(({isSelected} : ItemProps)=> {
  return(
    <View style={[styles.item, {backgroundColor: isSelected ? color.primary  : color.palette.E9EBEF}]}/>
  )
})

const RenderFlatStep = React.memo((props: Props) => {
  const { currentPosition, stepCount = 3, style} = props
  const array = Array.from(Array(stepCount).keys())
  return (
    <View style={[styles.container, style]}>
      {array.map((e, i)=> (
        <RenderItem isSelected={currentPosition === i} key={i}/>
      ))}
    </View>
  )
})

export default RenderFlatStep

const styles = ScaledSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingVertical: '12@s',
    flexDirection: 'row'
  },
  item: {
    flex: 1,
    marginHorizontal: '6@s',
    height: '5@s',
    borderRadius: '3@s'
  }
})
