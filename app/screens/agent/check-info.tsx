import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
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
import { CONTAINER_PADDING } from "../../styles/common-style"
import AppButton from "../../components/app-button/AppButton"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface Props{}

const CheckInfo = React.memo( (props: Props) => {
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

  const frontImage = async () => {
    return await AsyncStorage.getItem('frontImage') ?? ''
  }

  const backImage = async () => {
    return await AsyncStorage.getItem('backImage') ?? ''
  }
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Kiểm tra thông tin CMND / CCCD / HC'} isBlue/>
      <KeyboardAwareScrollView>
        <RenderStepAgent currentPosition={2} />
        <View style={CONTAINER_PADDING}>
          <View style={styles.imageContainer}>
            <FastImage source={{uri: frontImage}} style={styles.image}/>
            <FastImage source={{uri: backImage}} style={styles.image}/>
          </View>
          <IdForm control={control} errors={errors} setValue={setValue} />
          <AgentCheckbox checkboxState={checkboxState} setCheckboxState={setCheckboxState} />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.wrapBtn}>
        <AppButton tx={'common.continue'} disable={!checkboxState} onPress={()=> navigate(ScreenNames.SIGN_CONTRACT)}/>
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
    flex:1,
    paddingHorizontal: '16@ms',
    justifyContent: "flex-end",
    paddingBottom: '30@s'
  }
});
