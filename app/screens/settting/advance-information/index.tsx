import React, { useEffect } from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { useStores } from "../../../models"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import ReferralCode from "./referral-code"
import Vcf from "./vcf"
import SocialForm from "./social-form"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"

interface Props {}

const AdvanceInformation = React.memo((props: Props) => {
  const { authStoreModel } = useStores()
  const user = authStoreModel?.user
  const refCode = user?.refCode
  const advancedInformation = user?.advancedInformation
  const validationSchema = Yup.object().shape({
    // fullName: Yup.string().trim().required("Vui lòng nhập"),
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

  useEffect(()=> {
    setValue('facebook', advancedInformation?.linkFb ?? ''?? '')
    setValue('zalo', advancedInformation?.linkZalo?? '')
    setValue('inkedIn', advancedInformation?.linkLinkedIn?? '')
    setValue('twitter', advancedInformation?.linkTwitter?? '')
    setValue('telegram', advancedInformation?.linkTelegram?? '')
  },[])

  return (
    <ScrollView style={styles.container}>
      <AppHeader headerText={"Thông tin nâng cao"} isBlue/>
      <View style={styles.body}>
        <ReferralCode refCode={refCode} />
        <SocialForm
          editable={true}
          control={control}
          setValue={setValue}
          errors={{ ...errors }}
          clearErrors={clearErrors}
        />
      </View>
    </ScrollView>
  )
})

export default AdvanceInformation

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  label: {
    fontSize: '12@ms',
    fontFamily: fontFamily.semiBold
  },
  body: {
    padding: '16@s'
  },
})
