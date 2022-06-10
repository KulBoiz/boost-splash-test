import React from 'react';
import { View, StyleSheet } from 'react-native';
import BankItem from "./components/bank-item"
import Header from "./components/header"
import LoanProduct from "./components/loan-product"

interface Props{}

const NewHome = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <Header />
      <LoanProduct />
      <BankItem item={{}} />
    </View>
  )
});

export default NewHome;

const styles = StyleSheet.create({
    container: {},
});
