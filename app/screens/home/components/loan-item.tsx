import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { TxKeyPath } from "../../../i18n"

interface Props{
  icon: JSX.Element
  title: TxKeyPath
  onPress?(): void
}

const LoanItem = React.memo((props: Props) => {
  const {icon, title, onPress} = props
  return (
    <View style={styles.container}>
      {icon}
      <AppText tx={title} style={styles.title}/>
    </View>
  )
});

export default LoanItem;

const styles = ScaledSheet.create({
    container: {
      width: '70@s',
      height: '75@s',
      borderRadius: '8@s',
      alignItems: "center",
      backgroundColor: '#FFF2EA',
      justifyContent: 'space-evenly'
    },
  title: {
      fontSize: '10@ms',
    textAlign: "center",
  }
});
