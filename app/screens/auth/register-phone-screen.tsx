import React, { FC, useState } from "react"
import { View } from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../components/AppText/AppText"
import { presets } from "../../constants/presets"
import LoginText from "./components/LoginText"
import { color } from "../../theme"
import FormInput from "../../components/form-input/form-input"
import * as Yup from "yup"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import AppButton from "../../components/AppButton/AppButton"
import { StackScreenProps } from "@react-navigation/stack"
import { AuthStackParamList } from "../../navigators/auth-stack"
import { ScreenNames } from "../../navigators/screen-names"
import { observer } from "mobx-react-lite"
import { numberOnly } from "../../constants/regex"


const RegisterPhoneScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.REGISTER_PHONE>> = observer(
  ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .trim()
      .matches(numberOnly,"")
  })
  const {control, handleSubmit, getValues, formState: { errors } } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const _handleContinue = () => {
      navigation.navigate(ScreenNames.OTP, { phoneNumber: getValues('phone')})
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
      <AppText tx={'auth.register'} style={presets.header}/>
      <AppText tx={'auth.emailOrPhone'} style={presets.secondary}/>
        <FormInput
          {...{
            name: 'phone',
            labelTx:'label.phoneNumber',
            autoCapitalize: 'none',
            error: errors?.phone?.message,
            keyboardType: 'number-pad',
            control,
          }}
        />
        <AppButton tx={'common.continue'} onPress={_handleContinue} containerStyle={styles.btn}/>
      </View>
      <View style={styles.wrapBottom}>
        <LoginText firstText={'auth.haveAccount'} secondText={'auth.loginNow'} action={'login'}/>
      </View>
    </View>
  )
});

export default RegisterPhoneScreen;
RegisterPhoneScreen.displayName = "RegisterPhoneScreen"

const styles = ScaledSheet.create({
    container: {  flex: 1,
      backgroundColor: color.palette.white,
      paddingHorizontal: "20@s",},
  body: {flex: 1, justifyContent:'center'},
  btn: {
    marginTop: '33@s'
  },
  wrapBottom: {
    paddingBottom: '30@s'
  }
});
