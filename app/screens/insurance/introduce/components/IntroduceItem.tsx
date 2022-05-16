import React  from "react"
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { TxKeyPath } from "../../../../i18n"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"

interface Props{
  svg: JSX.Element
  label: TxKeyPath
  content: TxKeyPath
}

const IntroduceItem = React.memo((props: Props) => {
  const {svg, label, content} = props

  return (
    <View style={styles.container}>
      {svg}
      <AppText tx={label} style={styles.label}/>
      <AppText tx={content} style={styles.content}/>
    </View>
  )
});

export default IntroduceItem;

const styles = ScaledSheet.create({
    container: {
      alignItems: "center",
      justifyContent: 'center',
      flex: 1,
      backgroundColor: color.palette.white,
      paddingHorizontal: '16@ms'
    },
  label: {
    fontSize: '32@ms',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginTop: '50@s'

  },
  content: {
    fontFamily: 'Inter-Regular',
    fontSize: '18@ms',
    textAlign: 'center',
    marginTop: '22@s'
  }

});
