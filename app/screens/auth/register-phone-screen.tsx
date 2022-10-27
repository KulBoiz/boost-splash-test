import React, { FC, useState } from "react"
import { Alert, Keyboard, Pressable, View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../components/app-text/AppText"
import { presets } from "../../constants/presets"
import { color } from "../../theme"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import AppButton from "../../components/app-button/AppButton"
import { StackScreenProps } from "@react-navigation/stack"
import { AuthStackParamList } from "../../navigators/auth-stack"
import { ScreenNames } from "../../navigators/screen-names"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import ParsedText from 'react-native-parsed-text';
import i18n from "i18n-js"
import FormInput from "../../components/form-input/form-input"
import RenderAuthStep from "./components/render-step-auth"
import BackButton from "../../components/back-button/back-button"
import { fontFamily } from "../../constants/font-family"
import AppModal from "../../components/app-modal/app-modal"



const RegisterPhoneScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.REGISTER_PHONE>> = observer(
  ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .trim()
      .required(i18n.t('errors.requireEmailOrPhone'))
      // .matches(numberOnly,"Invalid phone number")
  })
    const { authStoreModel } = useStores()
    const [visible, setVisible] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

  const {control, handleSubmit, formState: { errors } } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const _handleContinue = async (data) => {
    const phone = `${data.phone}`
    const register = await authStoreModel.registerEmail(phone)
    if (register.kind === 'ok'){
      navigation.navigate(ScreenNames.OTP, { phoneNumber: phone ?? '', isRegister: true})
    }
    else {
      setError(register?.error?.message)
      setVisible(true)
    }
  }

  const handleClose = React.useCallback(()=> {
    setVisible(false)
  },[])

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <BackButton />
      <RenderAuthStep currentPosition={0} />
      <View style={styles.body}>
      <AppText tx={'auth.hello'} style={[presets.header, styles.header]}/>
        <ParsedText
          style={presets.secondary}
          parse={
            [
              {pattern: /số điện thoại|email/, style: styles.bold},
            ]
          }
          childrenProps={{allowFontScaling: false}}
        >
          {i18n.t('auth.enterPhone')}
        </ParsedText>
        <FormInput
          {...{
            name: 'phone',
            labelTx: 'label.emailAndPhone',
            placeholderTx: 'placeholder.emailAndPhone',
            autoCapitalize: 'none',
            error: errors?.phone?.message,
            control,
            style: {marginTop: s(30)}
          }}
        />
      </View>
      <View style={styles.wrapBottom}>
        <AppButton tx={'common.continue'} onPress={handleSubmit(_handleContinue)} containerStyle={styles.btn}/>
      </View>
      <AppModal visible={visible} closeModal={handleClose} content={error} />
    </Pressable>
  )
});

export default RegisterPhoneScreen;
RegisterPhoneScreen.displayName = "RegisterPhoneScreen"

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingTop: '80@vs',
    backgroundColor: color.palette.white,
    paddingHorizontal: "16@ms",
  },
  bold: {
    fontFamily: fontFamily.bold
  },
  header:{
    marginBottom: '20@s',
  },
  location: {
    marginBottom: '15@s',
    marginTop: '60@s'
  },
  body: {flex: 1},
  btn: {
    marginTop: '33@s'
  },
  wrapBottom: {
    paddingBottom: '30@s',
    alignItems: "center"
  }
});
