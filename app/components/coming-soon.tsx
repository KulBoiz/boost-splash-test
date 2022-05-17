import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from "./app-text/AppText"
import { FONT_REGULAR_14 } from "../styles/common-style"
import { color } from "../theme"

interface Props{}

const ComingSoon = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'Tính năng sẽ sớm ra mắt trong tương lai'} style={FONT_REGULAR_14} color={color.palette.deepGray}/>
    </View>
  )
});

export default ComingSoon;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center"
    },
});
