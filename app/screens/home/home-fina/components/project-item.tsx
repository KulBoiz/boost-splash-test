import React from 'react';
import { View, ViewStyle } from "react-native"
import IconItem from "./icon-item"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../../constants/font-family"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import { ScreenNames } from '../../../../navigators/screen-names';
import { navigate } from '../../../../navigators';


interface Props{
  label: string
  data: any[]
  style?: ViewStyle | any
  iconShape?: 'circle' | 'custom'
  header?: string
  type?: 'vehicle' | 'real_estate' | 'project_house'
}

const ProjectItem = React.memo((props: Props) => {
  const { label, style, data, header, type } = props

  const onPress = (e) => {
   navigate(ScreenNames.PROJECT_TAB, {header,key: e, id: 1})
  }

  return (
    <View style={[styles.container, style]}>
      <AppText value={label} style={styles.label}/>
      <View style={styles.itemContainer}>
        {data && data?.map((e, i)=> {
          return <IconItem
            icon={e?.images?.[0]}
            title={e?.name?.toString()}
            key={e?.title?.toString() + i.toString()}
            onPress={() => { onPress(e)}}
            percent={e?.percent}
            iconShape={'circle'}
            middleText={e?.middleText}
            header={header}
            type={type}
            showPercent={false}
          />
        })}
      </View>
    </View>
  )
});

export default ProjectItem;

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
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: '12@ms',
    backgroundColor: color.palette.F9FBFF,
  }
});
