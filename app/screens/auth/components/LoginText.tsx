import React from 'react';
import { Pressable, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { LongRightArrowSvg } from "../../../assets/svgs"
import { s, ScaledSheet } from 'react-native-size-matters';
import { color } from "../../../theme"
import { TxKeyPath } from "../../../i18n"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"


interface Props{
  firstText: TxKeyPath
  secondText: TxKeyPath
  action: 'register' | 'login'
}

const LoginText = React.memo(({ firstText, secondText, action}: Props) => {
  const _goToLogin= ()=> {
    navigate(ScreenNames.LOGIN)
  }
  const _goToRegister= ()=> {
    navigate(ScreenNames.REGISTER_PHONE)
  }
  return (
    <View style={styles.container}>
      <AppText tx={firstText} style={styles.firstText} />
      <Pressable style={styles.wrapText}>
        <AppText tx={secondText} style={styles.secondText} onPress={action === 'register' ? _goToRegister: _goToLogin}/>
        <LongRightArrowSvg />
      </Pressable>
    </View>
  )
});

export default LoginText;
LoginText.displayName = 'LoginText'

const styles = ScaledSheet.create({
  container: {flexDirection: "row", alignItems: "center"},
  firstText: {fontSize: '14@ms', fontFamily: 'Inter-Medium', marginRight: '7@ms'},
  secondText: {fontSize: '14@ms', color:color.palette.blue, fontWeight: '500', marginRight: '10@ms'},
  wrapText: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
