import React, { FC, useState } from "react"
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
import RenderAuthStep from "./components/render-step-auth"
import ConfirmModal from "../../components/app-modal/confirm-modal"
import { goBack } from "../../navigators"


const OtpScreen :FC<StackScreenProps<AuthStackParamList, ScreenNames.OTP>> = observer(
  ({ navigation }) => {
    const {params: {phoneNumber, isRegister}} = useRoute<RouteProp<AuthStackParamList, ScreenNames.OTP>>()
    const [modal, setModal] = useState<boolean>(false)
    const isNum = Number(phoneNumber)
    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <BackButton />
        <RenderAuthStep currentPosition={1} />
        <AppText tx={'auth.otpCode'} style={[presets.header, styles.header]}/>
        <AppText tx={isNum ? 'auth.checkPhoneInbox' : 'auth.checkEmailInbox'} style={presets.secondary}/>
        <AppText value={isNum ? `+${phoneNumber}`: phoneNumber} style={[presets.secondary, presets.bold]}/>
        <AppText onPress={()=> setModal(true)} value={isNum ? 'Đổi số điện thoại' : 'Đổi địa chỉ email'} style={styles.changeText}/>
        <OtpItem {...{phoneNumber, isRegister}} />
        <ConfirmModal
          visible={modal}
          closeModal={()=>setModal(false)}
          onPress={goBack}
          title={isNum ? 'Nhập sai số điện thoại?': 'Nhập sai địa chỉ email'}
          content={isNum ? 'Vui lòng nhập số điện thoại mới để nhận OTP.' : 'Vui lòng nhập địa chỉ email mới để nhận OTP.'}/>
      </Pressable>
    )
  });

export default OtpScreen;

const styles = ScaledSheet.create({
  container: {flex: 1, paddingHorizontal: '16@ms', paddingTop: '80@vs', backgroundColor: color.background},
  header: {
    marginBottom: '20@s',
  },
  title: {fontSize: 30, textAlign: 'center'},
  changeText: {
    fontSize: '12@ms',
    color: color.palette.blue,
    textDecorationLine: "underline",
    marginTop: '4@s'
  }
});
