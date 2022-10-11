import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import AppHeader from "../../../components/app-header/AppHeader"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"

interface Props{}

const note = 'Để thực hiện tính năng này, quý khách cần xác thực thông tin sau đây'

const EKYC = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'EKYC'}/>
      <View style={styles.noteContainer}>
        <AppText value={note} style={styles.noteText} textAlign={'center'}/>
      </View>
      <AppText />
    </View>
  )
});

export default EKYC;

const styles = ScaledSheet.create({
    container: {},
  noteText: {
    fontSize: '16@ms',
    fontFamily: fontFamily.medium
  },
  noteContainer: {
    backgroundColor: color.palette.offWhite,
    paddingVertical: '8@s',
    paddingHorizontal: '16@s'
  }
});
