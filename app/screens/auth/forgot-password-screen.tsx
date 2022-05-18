import React, { FC } from "react"
import { Keyboard, Pressable, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"
import { AppText } from "../../components/app-text/AppText"
import { presets } from "../../constants/presets"
import { ScaledSheet } from "react-native-size-matters";
import BackButton from "../../components/back-button/back-button"
import { color } from "../../theme"
import { AuthStackParamList } from "../../navigators/auth-stack"
import FormInput from "../../components/form-input/form-input"
import AppButton from "../../components/app-button/AppButton"
import { useStores } from "../../models"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import * as Yup from "yup"
import i18n from "i18n-js"
import ParsedText from "react-native-parsed-text"


const ForgotPasswordScreen :FC<StackScreenProps<AuthStackParamList, ScreenNames.FORGOT_PASSWORD>> = observer(
  ({ navigation }) => {
    const { authStoreModel } = useStores()

    const validationSchema = Yup.object().shape({
      telOrEmail: Yup.string()
        .trim()
        .required("Please enter your email or phone number")
    })
    const {control, handleSubmit, formState: {errors}, setError} = useForm({
      delayError: 0,
      defaultValues: undefined,
      mode: "all",
      resolver: yupResolver(validationSchema),
      reValidateMode: "onChange",
    })

    const _handlePress = async (data) => {
      const forgotPassword = await authStoreModel.forgotPassword(data.telOrEmail)
      if (forgotPassword.kind === 'ok'){
        navigation.navigate(ScreenNames.OTP, {phoneNumber: data.telOrEmail, isRegister: false} )
      }
      else {
        setError('telOrEmail', {message: 'Sai số điện thoại hoặc email'})
      }
    }


    return (
      <View style={styles.container}>
        <BackButton />
          <Pressable style={styles.body} onPress={Keyboard.dismiss}>
            <AppText tx={'auth.forgotPassword'} style={[presets.header, styles.header]}/>
            <ParsedText
              style={[presets.secondary, styles.text]}
              parse={
                [
                  {pattern: /địa chỉ email|số điện thoại/, style: styles.bold},
                ]
              }
              childrenProps={{allowFontScaling: false}}
            >
              {i18n.t('auth.emailOrPhone')}
            </ParsedText>
            <FormInput
              {...{
                name: 'telOrEmail',
                autoCapitalize: 'none',
                labelTx: 'label.login.emailAndPhone',
                placeholderTx:'placeholder.emailAndPhone',
                error: errors?.telOrEmail?.message,
                control,
              }}
            />
            <AppButton tx={'common.sentCheck'} onPress={handleSubmit(_handlePress)} containerStyle={styles.btn}/>
          </Pressable>

      </View>
    )
  });

export default ForgotPasswordScreen;

const styles = ScaledSheet.create({
  container: {  flex: 1,
    backgroundColor: color.palette.white,
    paddingHorizontal: "16@ms",
  },
  text: {
    marginBottom: '50@s'
  },
  bold: {
    fontFamily: 'Inter-Bold'
  },
  header:{
    fontSize: '44@ms',
    marginBottom: '20@s'
  },
  body: {flex: 1, marginTop: '160@s'},
  btn: {
    marginTop: '20@s'
  },
});
