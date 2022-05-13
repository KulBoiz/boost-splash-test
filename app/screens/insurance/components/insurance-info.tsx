import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"

interface Props{}

const InsuranceInfo = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac.\n' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Risus vivamus aliquet porttitor ac.'}/>
    </View>
  )
});

export default InsuranceInfo;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue
    },
});
