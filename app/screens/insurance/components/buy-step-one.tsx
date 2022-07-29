import React, { useState } from 'react';
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { Control } from "react-hook-form/dist/types/form";
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import CalculateMoney from "./calculate-money";
import InsurancePicker from "./insurance-picker";

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

const BuyStepOnePackage = React.memo((props: Props) => {
  const {
    onPress,
    insuranceType,
    setInsuranceType,
    productDetail,
  } = props

  const insurance = productDetail?.packages?.[insuranceType]
  const [enable, setEnable] = useState();
  return (
    <View style={styles.container}>
      <InsurancePicker {...{ insuranceType, setInsuranceType }} productDetail={productDetail} />
      <CalculateMoney {...{ onPress }} insurance={insurance} enable={enable} productDetail={productDetail} />
    </View>
  )
});

export default BuyStepOnePackage;

const styles = ScaledSheet.create({
  container: {},
});
