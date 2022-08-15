import React from 'react'
import { View, ViewStyle } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { AppText } from '../../../../components/app-text/AppText'
import { fontFamily } from '../../../../constants/font-family'
import { navigate } from '../../../../navigators'
import { ScreenNames } from '../../../../navigators/screen-names'
import { color } from '../../../../theme'
import IconItem from '../../new-home-fina/components/icon-item'

interface Props{
  data: any[]
  title: string
  iconShape?: 'circle' | 'custom'
  style?: ViewStyle | any
}

const OthersInsurance = React.memo((props: Props) => {
	const { data, title, style, iconShape } = props
	
	const onPress = (key: string) => {
		navigate(ScreenNames.INSURANCE_LIST_SCREEN, { key: key })
	}

  return (
    <View style={[styles.container, style]}>
    <AppText value={title} style={styles.label}/>
    <View style={styles.itemContainer}>
      {data.map((e, i)=> {
        return <IconItem
          icon={e?.icon?.url}
          title={e?.name}
          key={e?.title?.toString() + i.toString()}
          onPress={() => onPress(e?.id)}
          percent={e?.percent}
          iconShape={iconShape}
          middleText={e?.middleText}
        />
      })}
    </View>
  </View>
  )
})

export default OthersInsurance

const styles = ScaledSheet.create({
  container: {},
  label: {
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    marginLeft: '24@ms',
    marginBottom: '12@s',
    color: 'rgba(0, 0, 0, 0.85)',
    marginTop: '12@s',
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: '12@ms',
    backgroundColor: color.palette.F9FBFF,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
})

