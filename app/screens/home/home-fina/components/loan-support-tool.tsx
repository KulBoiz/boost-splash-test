import React from 'react';
import { View, StyleSheet, Pressable } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import FastImage from "react-native-fast-image"
import { images } from "../../../../assets/images"

interface Props{
  icon: JSX.Element
  title: string
  hideBorder?: boolean
  onPress?(): void
}

const LoanSupportTool = React.memo((props: Props) => {
  const {icon, title, hideBorder = false, onPress} = props
  return (
    <Pressable style={[styles.container, !hideBorder && styles.border]} onPress={onPress}>
      <View style={[styles.row, styles.space]}>

        <View style={styles.row}>
          {icon}
          <AppText value={title} style={styles.title}/>
        </View>

        <View style={styles.boxArrow}>
          <FastImage source={images.arrow_right} style={styles.icon}/>
        </View>
      </View>

    </Pressable>
  )
});

export default LoanSupportTool;

const styles = ScaledSheet.create({
    container: {

      paddingVertical: '18@s'
    },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: color.line,
  },
  title: {
      fontSize: '14@ms',
    fontWeight: '500',
    marginLeft: '20@ms'
  },
  boxArrow: {
    backgroundColor: color.palette.white,
    width: '16@s',
    height: '16@s',
    borderRadius: '4@s',
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: '2@ms',
    shadowColor: color.palette.blue ,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.00,

    elevation: 12,
  },
  row: {
      flexDirection: 'row',
     alignItems:"center"
  },
  space: {
      justifyContent: "space-between",
  },
  icon:{
      width: '4@s',
    height: '8@s'
  }

});
