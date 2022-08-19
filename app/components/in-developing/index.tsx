import React from 'react';
import { View } from 'react-native';
import AppHeader from "../app-header/AppHeader"
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { InDevelopingSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import { FONT_REGULAR_12 } from "../../styles/common-style"

interface Props {
  notShowHeader?: boolean
}

const InDeveloping = React.memo((props: Props) => {
  const { notShowHeader = false } = props
  return (
    <View style={styles.container}>
      {!notShowHeader && <AppHeader headerText={'Thông báo'} />}
      <View style={styles.body}>
        <InDevelopingSvg />
        <AppText value={'Tính năng này đang phát triển'} style={styles.title} />
        <AppText value={'Xin quý khách vui lòng quay lại sau'} style={FONT_REGULAR_12} />
      </View>
    </View>
  )
});

export default InDeveloping;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: '18@ms',
    fontFamily: fontFamily.bold,
    marginBottom: '8@s',
    marginTop: '40@s'
  }
});
