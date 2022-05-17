import React, { FC, useEffect, useState } from "react"
import { Alert, Keyboard, Pressable, View } from "react-native"
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
import LoginText from "./components/LoginText"
import { AuthStackParamList } from "../../navigators/auth-stack"
import TermCheckbox from "./components/TermCheckbox"

export const RegisterScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.REGISTER>> = observer(
  ({ navigation }) => {
    // const nextScreen = () => navigation.navigate(AppRoutes.APP)
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .trim()
        .required("Please enter your email")
        .email("This is not a valid email"),
      password: Yup.string().required("Please enter your password").trim(),
      passwordConfirm: Yup.string()
        .trim()
        .oneOf([Yup.ref('password'), null], 'Password do not match'),
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

    const _handleRegister = async (data) => {
      const register = await authStoreModel.register(data.fullName, data.password, data.passwordConfirm)
      if (register.kind !== 'ok') {
        Alert.alert(register?.error?.message ?? 'Something went wrong')
      }
    }
    useEffect(()=> {
      setValue('email', authStoreModel?.user?.emails[0]?.email ?? authStoreModel?.user?.tels[0]?.tel)
    },[])

    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.body}>
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
              labelTx: 'label.login.emailAndPhone',
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
              labelTx: 'label.login.password',
              placeholderTx: 'placeholder.password',
              autoCapitalize: 'none',
              error: errors?.password?.message,
              control,
              showIcon: true,
            }}
          />
          <FormInput
            {...{
              label: 'Nhập lại mật khẩu',
              name: 'passwordConfirm',
              placeholderTx: 'placeholder.reenteredPassword',
              autoCapitalize: 'none',
              control,
              showIcon: true,
              error: errors?.passwordConfirm?.message
            }}
          />
          <TermCheckbox checkboxState={checkboxState} setCheckboxState={setCheckboxState} />
          <AppButton onPress={handleSubmit(_handleRegister)} tx={"auth.register"} containerStyle={styles.button}/>
        </View>
        {/*<View style={styles.wrapBottom}>*/}
        {/*  <LoginText firstText={'auth.haveAccount'} secondText={'auth.loginNow'} action={'login'}/>*/}
        {/*</View>*/}
      </Pressable>
    )
  },
)
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
    paddingHorizontal: "20@s",
  },
  body: {flex: 1, justifyContent:'center'},
  textLogin: {
    fontSize: '44@s',
    fontWeight: '400', marginBottom: '40@s',
  },
  button: {
    marginTop: '40@s'
  },
  forgot: {
    alignSelf:'flex-end',
    color: color.palette.blue
  },
  wrapBottom: {
    paddingBottom: '30@s'
  }
})
