import React from 'react';
import { View } from 'react-native';
import { CheckedSvg } from "../../../assets/svgs"
import { ScaledSheet, s } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"

interface Props{
  text: string
}

const CheckItem = React.memo(({ text }: Props) => {

  return (
    <View style={styles.container}>
      <CheckedSvg width={s(12)} height={s(12)}/>
      <AppText value={text} style={styles.text}/>
    </View>
  )
});

export default CheckItem;

const styles = ScaledSheet.create({
    container: {
      marginTop: '24@s',
      flexDirection: "row",
      alignItems: "center",
    },
  text:{
    marginLeft: '16@ms',
    fontSize: '12@s',
    color: color.palette.deepGray,
  }
});
