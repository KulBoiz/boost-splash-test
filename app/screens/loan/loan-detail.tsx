import React, { useEffect, useState } from "react"
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

interface Props{}

const LoanDetail : React.FC<Props> = observer(() => {
  const { loanStore } = useStores()
  const [loading, setLoading] = useState<boolean>(true)
  const item = loanStore.productDetail

  useEffect(()=> {
    setTimeout(()=>setLoading(false), 1000)
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Chi Tiết Gói Vay'} isBlue/>
      {loading ?
        <ActivityIndicator style={styles.loading} />
        :
        <ScrollView style={styles.body}>
          <LoanDetailItem item={item} />
          <ProductInfo item={item} />
          <CollapsibleRequestProfile />
          <AppButton tx={'auth.registerNow'} onPress={() => navigate(ScreenNames.REGISTER_LOAN)}
                     containerStyle={styles.btn} />
          <View style={{ height: 100 }} />
        </ScrollView>
      }
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
    alignSelf: "center"
  },
  loading: {
      marginTop: '20@s'
  }
});
