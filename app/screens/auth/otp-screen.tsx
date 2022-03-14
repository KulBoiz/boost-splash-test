import React, { FC, useState } from "react"
import { View } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"

import { AppText } from "../../components/AppText/AppText"
import { presets } from "../../constants/presets"
import { ScaledSheet } from "react-native-size-matters";
import BackButton from "../../components/back-button/back-button"
import { color } from "../../theme"
import OtpItem from "./components/OtpItem"
import { AuthStackParamList } from "../../navigators/auth-stack"
import { RouteProp, useRoute } from "@react-navigation/native"


const OtpScreen :FC<StackScreenProps<AuthStackParamList, ScreenNames.OTP>> = observer(
  ({ navigation }) => {
    const {params: {phoneNumber}} = useRoute<RouteProp<AuthStackParamList, ScreenNames.OTP>>()
    const [value, setValue] = useState('');

    return (
      <View style={styles.container}>
        <BackButton />
        <AppText tx={'auth.otpCode'} style={presets.header}/>
        <AppText tx={'auth.checkInbox'} style={presets.secondary}/>
        <AppText value={`+${phoneNumber}`} style={[presets.bold, presets.secondary]}/>
        <OtpItem value={value} setValue={setValue} />
      </View>
    )
  });

export default OtpScreen;

const styles = ScaledSheet.create({
  container: {flex: 1, paddingHorizontal: '20@s', paddingTop: '150@s', backgroundColor: color.background},

  title: {fontSize: 30, textAlign: 'center'},
});
