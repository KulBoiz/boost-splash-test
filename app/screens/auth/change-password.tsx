import React, { FC } from "react"
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
import { AuthStackParamList } from "../../navigators/auth-stack"

export const ChangePassword: FC<StackScreenProps<AuthStackParamList, ScreenNames.CHANGE_PASSWORD>> = observer(
  ({ navigation }) => {
    // const nextScreen = () => navigation.navigate(AppRoutes.APP)
    const validationSchema = Yup.object().shape({
      password: Yup.string().required("Please enter your password").trim(),
      passwordConfirm: Yup.string()
        .trim()
        .oneOf([Yup.ref('password'), null], 'Password do not match'),
    })
    const {control, handleSubmit, formState: {errors}} = useForm({
      delayError: 0,
      defaultValues: undefined,
      mode: "all",
      resolver: yupResolver(validationSchema),
      reValidateMode: "onChange",
    })

    const { authStoreModel } = useStores()

    const _handleChangePassword = async (data) => {
      const register = await authStoreModel.changePassword(data.password, data.passwordConfirm)
      console.log('change password screen',register)
      if (register.kind === 'ok' && register.data.status === '204') {
        navigation.navigate(ScreenNames.LOGIN)
      }
      else Alert.alert('Something went wrong')
    }

    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.body}>
          <AppText tx={'auth.resetPassword'} style={styles.textLogin}/>

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
          <FormInput
            {...{
              name: 'passwordConfirm',
              placeholderTx: 'placeholder.reenteredPassword',
              autoCapitalize: 'none',
              control,
              showIcon: true,
              error: errors?.passwordConfirm?.message
            }}
          />
          <AppButton onPress={handleSubmit(_handleChangePassword)} tx={"auth.resetPassword"} containerStyle={styles.button}/>
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
