import React, { useState } from "react"
import { View } from "react-native"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { width } from "../../constants/variable"
import FinanceFilter from "../loan/components/finance-filter"
import { INSURANCE_FILTER } from "./constants"
import InsuranceItem from "./components/insurance-item"

const data = [0,1,2,3,4]
const widthHeight = width - ms(32)

interface Props{}

const Insurance = React.memo((props: Props) => {
  const [select, setSelect] = useState<number>(0)


  return (
    <View style={styles.container}>
      <FinanceFilter currentSelected={select} setCurrentSelected={setSelect} filterData={INSURANCE_FILTER} style={styles.filter}/>
      <View style={styles.body}>
        {data.map((val, index)=> {
          return <InsuranceItem key={index.toString()}/>
        })}
      </View>

    </View>
  )
});

export default Insurance;

const styles = ScaledSheet.create({
    container: {
      borderRadius: '8@s',
      width: widthHeight,
      backgroundColor: color.background
    },
  filter:{
    borderRadius: '8@s',
    backgroundColor: color.background,
    paddingTop: '30@s'

  },
  body: {
    padding: '16@ms',

  }

});
