import React from 'react';
import { View, ViewStyle } from "react-native"
import IconItem from "./icon-item"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../../constants/font-family"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"


interface Props{
  label: string
  data: any[]
  style?: ViewStyle | any
  iconShape?: 'circle' | 'custom'
  header?: string
  type?: 'vehicle' | 'real_estate' | 'project_house'
}

const HomeItem = React.memo((props: Props) => {
  const {label, style, data = [], iconShape, header, type} = props
  return (
    <View style={[styles.container, style]}>
      <AppText value={label} style={styles.label}/>
      <View style={styles.itemContainer}>
        {data.map((e, i)=> {
          return <IconItem
            icon={e?.image}
            title={e?.title?.toString()}
            key={`${e?.title?.toString() ?? ''}${i.toString()}`}
            onPress={e?.onPress}
            percent={e?.percent}
            iconShape={iconShape}
            middleText={e?.middleText}
            header={header}
            type={type}
          />
        })}
      </View>
    </View>
  )
});

export default HomeItem;

const styles = ScaledSheet.create({
  container: {},
  label: {
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    marginLeft: '16@ms',
    marginBottom: '12@s',
    color: 'rgba(0, 0, 0, 0.85)'
  },
  itemContainer: {
    paddingVertical: '8@s',
    alignItems: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: '8@ms',
    backgroundColor: color.palette.F9FBFF,
  }
});
