import React from 'react';
import { View, Pressable, ScrollView } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { FINANCE_FILTER } from "../constants"

interface Props{
  currentSelected : number
  setCurrentSelected(e: number): void
  filterData: Array<any>
}
interface ButtonProps {
  icon: number
  title: string
  onPress(): void
  isCurrent: boolean
}
const FilterButton = React.memo((props: ButtonProps) => {
  return(
    <Pressable onPress={props.onPress}
               style={props.isCurrent ? [styles.filterContainer,styles.isSelectContainer]
               : [styles.filterContainer,styles.unselectContainer]}>
      <FastImage source={props.icon} style={styles.icon}
                 tintColor={props.isCurrent ? color.palette.white : color.palette.blue}/>
      <AppText value={props.title} style={styles.title} color={props.isCurrent ? color.text : color.palette.blue}/>
    </Pressable>
  )
})

const FinanceFilter = React.memo((props: Props) => {
  const onPress = (id) => {
    props.setCurrentSelected(id)
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterItem}>
        {props.filterData.map((val, id)=> {
          const isCurrent = props.currentSelected === id
          return(
            <FilterButton key={id.toString()} icon={val.icon} title={val.title} onPress={()=>onPress(id)} isCurrent={isCurrent} />
          )
        })}
      </ScrollView>
    </View>
  )
});

export default FinanceFilter;

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
  unselectContainer:{
    borderWidth: 1,
    borderColor: color.palette.blue
  },
  title:{
    marginLeft: '8@s',
    textTransform: "capitalize",
    fontSize: '10@ms'
  }
});
