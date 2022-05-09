import React, { useState } from "react"
import { Alert, Keyboard, Pressable, View } from "react-native"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import FormInput from "../../../components/form-input/form-input"
import AppButton from "../../../components/app-button/AppButton"
import { s, ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../components/app-text/AppText"
import { presets } from "../../../constants/presets"
import Checkbox from "../../../components/checkbox/checkbox"
import { color } from "../../../theme"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props{
  nextStep(): void
}

const IntroduceStepOne = observer(({ nextStep }: Props) => {
  const {loanStore, authStoreModel} = useStores()
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .trim()
      .required("Please enter your full name"),
    email: Yup.string()
      .trim()
      .required("Please enter your email")
      .email("This is not a valid email"),
    phone: Yup.string()
      .trim()
      .required("Please enter your phone"),
    address: Yup.string()
      .trim()
  })
  const {control, handleSubmit, formState: {errors}} = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  const [checkboxState, setCheckboxState] = useState<boolean>(false)
  const _renderText = ()=> {
    return (
      <View style={styles.textContainer}>
        <AppText value={'Tôi đã đọc và đồng ý với các '} style={presets.note}/>
        <AppText value={'Điều khoản sử dụng '} onPress={()=> navigate(ScreenNames.TERM_AND_POLICY)} fontSize={s(12)} color={color.palette.blue} style={presets.bold}/>
        <AppText value={'và '} style={presets.note}/>
        <AppText value={'Chính sách bảo mật '} onPress={()=> navigate(ScreenNames.TERM_AND_POLICY)} fontSize={s(12)} color={color.palette.blue} style={presets.bold}/>
        <AppText value={'của FINA'} style={presets.note}/>
      </View>
    )
  }

  const sendRequest = async (data) => {
    if (authStoreModel.token){
      const send = await  loanStore.requestCounselling(data.fullName, data.email, data.phone, data.address)
      if (send.kind === 'ok'){
        nextStep()
      }
      else Alert.alert('Something went wrong')
    }
    else{
      const send = await  loanStore.createRequestCounselling( data.email, data.fullName, data.phone, data.address)
      if (send.kind === 'ok'){
        nextStep()
      }
      else Alert.alert('Something went wrong')
    }
  }
  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <FastImage source={images.banner} style={styles.banner}/>
      <View style={styles.body}>
        <FormInput
          {...{
            name: 'fullName',
            placeholderTx: 'placeholder.fullName',
            autoCapitalize: 'none',
            control,
            error: errors?.fullName?.message
          }}
        />
        <FormInput
          {...{
            name: 'email',
            placeholderTx: 'placeholder.email',
            autoCapitalize: 'none',
            error: errors?.email?.message,
            control,
          }}
        />
        <FormInput
          {...{
            name: 'phone',
            placeholderTx: 'placeholder.phone',
            autoCapitalize: 'none',
            control,
            error: errors?.phone?.message,
            keyboardType: 'number-pad'
          }}
        />
        <FormInput
          {...{
            name: 'address',
            placeholderTx: 'placeholder.address',
            autoCapitalize: 'none',
            error: errors?.address?.message,
            control,
          }}
        />
        <AppText tx={"guide.enterKeyword"} style={presets.note}/>
        <Checkbox style={styles.checkbox} checkboxState={checkboxState} setCheckboxState={setCheckboxState} textComponent={_renderText()}/>
        <View style={styles.wrapBtn}>
          <AppButton tx={"common.sentInformation"} onPress={handleSubmit(sendRequest)}/>
        </View>
      </View>
    </Pressable>
  )
});

export default IntroduceStepOne;

IntroduceStepOne.displayName = 'IntroduceStepOne'

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  banner: {
    borderRadius: '8@s',
    width: '90%',
    height: '95@s',
    marginVertical: '16@s',
    alignSelf: "center"
  },
  body:{
    flex: 1,
    paddingHorizontal: '16@s'
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '5@s'
  },
  checkbox: {
    marginTop: '16@s'
  },
  wrapBtn: {
    justifyContent: 'flex-end',
    flex:1,
    paddingBottom: '30@s'
  }
});
