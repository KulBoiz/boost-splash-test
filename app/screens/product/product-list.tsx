import React from 'react';
import { View, StyleSheet, FlatList } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import BankInfo from "../loan/components/bank-info"

interface Props{}

const ProductList = React.memo((props: Props) => {

  const renderItem = React.useCallback(({item}) => {
    return <BankInfo item={item} />
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={''} isBlue/>

      <FlatList data={[]} renderItem={renderItem} />
    </View>
  )
});

export default ProductList;

const styles = StyleSheet.create({
    container: {},
});
