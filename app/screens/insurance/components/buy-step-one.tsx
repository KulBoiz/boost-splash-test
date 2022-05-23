import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import Benefit from "./benefit"
import InsurancePicker from "./insurance-picker"
import SurveyQuestion from "./survey-question"
import InputCustomer from "./input-customer"
import HomeInsurance from "./home-insurance"
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
}

const BuyStepOne = React.memo((props: Props) => {
  const { control, errors, onPress, insuranceType, setInsuranceType, productDetail, questionGroups } = props

  return (
    <View style={styles.container}>
      {/* <Benefit /> */}
      <InsurancePicker {...{ insuranceType, setInsuranceType }} productDetail={productDetail} />
      <SurveyQuestion productDetail={productDetail} questionGroups={questionGroups} />
      <InputCustomer  {...{ control, errors }} />
      <HomeInsurance productDetail={productDetail} />
      <CalculateMoney {...{ onPress }} />
    </View>
  )
});

export default BuyStepOne;

const styles = ScaledSheet.create({
  container: {},


});
