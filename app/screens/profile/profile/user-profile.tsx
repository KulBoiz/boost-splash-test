import React, { useEffect, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import AppHeader from '../../../components/app-header/AppHeader';
import { ms, ScaledSheet } from "react-native-size-matters"
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
import _ from 'lodash'
import { useStores } from "../../../models"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import BottomView from "../../../components/bottom-view"
import { userAuth, userInfo } from "../constants"

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

  const a = userAuth(authStoreModel?.user)
  const b = userInfo(watch())
  const isUpdate = _.isEqual(a, b)

  useEffect(() => {
    if (user){
      // eslint-disable-next-line array-callback-return
      _.toPairs(user).map((e: any)=>{
        if(e[0] === 'emails' && _.get(e[1][0], 'email')){
          setValue('email', _.get(e[1][0], 'email'))
        }
        if(e[0] === 'tels' && _.get(e[1][0], 'tel')){
          setValue('tel', _.get(e[1][0], 'tel'))
        }
        if(e[0] === 'idNumber'){
          setValue('idNumber', `${e?.[1]}`)
        }
        else setValue(e[0], e[1])
      })
      if(identification){
        // eslint-disable-next-line array-callback-return
        _.toPairs(identification).map((e: any)=>{
          if(e[0] === 'idNumber'){
            return false
          }
          setValue(e[0], e[1])
        })
      }
    }
  },[])

  const updateUserInfo = async (data)=> {
    const body = {
      fullName: data.fullName,
      idNumber: data.idNumber,
      gender: data.gender,
      tels: [{ tel: data.tel}],
      emails: [{ email: data.email }],
      birthday: data?.birthday,
      identification: {
        issuedOn: data.issuedOn,
        placeOfIssue: data.placeOfIssue,
      }
    }
    authStoreModel.updateInfoUser(body).then(() => {
      setIsEdit(false)
      authStoreModel.getFullInfoUser(authStoreModel?.userId)
    })
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Thông tin tài khoản'} isBlue/>
      <KeyboardAwareScrollView style={styles.body}>
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
        <BottomView height={ms(100)} />
      </KeyboardAwareScrollView>
      {isEdit &&
        <View style={styles.btnContainer}>
          <AppButton title={'Cập nhật'} onPress={handleSubmit(updateUserInfo)} disable={isUpdate}/>
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
