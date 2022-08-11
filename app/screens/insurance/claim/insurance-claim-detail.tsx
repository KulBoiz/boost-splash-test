import React, { useEffect, useState } from "react"
import { ActivityIndicator, View, ScrollView } from "react-native"
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
import { MARGIN_TOP_16 } from "../../../styles/common-style"
import CollapsibleClaimUpload from "../components/collapsible-claim-upload"
import Note from "../../../components/note/note"


interface Props { }

const InsuranceClaimDetail = React.memo((props: Props) => {
  const { params: { index } } = useRoute<RouteProp<NavigatorParamList, ScreenNames.INSURANCE_CLAIM_DETAIL>>()
  const { insuranceStore, dealDetailStoreModel } = useStores()
  const [loading, setLoading] = useState<boolean>(true)
  const [files, setFiles] = useState([])
  const item = insuranceStore?.listClaim[index]
  const header = item?.product?.name ?? ''
  const deal = dealDetailStoreModel.deal

  useEffect(() => {
    dealDetailStoreModel.getDeal(item?.metadata?.dealId).then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={header} isBlue />
      {
        loading ?
          <ActivityIndicator color={color.palette.blue} style={MARGIN_TOP_16} />
          :
          <ScrollView style={styles.body} contentContainerStyle={{ paddingBottom: 30 }}>
            <InsuranceInfo {...{ item, deal }} />
            <BuyerInfo {...{ item, deal }} />
            <BeneficiaryInfo {...{ item, deal }} />
            <CollapsibleClaimUpload data={item?.images ?? []} canEdit={false} />
            <View style={MARGIN_TOP_16}>
              <Note id={item?.id} />
            </View>
          </ScrollView>
      }
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
