import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { AppText } from "../../components/app-text/AppText"
import AppHeader from "../../components/app-header/AppHeader"

interface Props{}

const InsuranceDetail = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'BH mất cấp / Cướp xe máy '} isBlue/>
      <View style={styles.body}>
        <AppText value={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac.\n' +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac.'} />
      </View>
    </View>
  )
});

export default InsuranceDetail;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  body: {
    padding: '16@s',
  },
  wrapButton: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
