import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { StackActions, useNavigation } from "@react-navigation/native"
import i18n from "i18n-js"
import { observer } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { ScrollView, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { ScaledSheet } from "react-native-size-matters"
import WebView from "react-native-webview"
import * as Yup from "yup"
import ShareComponent from "../../components/share"
import { useStores } from "../../models/root-store/root-store-context"
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"
import BuyStepOnePackage from "./components/buy-step-one"
import BuyStepOneForm from "./components/buy-step-one-form"
import BuyStepOneQuestion from "./components/buy-step-one-question"
// import BuyStepOne from "./components/buy-step-one"
import BuyStepThree from "./components/buy-step-three"
import BuyStepTwo from "./components/buy-step-two"

interface Props {}

const BuyInsurance = observer((props: Props) => {
  // @ts-ignore
  const { productStore } = useStores()
  const { productDetail, questionGroups } = productStore
  const validationSchema = Yup.object().shape({
    // email: Yup.string()
    //   .trim()
    //   .required(i18n.t('errors.requireEmail'))
    //   .email(i18n.t('errors.invalidEmail')),
    // fullName: Yup.string().required(i18n.t('errors.requireFullName')),
    // dateOfBirth: Yup.date().required(i18n.t('errors.requireDateOfBirth')).max(new Date(), "Ngày sinh không phù hợp"),
    // sex: Yup.string().required(i18n.t('errors.requireSex')),
    // citizenIdentification: Yup.string().required(i18n.t('errors.requireCitizenIdentification')),
    // dateRange: Yup.date().required(i18n.t('errors.requireDateRange')).max(new Date(), "Ngày cấp không phù hợp"),
    // issuedBy: Yup.string().required(i18n.t('errors.requireIssuedBy')),
    // contactAddress: Yup.string().required(i18n.t('errors.requireAddress')),
    // phone: Yup.string().required(i18n.t('errors.requirePhone')),
    // //
    emailCustomer: Yup.string()
      .trim()
      .required(i18n.t("errors.requireEmail"))
      .email(i18n.t("errors.invalidEmail")),
    fullNameCustomer: Yup.string().required(i18n.t("errors.requireFullName")),
    dateOfBirthCustomer: Yup.date()
      .required(i18n.t("errors.requireDateOfBirth"))
      .max(new Date(), "Ngày sinh không phù hợp"),
    sexCustomer: Yup.string().required(i18n.t("errors.requireSex")),
    citizenIdentificationCustomer: Yup.string().required(
      i18n.t("errors.requireCitizenIdentification"),
    ),
    dateRangeCustomer: Yup.date()
      .required(i18n.t("errors.requireDateRange"))
      .max(new Date(), "Ngày cấp không phù hợp"),
    issuedByCustomer: Yup.string().required(i18n.t("errors.requireIssuedBy")),
    contactAddressCustomer: Yup.string().required(i18n.t("errors.requireAddress")),
    phoneCustomer: Yup.string().required(i18n.t("errors.requirePhone")),
  })
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })

  const ref = useRef(null)
  const navigation = useNavigation()
  const [currentPosition, setCurrentPosition] = useState(0.2)
  const [insuranceType, setInsuranceType] = useState(0)
  // const [checkboxState, setCheckboxState] = useState<boolean>(true)
  const [transaction, setTransaction] = useState()

  const stepOneQuestion = () => {
    // // @ts-ignore
    // ref.current.scrollTo({ x: 0, animated: true })
    setCurrentPosition(0.1)
  }

  const stepOneForm = () => {
    // @ts-ignore
    // ref.current.scrollTo({ x: 0, animated: true })
    setCurrentPosition(0.2)
  }

  const stepTwo = () => {
    // @ts-ignore
    // ref.current.scrollTo({ x: 0, animated: true })
    setCurrentPosition(1)
  }

  const stepThree = (transaction) => {
    setTransaction(transaction)

    setCurrentPosition(2)
  }

  const buyRecords = () => {
    navigation.dispatch(StackActions.push(ScreenNames.INSURANCE_SCREEN, { id: 1 }))
  }

  if (productDetail && productDetail?.source) {
    return (
      //   <WebView
      //   source={{ uri: productDetail?.info?.productUrlOriginal }}
      // />
      <View style={{ position: "relative" }}>
        <View style={{ height: "100%" }}>
          <WebView source={{ uri: productDetail?.info?.productUrlOriginal }} />
        </View>
        <ShareComponent url={productDetail?.info?.productUrlOriginal} isIcon={true} />
      </View>
    )
  }

  const renderScreen = () => {
    switch (currentPosition) {
      case 0:
        return (
          <BuyStepOnePackage
            {...{
              control,
              errors,
              onPress: stepOneQuestion,
              insuranceType,
              setInsuranceType,
              productDetail,
              questionGroups,
              setValue,
            }}
            getValues={getValues()}
          />
        )
      case 0.1:
        return (
          <BuyStepOneQuestion
            {...{
              control,
              errors,
              onPress: stepOneForm,
              insuranceType,
              setInsuranceType,
              productDetail,
              questionGroups,
              setValue,
            }}
            getValues={getValues()}
          />
        )
      case 0.2:
        return (
          <BuyStepOneForm
            {...{
              onPress: handleSubmit(stepTwo),
              insuranceType,
              setInsuranceType,
              productDetail,
              questionGroups,
            }}
          />
        )

      case 1:
        return (
          <BuyStepTwo
            {...{
              stepThree,
              productDetail,
              questionGroups,
              insuranceType,
            }}
            getValues={getValues()}
          />
        )
      case 2:
        return (
          <BuyStepThree
            {...{ onPress: buyRecords, productDetail, insuranceType, transaction }}
            getValues={getValues()}
          />
        )
    }
  }

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" style={styles.container} ref={ref}>
      {!!productDetail?.id && renderScreen()}
    </KeyboardAwareScrollView>
  )
})

export default BuyInsurance

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },
})
