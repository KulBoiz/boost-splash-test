import React from 'react';
import { Pressable, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { RightArrowSvg } from "../../../assets/svgs"
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
      <AppText tx={firstText} style={styles.firstText} capitalize fontSize={s(14)}/>
      <Pressable style={styles.wrapText}>
        <AppText tx={secondText} style={styles.secondText} capitalize onPress={action === 'register' ? _goToRegister: _goToLogin}/>
        <RightArrowSvg />
      </Pressable>
    </View>
  )
});

export default LoginText;
LoginText.displayName = 'LoginText'

const styles = ScaledSheet.create({
  container: {},
  firstText: {marginBottom: '11@s', fontSize: '14@ms', fontFamily: 'Inter-Medium'},
  secondText: {fontSize: '16@s', color:color.palette.blue, fontWeight: '500', marginRight: '10@ms'},
  wrapText: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});
