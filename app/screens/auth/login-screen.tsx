import React, { FC, useState } from "react"
import { Keyboard, Pressable, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScaledSheet } from "react-native-size-matters"
import { useForm, SubmitErrorHandler } from "react-hook-form"
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

export const LoginScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.LOGIN>> = observer(
  ({ navigation }) => {
    // const nextScreen = () => navigation.navigate(AppRoutes.APP)
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .trim()
        .required("Please enter your email")
        .email("This is not a valid email"),
      password: Yup.string().required("Please enter your password").trim(),
    })
    const {control, handleSubmit} = useForm({
      delayError: 0,
      defaultValues: undefined,
      mode: "all",
      resolver: yupResolver(validationSchema),
      reValidateMode: "onChange",
    })

    const { authStoreModel } = useStores()
    const [errors, setErrors] = useState<any>({})

    const _handleLogin = async (data) => {
      authStoreModel.login(data.email, data.password)
    }

    const _onError: SubmitErrorHandler<any> = (errors, e) => {
      setErrors(errors)
      return console.log({errors})
    }

    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.body}>
        <AppText value={'Đăng Nhập'} style={styles.textLogin}/>
        <FormInput
          {...{
            name: 'email',
            placeholderTx: 'placeholder.emailAndPhone',
            autoCapitalize: 'none',
            control,
            error: errors?.email?.message
          }}
        />
        <FormInput
          {...{
            name: 'password',
            placeholderTx: 'placeholder.password',
            autoCapitalize: 'none',
            error: errors?.password?.message,
            control,
            showIcon: true,
          }}
        />
        <AppText tx={'auth.forgotPassword'} style={styles.forgot} underline/>
        <AppButton onPress={handleSubmit(_handleLogin, _onError)} tx={"auth.login"} containerStyle={styles.button}/>
        </View>
        <View style={styles.wrapBottom}>
          <LoginText firstText={'auth.dontHaveAccount'} secondText={'auth.registerNow'} action={'register'}/>
        </View>
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
    marginLeft: '20@s'
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
