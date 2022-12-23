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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import i18n from "i18n-js"
import {get} from 'lodash'
import { fontFamily } from "../../constants/font-family"
import { isIos } from "../../constants/variable"
import BackButton from "../../components/back-button/back-button"
import { navigate } from "../../navigators"

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
    const [loading, setLoading] = useState<boolean>(false)
    const [checkboxState, setCheckboxState] = useState(false);
    const email = get(authStoreModel?.temporaryUser,'emails[0].email')
    const phone = get(authStoreModel?.temporaryUser,'tels[0].tel')

    const _handleRegister = async (data) => {
      setLoading(true)
      const register = await authStoreModel.register(data.fullName, data.password, data.passwordConfirm)
      if (register) {
        setLoading(false)
      }
      if (register.kind !== 'ok') {
        Alert.alert(register?.error?.message ?? 'Something went wrong')
      }
    }
    useEffect(()=> {
      if (authStoreModel?.user){
        setValue('email', email ?? phone)
      }
    },[])

    const pressBack = React.useCallback(()=> {
      authStoreModel.logout()
      navigate(ScreenNames.REGISTER_PHONE)
    },[])

    return (
      <KeyboardAwareScrollView
        style={styles.container}  enableOnAndroid
        extraScrollHeight={isIos ? -50 : 10}>
        <View style={styles.body}>
          <BackButton onPress={pressBack}/>
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
              placeholderTx: 'placeholder.emailAndPhone',
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
          <AppButton onPress={handleSubmit(_handleRegister)} tx={"auth.register"} loading={loading} disable={!checkboxState} containerStyle={styles.button}/>
        </View>
      </KeyboardAwareScrollView>
    )
  },
)
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },

  body: {
    flex: 1,
    paddingTop: '80@vs',
    paddingHorizontal: "16@ms",

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
    paddingHorizontal: "16@ms",

  }
})
