import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
// import InsurancePicker from "./insurance-picker"
import SurveyQuestion from "./survey-question"
// import InputCustomer from "./input-customer"
// import HomeInsurance from "./home-insurance"
import CalculateMoney from "./calculate-money"
import { Control } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"

interface Props {
  control: Control,
  errors: FieldErrors<FieldValues>
  onPress(): void
  insuranceType: number
  setInsuranceType(e: number): void
  productDetail: any
  questionGroups: any
  setValue: any
  getValues: any
}

const BuyStepOneQuestion = React.memo((props: Props) => {
  const {
    control,
    errors,
    onPress,
    insuranceType,
    setInsuranceType,
    productDetail,
    questionGroups,
    setValue,
    getValues
  } = props

  const insurance = productDetail?.packages?.[insuranceType]
  const [enable, setEnable] = useState();
  return (
    <View style={styles.container}>
      <SurveyQuestion productDetail={productDetail} questionGroups={questionGroups} checkEnabledForm={(value) => setEnable(value)} />
      <CalculateMoney {...{ onPress }} insurance={insurance} enable={enable} productDetail={productDetail} />
    </View>
  )
});

export default BuyStepOneQuestion;

const styles = ScaledSheet.create({
  container: {},


});
