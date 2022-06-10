import React from 'react';
import { View } from 'react-native';
import { ms, ScaledSheet } from "react-native-size-matters"
import { width } from "../../../constants/variable"
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"

const widthHeight = width - ms(32)

interface Props{}

const ComingSoon = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'tính năng sẽ sớm ra mắt trong tương lai'} style={styles.text} capitalize/>
    </View>
  )
});

export default ComingSoon;

const styles = ScaledSheet.create({
  container: {
    borderRadius: '8@s',
    alignItems: "center",
    justifyContent: "center",
    width: widthHeight,
    height: widthHeight,
    backgroundColor: color.background
  },
  text: {
    fontSize: '14@ms',
    color: '#BABABA'
  }
});
