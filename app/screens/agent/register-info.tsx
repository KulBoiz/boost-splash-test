import React, { useState } from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import RenderStepAgent from "./components/render-step"
import AgentForm from "./components/agent-form"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { CONTAINER_PADDING, FONT_REGULAR_12 } from "../../styles/common-style"
import { color } from "../../theme"
import AppButton from "../../components/app-button/AppButton"
import { ScaledSheet } from "react-native-size-matters"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { AppText } from "../../components/app-text/AppText"
import CustomCheckbox from "../../components/checkbox/custom-checkbox"
import { useStores } from "../../models"

interface Props{}

const RegisterInfo = React.memo((props: Props) => {
  const {agentStore} = useStores()
  const [gender,setGender] = useState<'Nam'|'Nữ'|'Khác'>('Nam')
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(i18n.t('errors.requireEmail'))
      .email(i18n.t('errors.invalidEmail')),
    address: Yup.string().required(i18n.t('errors.requireAddress')),
    phone: Yup.string().required(i18n.t('errors.requirePhone')),
    bankName: Yup.string().required('Chọn địa ngân hàng'),
    bankNumber: Yup.string().required('Nhập số tài khoản ngân hàng'),
    province: Yup.string().required('Chọn tỉnh / thành phố'),
    district: Yup.string().required('Chọn quận / huyện'),
    commune: Yup.string().required('Chọn phường xã'),
  })
  const {control, handleSubmit, formState: { errors }, setValue, watch} = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })
  const nextStep = (data) => {
    agentStore.userInfo(gender, data.email, data.phone, data.bankNumber, data.bankName,
      data.bankBranch, data.province, data.district, data.commune, data.address)
    navigate(ScreenNames.PHOTO_TUTORIAL)
  }
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Đăng ký thông tin'} isBlue/>
      <RenderStepAgent currentPosition={0} />
      <KeyboardAwareScrollView style={[CONTAINER_PADDING, {flex:1}]}>
        <View style={styles.wrapCheckbox}>
          <AppText value={'Giới tính'} style={FONT_REGULAR_12} color={color.palette.deepGray}/>
          <CustomCheckbox onPress={()=> setGender('Nam')} text={'Nam'} isChecked={gender === 'Nam'}/>
          <CustomCheckbox onPress={()=> setGender('Nữ')} text={'Nữ'} isChecked={gender === 'Nữ'}/>
          <CustomCheckbox onPress={()=> setGender('Khác')} text={'Khác'} isChecked={gender === 'Khác'}/>
        </View>
        <AgentForm {...{control, errors, setValue, watch}} />
      </KeyboardAwareScrollView>
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
  wrapCheckbox:{
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: 'row',
    width: '90%',
    marginTop: '26@s',
    marginBottom: '10@s'
  },
  wrapBtn:{
    justifyContent: "flex-end",
    paddingBottom: '30@s',
    paddingTop: '20@s',
    paddingHorizontal: '16@ms'
  }
});
