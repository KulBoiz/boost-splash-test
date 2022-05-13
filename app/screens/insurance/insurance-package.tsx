import React from 'react';
import { ScrollView, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { AppText } from "../../components/app-text/AppText"
import AppButton from "../../components/app-button/AppButton"
import AppHeader from "../../components/app-header/AppHeader"

interface Props{}
const text ='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac.\n' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac.'
const InsurancePackage = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Gói vàng'} isBlue/>
      <ScrollView style={styles.body}>
        <AppText value={text} />
        <AppText value={text} />
        <AppText value={text} />
        <AppText value={text} />
        <AppText value={text} />
        <AppText value={text} />
        <AppText value={text} />
      </ScrollView>

      <View style={styles.wrapButton}>
        <AppButton title={'Mua ngay'} onPress={()=> {}}/>
      </View>
    </View>
  )
});

export default InsurancePackage;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.background
    },
  body: {
    padding: '16@s',
  },
  wrapButton: {
      height: '100@ms',
    justifyContent: "center",
    backgroundColor: color.background,
    paddingHorizontal: '16@ms',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,

    elevation: 5,
  }
});
