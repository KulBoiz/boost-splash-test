import React, { useState } from "react"
import { View } from 'react-native';
import { color } from "../../theme"
import FinanceFilter from "./components/finance-filter"
import BankInfo from "./components/bank-info"
import { item } from "../home/constants"
import { ScaledSheet } from "react-native-size-matters"
import { CONTAINER_PADDING } from "../../styles/common-style"
import { FINANCE_FILTER } from "./constants"

interface Props{}
const data = [0,1,2]
const Product = React.memo((props: Props) => {
  const [select, setSelect] = useState<number>(0)
  return (
    <View style={styles.container}>
      <FinanceFilter currentSelected={select} setCurrentSelected={setSelect} filterData={FINANCE_FILTER}/>
      <View style={CONTAINER_PADDING}>
        {data.map(((_, index)=> (
          <BankInfo key={index.toString()} item={item} />
        )))}
      </View>
    </View>
  )
});

export default Product;

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.palette.white,
      flex: 1,
    },
});
