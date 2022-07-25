import React from 'react';
import { View, ViewStyle } from "react-native"
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"

interface Props{
  children: React.ReactNode
  title: string
  style?: ViewStyle | any
  bodyStyle?: ViewStyle | any
}

const InfoBox = React.memo((props: Props) => {
  const {title, children, style, bodyStyle} = props
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <AppText value={title} style={styles.title}/>
      </View>
      <View style={[styles.body, bodyStyle]}>
        {children}
      </View>
    </View>
  )
});

export default InfoBox;

const styles = ScaledSheet.create({
    container: {
      paddingHorizontal: '16@s',
      borderWidth: 1,
      borderColor: color.palette.blue,
      paddingVertical: '12@s',
      borderRadius: '8@s',
      marginBottom: '16@s'
    },
  header: {
    paddingBottom: '12@s',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.BABABA
  },
  body: {
    paddingTop: '12@s'
  },
  title: {
    fontFamily: fontFamily.bold,
    color: color.palette.blue,
    fontSize: '12@ms'
  }
});
