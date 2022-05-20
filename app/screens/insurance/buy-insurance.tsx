import React, { useRef, useState } from "react"
import { ScrollView } from "react-native"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import BuyStepOne from "./components/buy-step-one"
import RenderStep from "./components/render-step"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import BuyStepTwo from "./components/buy-step-two"
import BuyStepThree from "./components/buy-step-three"
import i18n from "i18n-js"
import { ScreenNames } from "../../navigators/screen-names"
import { StackActions, useNavigation } from "@react-navigation/native"

interface Props{}

const BuyInsurance = React.memo((props: Props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required(i18n.t('errors.requireEmail'))
      .email(i18n.t('errors.invalidEmail')),
    fullName: Yup.string().required(i18n.t('errors.requireFullName')),
    dateOfBirth: Yup.string().required(i18n.t('errors.requireDateOfBirth')),
    sex: Yup.string().required(i18n.t('errors.requireSex')),
    citizenIdentification: Yup.string().required(i18n.t('errors.requireCitizenIdentification')),
    dateRange: Yup.string().required(i18n.t('errors.requireDateRange')),
    issuedBy: Yup.string().required(i18n.t('errors.requireIssuedBy')),
    contactAddress: Yup.string().required(i18n.t('errors.requireAddress')),
    phone: Yup.string().required(i18n.t('errors.requirePhone'))

  })
  const {control, handleSubmit, formState: {errors}} = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })
  const ref = useRef(null)
  const navigation = useNavigation()
  const [currentPosition, setCurrentPosition] = useState(0)
  const [insuranceType, setInsuranceType] = useState<number>(0)

  const stepTwo = () => {
    // @ts-ignore
    ref.current.scrollTo({ x: 0, animated: true })
    setCurrentPosition(1)
  }
  const stepThree = () => {
    setCurrentPosition(2)
  }
  const buyRecords = () => {
    navigation.dispatch(StackActions.push(ScreenNames.INSURANCE_SCREEN, {id :1}))
  }

  const renderScreen = () => {
    switch (currentPosition){
      case 0: return <BuyStepOne  {...{control, errors, onPress:handleSubmit(stepTwo), insuranceType, setInsuranceType}}/>
      case 1: return <BuyStepTwo {...{stepThree}}/>
      case 2: return <BuyStepThree {...{onPress: buyRecords}}/>
    }
  }
  return (
    <ScrollView style={styles.container} ref={ref}>
      {currentPosition < 2 &&  <RenderStep {...{currentPosition}}/>}
      {renderScreen()}
    </ScrollView>
  )
});

export default BuyInsurance;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue,
    },
});
