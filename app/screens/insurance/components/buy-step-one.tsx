import React, { useState } from 'react';
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
import Share from 'react-native-share';
import AppButton from "../../../components/app-button/AppButton"

interface Props {
  control: Control,
  errors: FieldErrors<FieldValues>
  onPress(): void
  insuranceType: number
  setInsuranceType(e: number): void
  productDetail: any
  questionGroups: any
  setValue: any
  // checkboxState?: boolean,
  // setCheckboxState?: any
}

const BuyStepOne = React.memo((props: Props) => {
  const {
    control,
    errors,
    onPress,
    insuranceType,
    setInsuranceType,
    productDetail,
    questionGroups,
    setValue,
  } = props

  const insurance = productDetail?.packages?.[insuranceType]
  const [enable, setEnable] = useState();
  const url = 'https://awesome.contents.com/';
  const title = 'Awesome Contents';
  const message = 'Please check this out.';
  const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
  const options = {
      title,
      subject: title,
      message: `${message} ${url}`,
  }
  const share = () => {
    Share.open(options).then((res)=>{
      console.log(res)} );
  }
  return (
    <View style={styles.container}>
      {/* <Benefit /> */}
      <InsurancePicker {...{ insuranceType, setInsuranceType }} productDetail={productDetail} />
      <SurveyQuestion productDetail={productDetail} questionGroups={questionGroups} checkEnabledForm={(value) => setEnable(value)} />
      {
        !enable && <>
          <InputCustomer
            {...{ control, errors, setValue }}
          />
        </>
      }

      <HomeInsurance productDetail={productDetail} />
      <AppButton title={'share'}onPress={share}/>
      <CalculateMoney {...{ onPress }} insurance={insurance} enable={enable}/>
    </View>
  )
});

export default BuyStepOne;

const styles = ScaledSheet.create({
  container: {},


});
