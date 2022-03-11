import React, { FC, useState } from "react"
import { Keyboard, Pressable } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScaledSheet } from "react-native-size-matters"
import { useForm, SubmitErrorHandler } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import AppButton from "../../components/AppButton/AppButton"
import FormInput from "../../components/form-input/form-input"
import { NavigatorParamList } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"
import { useStores } from "../../models"

export const LoginScreen: FC<StackScreenProps<NavigatorParamList, ScreenNames.LOGIN>> = observer(
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
        <FormInput
          {...{
            name: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            autoCapitalize: 'none',
            control,
            error: errors?.email?.message
          }}
        />
        <FormInput
          {...{
            name: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
            autoCapitalize: 'none',
            error: errors?.password?.message,
            secureTextEntry: true,
            control,
          }}
        />
        <AppButton onPress={handleSubmit(_handleLogin, _onError)} title={"LOGIN"} containerStyle={styles.button}/>
      </Pressable>
    )
  },
)
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
    justifyContent: "center",
    paddingHorizontal: "20@s",
  },
  button: {
    marginTop: '40@s'
  }
})
