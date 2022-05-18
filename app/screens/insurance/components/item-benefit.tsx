import React from 'react';
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { HAVE_INSURANCE, NOT_HAVE_INSURANCE } from "../constants"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { ALIGN_CENTER, FONT_MEDIUM_14, MARGIN_TOP_16, ROW, TEXT_CENTER } from "../../../styles/common-style"
import { color } from "../../../theme"

interface Props{
  haveInsurance?: boolean
}

const ItemBenefit = React.memo(({ haveInsurance = false }: Props) => {

  return (
      <View style={[styles.container, haveInsurance ? styles.haveContainer : styles.notHaveContainer]}>
      <AppText
        value={haveInsurance ? 'Có bảo hiểm' : 'Không có bảo hiểm'}
        color={haveInsurance ? color.text : color.palette.grayDarker}
        style={[FONT_MEDIUM_14, TEXT_CENTER]}
      />
      {haveInsurance ?
        HAVE_INSURANCE.map((value:{icon: number, title: string}, id)=> (
          <View key={id.toString()} style={[ROW,ALIGN_CENTER, MARGIN_TOP_16]}>
            <FastImage source={value.icon} style={styles.icon} tintColor={color.text}/>
            <AppText value={value.title} style={styles.title} color={color.text}/>
          </View>
        ))
        :
        NOT_HAVE_INSURANCE.map((value:{icon: number, title: string}, id)=> (
          <View key={id.toString()} style={[ROW,ALIGN_CENTER, MARGIN_TOP_16]}>
            <FastImage source={value.icon} style={styles.icon} tintColor={color.palette.grayDarker}/>
            <AppText value={value.title} style={styles.title}/>
          </View>
        ))
      }
    </View>
  )
});

export default ItemBenefit;

const styles = ScaledSheet.create({
  parent: {
    flex:1,
    width: '100%'
  },
    container: {
      width: '45%',
    padding: '16@ms',
      borderRadius: '8@s',
    },

  haveContainer :{
    backgroundColor: color.palette.blue
  },
  notHaveContainer: {
    backgroundColor: '#DCDDDF'
  },
  icon: {
      width: '20@s',
    height: '20@s',
    marginRight: '8@s'
  },
  title:{
      fontSize: '8@ms'
  }
});
