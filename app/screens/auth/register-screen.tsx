import React, { FC, useEffect, useState } from "react"
import { Alert, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScaledSheet } from "react-native-size-matters"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AppButton from "../../components/app-button/AppButton"
import FormInput from "../../components/form-input/form-input"
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"
import { useStores } from "../../models"
import { AppText } from "../../components/app-text/AppText"
import { AuthStackParamList } from "../../navigators/auth-stack"
import TermCheckbox from "./components/TermCheckbox"
import RenderAuthStep from "./components/render-step-auth"
import { fontFamily } from "../../constants/font-family"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import i18n from "i18n-js"
import {get} from 'lodash'

export const RegisterScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.REGISTER>> = observer(
  ({ navigation }) => {
    // const nextScreen = () => navigation.navigate(AppRoutes.APP)
    const validationSchema = Yup.object().shape({
      fullName: Yup.string().required(i18n.t('errors.requireFullName')).trim(),
      password: Yup.string().required(i18n.t('errors.requirePassword')).trim()
        .min(8, 'Mật khẩu cần ít nhất 8 ký tự'),
      passwordConfirm: Yup.string()
        .trim()
        .oneOf([Yup.ref('password'), null], i18n.t('errors.passwordNotMatch')),
    })
    const {control, handleSubmit, formState: {errors}, setValue} = useForm({
      delayError: 0,
      defaultValues: undefined,
      mode: "all",
      resolver: yupResolver(validationSchema),
      reValidateMode: "onChange",
    })

    const { authStoreModel } = useStores()
    const [checkboxState, setCheckboxState] = useState(false);
    const email = get(authStoreModel?.user,'emails[0].email')
    const phone = get(authStoreModel?.user,'tels[0].tel')

    const _handleRegister = async (data) => {
      const register = await authStoreModel.register(data.fullName, data.password, data.passwordConfirm)
      console.log('register', register)
      if (register.kind !== 'ok') {
        Alert.alert(register?.error?.message ?? 'Something went wrong')
      }
    }
    useEffect(()=> {
      if (authStoreModel?.user){
        setValue('email', email ?? phone)
      }
    },[])

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.body}>
          <RenderAuthStep currentPosition={2}/>
          <AppText tx={'auth.register'} style={styles.textLogin}/>
          <FormInput
            {...{
              name: 'fullName',
              labelTx: 'label.fullName',
              placeholderTx: 'placeholder.fullName',
              autoCapitalize: 'none',
              control,
              error: errors?.fullName?.message
            }}
          />
          <FormInput
            {...{
              name: 'email',
              labelTx: 'label.emailAndPhone',
              placeholderTx: 'placeholder.email',
              autoCapitalize: 'none',
              error: errors?.email?.message,
              control,
              editable: false
            }}
          />

          <FormInput
            {...{
              name: 'password',
              labelTx: 'label.password',
              placeholderTx: 'placeholder.password',
              autoCapitalize: 'none',
              error: errors?.password?.message,
              control,
              showIcon: true,
            }}
          />
          <FormInput
            {...{
              labelTx: 'label.rePassword',
              name: 'passwordConfirm',
              placeholderTx: 'placeholder.reenteredPassword',
              autoCapitalize: 'none',
              control,
              showIcon: true,
              error: errors?.passwordConfirm?.message
            }}
          />
          <TermCheckbox checkboxState={checkboxState} setCheckboxState={setCheckboxState} />

        </View>
        <View style={styles.wrapBtn}>
          <AppButton onPress={handleSubmit(_handleRegister)} tx={"auth.register"} disable={!checkboxState} containerStyle={styles.button}/>
        </View>
      </KeyboardAwareScrollView>
    )
  },
)
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
    paddingHorizontal: "16@ms",
  },
  body: {
    flex: 1,
    paddingTop: '80@vs'
  },
  textLogin: {
    fontSize: '44@s',
    fontFamily: fontFamily.bold,
    marginBottom: '20@s',
  },
  button: {
    marginTop: '40@s',
  },
  forgot: {
    alignSelf:'flex-end',
    color: color.palette.blue
  },
  wrapBtn :{
    flex:1,
    justifyContent: "flex-end",
    marginBottom: '30@s',
  }
})
