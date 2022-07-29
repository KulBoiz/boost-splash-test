import React from 'react';
import { View } from 'react-native';
import AppHeader from '../../../components/app-header/AppHeader';
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import UserForm from "./user-form"
import { color } from "../../../theme"
import IdentifyForm from "./identify-form"
import { MARGIN_TOP_8 } from "../../../styles/common-style"
import AppButton from "../../../components/app-button/AppButton"

interface Props{}

const UserProfile = React.memo((props: Props) => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required("Vui lòng nhập"),
  })
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Thông tin tài khoản'} isBlue/>
      <View style={styles.body}>
        <AppText value={'Thông tin cá nhân'} style={styles.label}/>
        <UserForm {...{control, setValue, clearErrors}} errors={{ ...errors }} />
        <AppText value={'CMND/ CCCD/ Hộ chiếu'} style={[styles.label, MARGIN_TOP_8]}/>
        <IdentifyForm {...{control, setValue, clearErrors}} errors={{ ...errors }} />
      </View>
      <View style={styles.btnContainer}>
        <AppButton title={'Cập nhật'} onPress={()=> {}}/>
      </View>
    </View>
  )
});

export default UserProfile;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex:1
  },
  body: {
    paddingHorizontal: '16@s',
    paddingVertical: '24@s'
  },
  label: {
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold
  },
  btnContainer:{
    paddingHorizontal: '16@s',
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: '30@s'
  }
});
