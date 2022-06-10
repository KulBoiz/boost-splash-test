import React from 'react';
import { View } from 'react-native';
import { TxKeyPath } from "../../../i18n"
import i18n, { translate } from "i18n-js"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"

interface Props{
  icon:  number | JSX.Element
  title: string | TxKeyPath
}

const IconItem = React.memo((props: Props) => {
  const {icon, title} = props
  const realTitle = i18n.t(title).includes('missing') ? title : translate(title)
  const iconType = typeof icon === 'number'

  return (
    <View style={styles.container}>
      {
        iconType ?
          <FastImage source={icon} style={styles.icon}/>
          :
          {icon}
      }
      <AppText value={realTitle} style={styles.text} />
    </View>
  )
});

export default IconItem;

const styles = ScaledSheet.create({
  container: {
    width: '25%',
    alignItems: "center"
  },
  icon :{
    width: '24@s',
    height: '24@s'
  },
  text: {
    marginTop: '12@s'
  }
});
