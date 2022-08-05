import React from 'react';
import { Pressable } from "react-native"
import { TxKeyPath } from "../../../i18n"
import i18n, { translate } from "i18n-js"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"

interface Props{
  icon:  number | React.ReactNode
  title: string | TxKeyPath
  onPress(): void
}

const IconItem = React.memo((props: Props) => {
  const {icon, title, onPress} = props
  const realTitle = i18n.t(title).includes('missing') ? title : translate(title)
  const iconType = typeof icon === 'number'

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <>
        {
          iconType ?
            <FastImage source={icon} style={styles.icon}/>
            :
            {icon}
        }
      <AppText value={realTitle} style={styles.text} />
      </>
    </Pressable>
  )
});

export default IconItem;

const styles = ScaledSheet.create({
  container: {
    width: '20%',
    alignItems: "center"
  },
  icon :{
    width: '35@s',
    height: '35@s'
  },
  text: {
    marginTop: '11@s',
    width: '90%',
    fontSize: '11@ms',
    lineHeight: '13@ms',
    fontFamily: fontFamily.medium,
    textAlign: "center",
    color: 'rgba(0, 0, 0, 0.75)'
  }
});
