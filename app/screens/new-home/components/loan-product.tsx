import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LOAN_PRODUCT } from "../constants"
import IconItem from "./icon-item"

interface Props{}

const LoanProduct = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      {LOAN_PRODUCT.map((e, i)=> {
        return <IconItem icon={e.image} title={e.title} key={i.toString()}/>
      })}
    </View>
  )
});

export default LoanProduct;

const styles = StyleSheet.create({
    container: {},
});
