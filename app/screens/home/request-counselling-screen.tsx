import React, { useState } from "react"
import { View } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import FormInput from "../../components/form-input/form-input"
import AppButton from "../../components/app-button/AppButton"
import { s, ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../components/app-text/AppText"
import { presets } from "../../constants/presets"
import Checkbox from "../../components/checkbox/checkbox"
import { color } from "../../theme"

interface Props{}

const RequestCounselling = React.memo((props: Props) => {
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
      .required("Please enter your address")
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
        <AppText value={'Điều khoản sử dụng '} fontSize={s(12)} color={color.palette.blue} style={presets.bold}/>
        <AppText value={'và '} style={presets.note}/>
        <AppText value={'Chính sách bảo mật '} fontSize={s(12)} color={color.palette.blue} style={presets.bold}/>
        <AppText value={'của FINA'} style={presets.note}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <AppHeader headerTx={'header.requestLoan'} />
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
          error: errors?.phone?.message
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
      <AppButton tx={"common.sentInformation"} onPress={()=> {}}/>
    </View>
      </View>
    </View>
  )
});

export default RequestCounselling;

RequestCounselling.displayName = 'RequestCounselling'

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
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
