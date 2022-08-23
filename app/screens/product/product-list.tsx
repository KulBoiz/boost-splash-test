import React, { useEffect, useState } from "react"
import { View, FlatList, ActivityIndicator } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import BankInfo from "../loan/components/bank-info"
import FilterProduct from "./components/filter-product"
import { useStores } from "../../models"
import { s, ScaledSheet } from "react-native-size-matters"
import BottomView from "../../components/bottom-view"
import { color } from "../../theme"
import { MARGIN_BOTTOM_24, MARGIN_TOP_16 } from "../../styles/common-style"
import { observer } from "mobx-react-lite"
import EmptyList from "../../components/empty-list"

const ProductList = observer((props: any) => {
   const header = props?.route?.params?.header
   const key = props?.route?.params?.key
   const type = props?.route?.params?.type
   const {productStore} = useStores()
   const data = productStore.products

  const [keySearch, setKeySearch] = useState(key ?? '')

  const renderItem = ({item}) => {
    return <BankInfo item={item} />
  }

  useEffect(()=> {
      productStore.getProducts(type, keySearch, { page: 1, limit: 20 }, true)
  },[])

  const loadMore = () => {
     productStore.getProducts(type, keySearch,
       { page: productStore?.pagingProduct?.page + 1, limit: 20 },
       undefined,
       true
     )
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={header} isBlue/>
      <View>
        <FilterProduct defaultKey={keySearch} type={type} setKey={setKeySearch}/>
      </View>
      {productStore?.isRefreshing ?
        <ActivityIndicator color={color.primary} style={MARGIN_TOP_16} /> :
        <>
          <FlatList
            data={data}
            keyExtractor={(e,i)=> i.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.contentStyle}
            ListFooterComponent={<BottomView height={s(150)} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
            ListEmptyComponent={EmptyList}
          />
         {productStore?.isLoadMore && <ActivityIndicator color={color.primary} style={MARGIN_BOTTOM_24}/>}
        </>
      }
    </View>
  )
});

export default ProductList;

const styles = ScaledSheet.create({
  container: {backgroundColor: color.background, flex:1},
  contentStyle: {
      marginVertical: '24@s',
      paddingHorizontal: '16@s',
  }
});
