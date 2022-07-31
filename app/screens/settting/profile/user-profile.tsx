import React, { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
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
import { ALIGN_CENTER, MARGIN_TOP_8, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import AppButton from "../../../components/app-button/AppButton"
import { EditSvg } from "../../../assets/svgs"
import isEqual from 'lodash'
import { useStores } from "../../../models"

interface Props{}

const UserProfile = React.memo((props: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const {authStoreModel} = useStores()
  const user = authStoreModel?.user
  const identification = authStoreModel?.user?.identification
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required("Vui lòng nhập"),
  })
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    watch
  } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  useEffect(() => {
    Object.entries(user).map((e: any)=>{
      if(e[0] === 'emails'){
        setValue('email', e[1][0].email)
      }
      if(e[0] === 'tels'){
        setValue('tel', e[1][0].tel)
      }
      if(e[0] === 'idNumber'){
        setValue('idNumber', e[1].toString())
      }
      else setValue(e[0], e[1])
    })
    // eslint-disable-next-line array-callback-return
    Object.entries(identification).map((e: any)=>{
      setValue(e[0], e[1])
    })
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Thông tin tài khoản'} isBlue/>
      <View style={styles.body}>
        <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER]}>
          <AppText value={'Thông tin cá nhân'} style={styles.label}/>
          {!isEdit &&
            <TouchableOpacity onPress={()=> setIsEdit(!isEdit)}>
              <EditSvg />
            </TouchableOpacity>
          }
        </View>
        <UserForm {...{control, setValue, clearErrors, editable: isEdit}} errors={{ ...errors }} />
        <AppText value={'CMND/ CCCD/ Hộ chiếu'} style={[styles.label, MARGIN_TOP_8]}/>
        <IdentifyForm {...{control, setValue, clearErrors, editable: isEdit}} errors={{ ...errors }} />
      </View>
      {isEdit &&
        <View style={styles.btnContainer}>
          <AppButton title={'Cập nhật'} onPress={()=> {}}/>
        </View>
      }

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
