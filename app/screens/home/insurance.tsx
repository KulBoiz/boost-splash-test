import React, { useState } from "react"
import { View } from "react-native"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { width } from "../../constants/variable"
import MenuFilter from "../loan/components/finance-filter"
import { INSURANCE_FILTER } from "./constants"
import InsuranceItem from "./components/insurance-item"
import { useStores } from "../../models"
import { images } from "../../assets/images"

const widthHeight = width - ms(32)

interface Props { }

const Insurance = React.memo((props: Props) => {
  const [select, setSelect] = useState<number>(0)
  // @ts-ignore
  const { menuFilterStore, productStore } = useStores();
  const { categories } = menuFilterStore;
  const { records } = productStore;

  return (
    <View style={styles.container}>
      <MenuFilter
        currentSelected={select}
        setCurrentSelected={setSelect}
        filterData={[{
          icon: images.cube,
          title: 'tất cả'
        }].concat(categories)}
        style={styles.filter} />
      <View style={styles.body}>
        {records.map((val, index) => {
          return <InsuranceItem key={index.toString()} item={val} />
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
  filter: {
    borderRadius: '8@s',
    backgroundColor: color.background,
    paddingTop: '30@s'

  },
  body: {
    padding: '16@ms',

  }

});
