import React from 'react';
import { View } from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../../components/app-text/AppText"
import { presets } from "../../../../constants/presets"
import { color } from "../../../../theme"

interface Props{}

const Wallet = React.memo((props: Props) => {
  return (
    <>
      <View style={styles.full}>
      <AppText value={'ví fina'}/>
      <AppText value={'0đ'} style={presets.bold}/>
    </View>
      <View style={styles.separate}/>
      <View>
        <AppText value={'ưu đãi'}/>
        <AppText value={'Giảm đến 10%'} style={presets.bold}/>
      </View>
    </>

  )
});

export default Wallet;

const styles = ScaledSheet.create({
  full: {flex: 1},
  separate:{
    height: '30@s',
    width: 1,
    marginRight: '16@s',
    backgroundColor: color.palette.gray
  }
});
