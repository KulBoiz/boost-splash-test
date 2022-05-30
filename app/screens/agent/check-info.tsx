import React, { useState } from "react"
import { View, Image } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import RenderStepAgent from "./components/render-step"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import IdForm from "./components/id-form"
import AgentCheckbox from "./components/AgentCheckbox"
import { CONTAINER_PADDING} from "../../styles/common-style"
import AppButton from "../../components/app-button/AppButton"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { RouteProp, useRoute } from "@react-navigation/native"
import { AgentStackParamList } from "../../navigators/agent-stack"

interface Props{}

const CheckInfo = React.memo( (props: Props) => {
  const route = useRoute<RouteProp<AgentStackParamList, ScreenNames.CHECK_INFO>>()
  const frontImage = route?.params?.frontImage ?? ''
  const backImage = route?.params?.backImage ?? ''
  const [checkboxState,setCheckboxState] = useState(false)
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required(i18n.t('errors.requireFullName')),
    citizenIdentification: Yup.string().required(i18n.t('errors.requireCitizenIdentification')),
    dateRange: Yup.string().required(i18n.t('errors.requireDateRange')),
    issuedBy: Yup.string().required(i18n.t('errors.requireIssuedBy')),

  })
  const {control, handleSubmit, formState: {errors}, setValue, getValues} = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })
  const submit = () => {
    navigate(ScreenNames.SIGN_CONTRACT)
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Kiểm tra thông tin CMND / CCCD / HC'} isBlue/>
      <KeyboardAwareScrollView>
        <RenderStepAgent currentPosition={2} />
        <View style={CONTAINER_PADDING}>
          <View style={styles.imageContainer}>
            <Image source={{uri: frontImage}} style={styles.image}/>
            <Image source={{uri: backImage}} style={styles.image}/>
          </View>

          <IdForm control={control} errors={errors} setValue={setValue} />
          <AgentCheckbox checkboxState={checkboxState} setCheckboxState={setCheckboxState} />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.wrapBtn}>
        <AppButton tx={'common.continue'} disable={!checkboxState} onPress={handleSubmit(submit)} />
      </View>
    </View>
  )
});

export default CheckInfo;

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: color.background,
  },
  imageContainer: {
    marginTop: '15@s',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: '40@ms'
  },

  image: {
    borderRadius: '8@s',
    width:'125@ms',
    height: '80@ms',
    backgroundColor: color.palette.lighterGray
  },
  wrapBtn: {
    marginTop: '20@s',
    paddingHorizontal: '16@ms',
    justifyContent: "flex-end",
    paddingBottom: '30@s'
  }
});
