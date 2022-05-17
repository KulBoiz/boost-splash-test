import React, { FC, useState } from "react"
import { Keyboard, Pressable, View } from "react-native"
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
import AppModal from "../../components/app-modal/app-modal"
import { StackActions } from "@react-navigation/native"
import { fontFamily } from "../../constants/font-family"
import { presets } from "../../constants/presets"

const errorContent = 'Sai thông tin tài khoản hoặc mật khẩu.\nVui lòng kiểm tra lại.'

export const LoginScreen: FC<StackScreenProps<AuthStackParamList, ScreenNames.LOGIN>> = observer(
  ({ navigation }) => {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .trim()
        .required("Vui lòng nhập email hoặc số điện thoại"),
        // .email("This is not a valid email"),
      password: Yup.string().required("Vui lòng nhập mật khẩu").trim(),
    })
    const {control, handleSubmit, formState: {errors}} = useForm({
      delayError: 0,
      defaultValues: undefined,
      mode: "all",
      resolver: yupResolver(validationSchema),
      reValidateMode: "onChange",
    })

    const { authStoreModel } = useStores()
    const [visible, setVisible] = useState<boolean>(false)

    const _handleLogin = async (data) => {
      const auth = await authStoreModel.login(data.email, data.password)
      if (auth.kind === 'ok'){
        navigation.dispatch(StackActions.push(ScreenNames.APP))
      }
      else setVisible(true)
    }

    const closeModal = ()=> {
      setVisible(false)
    }

    const forgotPassword = ()=> {
      navigation.navigate(ScreenNames.FORGOT_PASSWORD)
    }

    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.body}>
        <AppText tx={'auth.login'} style={[presets.header,styles.textLogin]}/>
        <FormInput
          {...{
            name: 'email',
            labelTx: 'label.login.emailAndPhone',
            placeholderTx: 'placeholder.login.emailAndPhone',
            autoCapitalize: 'none',
            control,
            error: errors?.email?.message
          }}
        />
        <FormInput
          {...{
            name: 'password',
            labelTx: 'label.login.password',
            placeholderTx: 'placeholder.login.password',
            autoCapitalize: 'none',
            error: errors?.password?.message,
            control,
            showIcon: true,
          }}
        />
        <AppText tx={'auth.forgotPassword'} style={styles.forgot} underline onPress={forgotPassword}/>
        <AppButton onPress={handleSubmit(_handleLogin)} tx={"auth.login"} containerStyle={styles.button}/>
        <AppText tx={'auth.backToHome'} style={styles.backToHome} underline onPress={()=> navigation.dispatch(StackActions.push(ScreenNames.APP))}/>
        </View>
        <View style={styles.wrapBottom}>
          <LoginText firstText={'auth.dontHaveAccount'} secondText={'auth.registerNow'} action={'register'}/>
        </View>
        <AppModal {...{visible, closeModal, content: errorContent}}/>
      </Pressable>
    )
  },
)
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
    paddingHorizontal: "20@ms",
  },
  backToHome: {
    color: color.palette.orange,
    alignSelf: "center",
    marginTop: '16@s'
  },
  body: {flex: 1, justifyContent:'center'},
  textLogin: {
    marginBottom: '30@s',
    marginLeft: '20@ms'
  },
  button: {
    marginTop: '40@s'
  },
  forgot: {
    alignSelf:'flex-end',
    color: color.palette.blue
  },
  wrapBottom: {
    paddingBottom: '30@s',
    alignItems: "center"
  }
})
