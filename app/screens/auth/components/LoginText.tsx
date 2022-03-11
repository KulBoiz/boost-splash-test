import React from 'react';
import { StyleSheet, Pressable, View } from "react-native"
import { AppText } from "../../../components/AppText/AppText"
import { RightArrorSvg } from "../../../assets/svgs"
import { s, ScaledSheet } from 'react-native-size-matters';
import { color } from "../../../theme"

interface Props{
  firstText: string
  secondText: string
}

const LoginText = React.memo(({ firstText, secondText }: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={firstText} style={styles.firstText} capitalize fontSize={s(14)}/>
      <Pressable style={styles.wrapText}>
        <AppText value={`${secondText} `} style={styles.secondText}   capitalize/>
        <RightArrorSvg />
      </Pressable>
    </View>
  )
});

export default LoginText;
LoginText.displayName = 'LoginText'

const styles = ScaledSheet.create({
  container: {},
  firstText: {marginBottom: '11@s'},
  secondText: {fontSize: '16@s', color:color.palette.blue, fontWeight: '500' },
  wrapText: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
