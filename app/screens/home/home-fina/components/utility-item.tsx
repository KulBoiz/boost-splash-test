import React from "react"
import { Pressable, View } from "react-native"
import i18n, { translate } from "i18n-js"
import FastImage from "react-native-fast-image"
import { ms, ScaledSheet } from "react-native-size-matters"
import { TxKeyPath } from "../../../../i18n"
import { AppText } from "../../../../components/app-text/AppText"
import { fontFamily } from "../../../../constants/font-family"
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW } from "../../../../styles/common-style"
import { DiscountSvg } from "../../../../assets/svgs"
import { color } from "../../../../theme"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"
import { isAndroid } from "../../../../constants/variable"


interface Props{
  icon:  number | string
  title: string | TxKeyPath
  onPress(): void
}

const UtilityItem = React.memo((props: Props) => {
  const {icon, title, onPress} = props
  const realTitle = i18n.t(title).includes('missing') ? title : translate(title)
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <>
        <FastImage source={icon} style={styles.icon}/>
        <AppText value={realTitle} style={styles.text} />
      </>
    </Pressable>
  )
});

export default UtilityItem;

const styles = ScaledSheet.create({
  container: {
    width: '25%',
    alignItems: "center",
    marginVertical: '12@s'
  },
  icon :{
    width: '48@s',
    height: '48@s',
  },
  text: {
    marginTop: '11@s',
    width: '90%',
    fontSize: '11@ms',
    lineHeight: '13@ms',
    fontFamily: fontFamily.medium,
    textAlign: "center",
    color: 'rgba(0, 0, 0, 0.75)'
  },
});
