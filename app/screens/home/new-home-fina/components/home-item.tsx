import React from 'react';
import { View, ViewStyle } from "react-native"
import IconItem from "./icon-item"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"

interface Props{
  label: string
  data: any[]
  style?: ViewStyle | any
  percent?: number
  iconType?: 'circle' | 'custom'
  middleText?: string
}

const HomeItem = React.memo((props: Props) => {
  const {label, style, data} = props
  return (
    <View style={[styles.container, style]}>
      <AppText value={label} style={styles.label}/>
      <View style={styles.itemContainer}>
        {data.map((e, i)=> {
          return <IconItem icon={e.image} title={e.title} key={i.toString()} onPress={e.onPress}/>
        })}
      </View>
    </View>
  )
});

export default HomeItem;

const styles = ScaledSheet.create({
  container: {},
  label: {
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold,
    marginLeft: '24@ms',
    marginBottom: '12@s',
    color: 'rgba(0, 0, 0, 0.85)'
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: '24@ms',
    backgroundColor: color.palette.F9FBFF,
    paddingVertical: '12@s',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});
