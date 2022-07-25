import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import AppHeader from "../../../components/app-header/AppHeader"
import InsuranceInfo from "./insurance-info"
import BuyerInfo from "./buyer-info"
import BeneficiaryInfo from "./beneficiary-info"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { useStores } from "../../../models"


interface Props{}

const InsuranceClaimDetail = React.memo((props: Props) => {
  const {params: {index}} = useRoute<RouteProp<NavigatorParamList, ScreenNames.INSURANCE_CLAIM_DETAIL>>()
  const {insuranceStore} = useStores()
  const item = insuranceStore?.listClaim[index]
  const header = item?.product?.name ?? ''

  return (
    <View style={styles.container}>
      <AppHeader headerText={header} isBlue/>
      <View style={styles.body}>
        <InsuranceInfo item={item}/>
        <BuyerInfo item={item}/>
        <BeneficiaryInfo item={item}/>
      </View>
    </View>
  )
});

export default InsuranceClaimDetail;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  body: {
    padding: '16@s',
  },
  wrapButton: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
