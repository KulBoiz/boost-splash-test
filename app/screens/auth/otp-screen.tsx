import React, { FC } from "react"
import { Pressable, Keyboard } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"
import { AppText } from "../../components/app-text/AppText"
import { presets } from "../../constants/presets"
import { ScaledSheet } from "react-native-size-matters";
import BackButton from "../../components/back-button/back-button"
import { color } from "../../theme"
import OtpItem from "./components/OtpItem"
import { AuthStackParamList } from "../../navigators/auth-stack"
import { RouteProp, useRoute } from "@react-navigation/native"


const OtpScreen :FC<StackScreenProps<AuthStackParamList, ScreenNames.OTP>> = observer(
  ({ navigation }) => {
    const {params: {phoneNumber, isRegister}} = useRoute<RouteProp<AuthStackParamList, ScreenNames.OTP>>()
    const isNum = Number(phoneNumber)
    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <BackButton />
        <AppText tx={'auth.otpCode'} style={[presets.header, styles.header]}/>
        <AppText tx={isNum ? 'auth.checkPhoneInbox' : 'auth.checkEmailInbox'} style={presets.secondary}/>
        <AppText value={isNum ? `+${phoneNumber}`: phoneNumber} style={[presets.secondary, presets.bold]}/>
        <OtpItem {...{phoneNumber, isRegister}} />
      </Pressable>
    )
  });

export default OtpScreen;

const styles = ScaledSheet.create({
  container: {flex: 1, paddingHorizontal: '20@s', paddingTop: '150@s', backgroundColor: color.background},
  header: {
    marginBottom: '20@s',
  },
  title: {fontSize: 30, textAlign: 'center'},
});
