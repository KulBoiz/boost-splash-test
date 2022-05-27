import React  from "react"
import { View } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import RenderStepAgent from "./components/render-step"
import AgentForm from "./components/agent-form"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { CONTAINER_PADDING } from "../../styles/common-style"
import { color } from "../../theme"
import AppButton from "../../components/app-button/AppButton"
import { ScaledSheet } from "react-native-size-matters"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"

interface Props{}

const RegisterInfo = React.memo((props: Props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(i18n.t('errors.requireEmail'))
      .email(i18n.t('errors.invalidEmail')),
    fullName: Yup.string().required(i18n.t('errors.requireFullName')),
    // sex: Yup.string().required(i18n.t('errors.requireSex')),
    contactAddress: Yup.string().required(i18n.t('errors.requireAddress')),
    phone: Yup.string().required(i18n.t('errors.requirePhone'))

  })
  const {control, handleSubmit, formState: {errors}, setValue, watch} = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })
  const nextStep = () => {
    navigate(ScreenNames.PHOTO_TUTORIAL)
  }
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Đăng ký thông tin'} isBlue/>
      <RenderStepAgent currentPosition={0} />
      <View style={CONTAINER_PADDING}>
        <AgentForm {...{control, errors, setValue, watch}} />
      </View>
      <View style={styles.wrapBtn}>
        <AppButton tx={'common.continue'} onPress={handleSubmit(nextStep)}/>
      </View>
    </View>
  )
});

export default RegisterInfo;

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.background,
      flex:1
    },
  wrapBtn:{
      flex:1,
    justifyContent: "flex-end",
    paddingBottom: '30@s',
    paddingHorizontal: '16@ms'
  }
});
