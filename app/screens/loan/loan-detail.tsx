import React, { useEffect, useRef, useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import ProductInfo from "./components/product-info"
import LoanDetailItem from "./components/loan-detail-item"
import AppButton from "../../components/app-button/AppButton"
import CollapsibleRequestProfile from "./components/collapsible-request-profile"
import { ScreenNames } from "../../navigators/screen-names"
import { navigate } from "../../navigators"
import { useStores } from "../../models"
import { ALIGN_CENTER, MARGIN_TOP_16, ROW, SPACE_BETWEEN } from "../../styles/common-style"
import RegisterLoanModalize from "../product/components/register-loan-modalize"
import { Modalize } from "react-native-modalize"

interface Props{}

const LoanDetail : React.FC<Props> = observer(() => {
  const { loanStore } = useStores()
  const item = loanStore.productDetail
  const ref = useRef<Modalize>(null)

  const openModal = () => {
    ref.current.open()
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Chi tiết gói vay'} isBlue/>
      {loanStore.loading ?
        <ActivityIndicator style={styles.loading} />
        :
        item ?
        <ScrollView style={styles.body}>
          <LoanDetailItem />
          <ProductInfo item={item} />
            {item?.documentTemplateId && <CollapsibleRequestProfile  data={item?.responseDocumentTemplate}/>}
          <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, !item?.documentTemplateId && MARGIN_TOP_16]}>
            <AppButton
              title={'Tính lãi khoản vay'}
              onPress={() => {
                //
              }}
              containerStyle={[styles.btn, {backgroundColor: color.palette.blue}]}
            />
            <AppButton
              title={'Đăng ký gói vay'}
              onPress={openModal}
              containerStyle={styles.btn}
            />
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
        : <></>
      }
      <RegisterLoanModalize  modalizeRef={ref}/>

    </View>
  )
});

export default LoanDetail;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue,
    },
  body: {
    paddingHorizontal: '16@ms',
    paddingVertical: '30@s'
  },
  btn: {
    backgroundColor: color.palette.orange,
    width: '48%'
  },
  loading: {
      marginTop: '20@s'
  }
});
