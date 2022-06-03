import React from 'react';
import { View, Pressable, ScrollView, ViewStyle } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { SvgUri } from 'react-native-svg';

interface Props {
  currentSelected: number
  setCurrentSelected(e: any): void
  filterData: Array<any>
  style?: ViewStyle | any
}
interface ButtonProps {
  icon: string | number
  title: string
  onPress(): void
  isCurrent: boolean
}
const FilterButton = React.memo((props: ButtonProps) => {
  return (
    <Pressable onPress={props.onPress}
      style={props.isCurrent ? [styles.filterContainer, styles.isSelectContainer]
        : [styles.filterContainer, styles.unselectContainer]}
    >
      {props.icon && <FastImage source={ typeof props.icon === 'number' ? props.icon : { uri: props.icon }} style={styles.icon}
        resizeMode={'contain'}
        // tintColor={props.isCurrent ? color.palette.white : color.palette.blue}
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
    <View style={[styles.container, props.style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {props.filterData.map((val, id) => {
          const isCurrent = props?.currentSelected?.key === val.key
          return (
            <FilterButton key={id.toString()} icon={val.icon} title={val.title} onPress={() => onPress(val)} isCurrent={isCurrent} />
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
    backgroundColor: color.palette.lightBlue,
  },

  icon: {
    width: '20@s',
    height: '20@s'
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
    marginLeft: '8@s',
    textTransform: "capitalize",
    fontSize: '10@ms'
  }
});
