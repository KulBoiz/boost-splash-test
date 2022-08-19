import React from 'react';
import { View, Pressable, ScrollView, ViewStyle } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"

interface Props {
  currentSelected: any
  setCurrentSelected(e: any): void
  filterData: Array<any>
  style?: ViewStyle | any
  notShowIcon?: boolean
  backgroundColor?: string
}
interface ButtonProps {
  icon: string | number
  title: string
  onPress(): void
  isCurrent: boolean
  notShowIcon?: boolean
  backgroundColor?: string
}
const FilterButton = React.memo((props: ButtonProps) => {
  return (
    <Pressable onPress={props.onPress}
      style={props.isCurrent ? [styles.filterContainer, styles.isSelectContainer]
        : [styles.filterContainer, styles.unselectContainer]}
    >
      {!props?.notShowIcon && props.icon && <FastImage source={typeof props.icon === 'number' ? props.icon : { uri: props.icon }} style={styles.icon}
        resizeMode={'contain'}
      />}
      <AppText value={props.title} style={styles.title} color={props.isCurrent ? color.text : color.palette.blue} />
    </Pressable>
  )
})

const MenuFilter = React.memo((props: Props) => {
  const onPress = (item) => {
    props.setCurrentSelected(item)
  }
  
  return (
    <View style={[
      styles.container,
      props.style,
      { backgroundColor: props.backgroundColor ? props.backgroundColor : color.palette.lightBlue }
    ]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {props?.filterData.map((val, id) => {
          const isCurrent = props?.currentSelected?.key === val?.key
          return (
            <FilterButton
              key={id.toString()}
              icon={val?.icon}
              title={val?.title}
              onPress={() => onPress(val)}
              isCurrent={isCurrent}
              notShowIcon={props?.notShowIcon} />
          )
        })}
      </ScrollView>
    </View>
  )
});

export default MenuFilter;

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '16@s',
    paddingHorizontal: '8@s',
    // backgroundColor: color.palette.lightBlue,
  },
  icon: {
    width: '20@s',
    height: '20@s',
    marginRight: '8@s',
  },
  filterContainer: {
    marginHorizontal: '8@s',
    padding: '8@s',
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: '10@s'
  },
  isSelectContainer: {
    backgroundColor: color.palette.blue
  },
  unselectContainer: {
    borderWidth: 1,
    borderColor: color.palette.blue,
  },
  title: {
    textTransform: "capitalize",
    fontSize: '12@ms',
    paddingHorizontal: '6@ms',
  }
});
