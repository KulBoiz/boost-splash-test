import React from 'react';
import { View, FlatList } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import BankInfo from "../loan/components/bank-info"
import FilterProduct from "./components/filter-product"
import { useStores } from "../../models"
import { ScaledSheet } from "react-native-size-matters"
import BottomView from "../../components/bottom-view"

const ProductList = React.memo((props: any) => {
   const header = props?.route?.params?.header
   const key = props?.route?.params?.key
   const {productStore} = useStores()
   const data = productStore.products

  const renderItem = React.useCallback(({item}) => {
    return <BankInfo item={item} />
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={header} isBlue/>
      <FilterProduct defaultId={Number(key)}/>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentStyle}
        ListFooterComponent={<BottomView height={50} />}
      />
    </View>
  )
});

export default ProductList;

const styles = ScaledSheet.create({
    container: {
      flex:1
    },
  contentStyle: {
      marginVertical: '24@s',
      paddingHorizontal: '16@s',
  }
});
