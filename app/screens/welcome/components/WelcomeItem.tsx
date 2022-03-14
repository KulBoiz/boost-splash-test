import React  from "react"
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { AppText } from "../../../components/AppText/AppText"
import { color } from "../../../theme"
import { TxKeyPath } from "../../../i18n"

interface Props{
  svg: JSX.Element
  label: TxKeyPath
  content: TxKeyPath
}

const WelcomeItem = React.memo((props: Props) => {
  const {svg, label, content} = props

  return (
    <View style={styles.container}>
      {svg}
      <AppText tx={label} style={styles.label}/>
      <AppText tx={content} style={styles.content}/>
    </View>
  )
});

export default WelcomeItem;

WelcomeItem.displayName = 'WelcomeItem';

const styles = ScaledSheet.create({
    container: {
      alignItems: "center",
      justifyContent: 'center',
      flex: 1,
      backgroundColor: color.palette.white
    },
  label: {
      fontSize: '40@s',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '50@s'

  },
  content: {
      fontSize: '18@s',
    textAlign: 'center',
  marginTop: '22@s'
  }

});
