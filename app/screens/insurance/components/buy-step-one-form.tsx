import React, { useState } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import FormCustomer from "./form-customer"
import HomeInsurance from "./home-insurance"
import CalculateMoney from "./calculate-money"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import FormOwner from "./form-owner"

interface Props {
  onPress(): void
  insuranceType: number
  setInsuranceType(e: number): void
  productDetail: any
  questionGroups: any
}

const BuyStepOneForm = React.memo((props: Props) => {
  const { onPress, insuranceType, setInsuranceType, productDetail } = props
  const { authStoreModel } = useStores()

  const insurance = productDetail?.packages?.[insuranceType]
  const [enable, setEnable] = useState()
  return (
    <View style={styles.container}>
      <FormOwner />
      <FormCustomer />

      <HomeInsurance productDetail={productDetail} />
      <CalculateMoney
        {...{ onPress }}
        insurance={insurance}
        enable={enable}
        productDetail={productDetail}
      />
    </View>
  )
})

export default BuyStepOneForm

const styles = ScaledSheet.create({
  container: {
    marginBottom: "24@s",
  },
  contentContainer: {
    paddingHorizontal: "16@s",
    paddingBottom: "16@s",
  },
  collapsibleContainer: {
    backgroundColor: color.background,
    borderRadius: "8@s",
    borderColor: color.palette.blue,
    // marginBottom: '8@s',
    marginHorizontal: "16@ms",
  },
  headerText: {
    fontSize: "14@ms",
    fontFamily: fontFamily.medium,
    fontWeight: "500",
  },
  headerBody: {
    padding: "16@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "12@ms",
    color: color.palette.blue,
    marginBottom: "8@s",
  },
  icon: {
    width: "16@s",
    height: "16@s",
  },
  line: {
    height: 1,
    backgroundColor: color.palette.F0F0F0,
    marginHorizontal: "16@ms",
  },
})
