import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { StackActions, useNavigation } from "@react-navigation/native"
import i18n from "i18n-js"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { ScrollView } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import WebView from "react-native-webview"
import * as Yup from "yup"
import { useStores } from '../../models/root-store/root-store-context'
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"
import BuyStepOne from "./components/buy-step-one"
import BuyStepThree from "./components/buy-step-three"
import BuyStepTwo from "./components/buy-step-two"
import RenderStep from "./components/render-step"

interface Props { }

const BuyInsurance = observer((props: Props) => {
  // @ts-ignore
  const { productStore } = useStores()
  const { productDetail, questionGroups } = productStore
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
  const { control, handleSubmit, getValues, formState: { errors } } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })

  const validationSchemaCustomer = Yup.object().shape({
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
  const { control: controlCustomer, handleSubmit: handleSubmitCustomer, getValues: getValuesCustomer, formState: { errors: errorsCustomer } } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchemaCustomer),
    reValidateMode: "onChange" || "onTouched",
  })

  const ref = useRef(null)
  const navigation = useNavigation()
  const [currentPosition, setCurrentPosition] = useState(0)
  const [insuranceType, setInsuranceType] = useState<number>(0)

  const stepTwo = () => {
    // @ts-ignore 
    ref.current.scrollTo({ x: 0, animated: true })
    // setCurrentPosition(1)

    handleSubmitCustomer((data) => {
      // todo

      console.log(data);
      
    })
  }

  const stepThree = () => {
    setCurrentPosition(2)
  }

  const buyRecords = () => {
    navigation.dispatch(StackActions.push(ScreenNames.INSURANCE_SCREEN, { id: 1 }))
  }

  if (productDetail && productDetail?.source) {
    return (<WebView
      source={{ uri: productDetail?.info?.productUrlOriginal }}
    />)
  }

  const renderScreen = () => {
    switch (currentPosition) {
      case 0: return <BuyStepOne  {...{
        control,
        controlCustomer,
        errors,
        errorsCustomer,
        // onPress: handleSubmit(stepTwo),
        onPress: handleSubmitCustomer(stepTwo),
        insuranceType,
        setInsuranceType,
        productDetail,
        questionGroups
      }} />
      case 1: return <BuyStepTwo {...{
        stepThree,
        productDetail,
        questionGroups,
        insuranceType
      }}
        getValues={getValues()}
        getValuesCustomer={getValuesCustomer()} />
      case 2: return <BuyStepThree {...{ onPress: buyRecords }} />
    }
  }

  return (
    <ScrollView style={styles.container} ref={ref}>
      {currentPosition < 2 && <RenderStep {...{ currentPosition }} />}
      {!!productDetail?.id && renderScreen()}
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
