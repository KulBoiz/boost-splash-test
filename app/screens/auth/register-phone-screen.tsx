import React, { FC, useState } from "react"
import { Alert, Keyboard, Pressable, View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../components/app-text/AppText"
import { presets } from "../../constants/presets"
import LoginText from "./components/LoginText"
import { color } from "../../theme"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import AppButton from "../../components/app-button/AppButton"
import { StackScreenProps } from "@react-navigation/stack"
import { AuthStackParamList } from "../../navigators/auth-stack"
import { ScreenNames } from "../../navigators/screen-names"
import { observer } from "mobx-react-lite"
import { numberOnly } from "../../constants/regex"
import CountrySelect from "./components/country-select"
import PhoneInput from "./components/phone-input"
import { useStores } from "../../models"
import ParsedText from 'react-native-parsed-text';
import i18n from "i18n-js"
import FormInput from "../../components/form-input/form-input"



const RegisterPhoneScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.REGISTER_PHONE>> = observer(
  ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .trim()
      .required(i18n.t('errors.requireEmailOrPhone'))
      // .matches(numberOnly,"Invalid phone number")
  })
    const { authStoreModel } = useStores()
    const [prefix, setPrefix] = useState<string>('84')

  const {control, handleSubmit, formState: { errors } } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const _handleContinue = async (data) => {
    console.log(data)
    const phone = `${data.phone}`
    const register = await authStoreModel.registerEmail(phone)
    console.log(register)
    if (register.kind === 'ok'){
      navigation.navigate(ScreenNames.OTP, { phoneNumber: phone ?? '', isRegister: true})
    }
    else {
      Alert.alert(register?.error?.message)
    }
  }
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.body}>
      <AppText tx={'auth.hello'} style={[presets.header, styles.header]}/>
        <ParsedText
          style={presets.secondary}
          parse={
            [
              {pattern: /số điện thoại|vị trí/, style: styles.bold},
            ]
          }
          childrenProps={{allowFontScaling: false}}
        >
          {i18n.t('auth.enterPhone')}
        </ParsedText>
       {/*<CountrySelect style={styles.location} changePrefix={setPrefix}/>*/}
       {/* <PhoneInput*/}
       {/*   {...{*/}
       {/*     prefix,*/}
       {/*     name: 'phone',*/}
       {/*     labelTx:'label.phoneNumber',*/}
       {/*     autoCapitalize: 'none',*/}
       {/*     error: errors?.phone?.message,*/}
       {/*     keyboardType: 'number-pad',*/}
       {/*     control,*/}
       {/*   }}*/}
       {/* />*/}
        <FormInput
          {...{
            name: 'phone',
            labelTx: 'label.login.emailAndPhone',
            placeholderTx: 'placeholder.emailAndPhone',
            autoCapitalize: 'none',
            error: errors?.phone?.message,
            control,
            style: {marginTop: s(30)}
          }}
        />
        <AppButton tx={'common.continue'} onPress={handleSubmit(_handleContinue)} containerStyle={styles.btn}/>
      </View>
      <View style={styles.wrapBottom}>
        <LoginText firstText={'auth.haveAccount'} secondText={'auth.loginNow'} action={'login'}/>
      </View>
    </Pressable>
  )
});

export default RegisterPhoneScreen;
RegisterPhoneScreen.displayName = "RegisterPhoneScreen"

const styles = ScaledSheet.create({
  container: {  flex: 1,
    backgroundColor: color.palette.white,
    paddingHorizontal: "20@s",
  },
  bold: {
    fontFamily: 'Inter-Bold'
  },
  header:{
    marginBottom: '20@s',
  },
  location: {
    marginBottom: '15@s',
    marginTop: '60@s'
  },
  body: {flex: 1, justifyContent:'center'},
  btn: {
    marginTop: '33@s'
  },
  wrapBottom: {
    paddingBottom: '30@s',
    alignItems: "center"
  }
});
