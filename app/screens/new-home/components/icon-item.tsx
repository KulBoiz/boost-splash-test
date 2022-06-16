import React from 'react';
import { Pressable } from "react-native"
import { TxKeyPath } from "../../../i18n"
import i18n, { translate } from "i18n-js"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"

interface Props{
  icon:  number | JSX.Element
  title: string | TxKeyPath
  onPress(): void
}

const IconItem = React.memo((props: Props) => {
  const {icon, title, onPress} = props
  const realTitle = i18n.t(title).includes('missing') ? title : translate(title)
  const iconType = typeof icon === 'number'

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {
        iconType ?
          <FastImage source={icon} style={styles.icon}/>
          :
          {icon}
      }
      <AppText value={realTitle} style={styles.text} />
    </Pressable>
  )
});

export default IconItem;

const styles = ScaledSheet.create({
  container: {
    width: '25%',
    alignItems: "center"
  },
  icon :{
    width: '44@s',
    height: '44@s'
  },
  text: {
    width: '90%',
    fontSize: '12@ms',
    lineHeight: '20@ms',
    fontFamily: fontFamily.regular,
    textAlign: "center",
    color: 'rgba(0, 0, 0, 0.65)'
  }
});
