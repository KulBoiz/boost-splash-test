import React from 'react';
import { View, StyleSheet, Pressable } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"

interface Props{
  icon: JSX.Element
  title: string
  onPress?(): void
}

const SettingItem = React.memo((props: Props) => {
  const {icon, title, onPress} = props
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.row, styles.space]}>
        <View style={styles.row}>
          <View style={styles.wrapIcon}>
            {icon}
          </View>
          <AppText value={title} style={styles.title}/>
        </View>
          <FastImage source={images.arrowLeft} style={styles.icon}/>
      </View>

    </Pressable>
  )
});

export default SettingItem;

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '10@s',
    backgroundColor: color.background,
    paddingHorizontal: '16@ms'
  },
  wrapIcon: {
    width: '40@s',
    height: '40@s',
    backgroundColor: color.palette.lightBlue,
    alignItems:"center",
    justifyContent: "center",
    borderRadius: '8@s'
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
  row: {
    flexDirection: 'row',
    alignItems:"center"
  },
  space: {
      justifyContent: "space-between",
  },
  icon:{
      width: '24@s',
    height: '24@s',
    transform: [{rotate: '180deg'}]
  }

});
