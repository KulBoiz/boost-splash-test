import React, { useState } from "react"
import { Pressable, ScrollView } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"

interface Props{
  defaultKey: string | number
  setKey(e: any): void
  type?: 'vehicle' | 'real_estate' | 'project_house'
}
const getArray = (arr)=> {
  return arr.map(val => val?.time) ?? [];
}

const FilterProduct = React.memo((props: Props) => {
  const {homeStore, productStore} = useStores()
  const {type, setKey, defaultKey} = props

  const setKeySelect = (keys) => {
    productStore.getProducts(keys, {page: 1, limit: 20})
    setKey(keys)
  }
  const data = type === 'vehicle' ? homeStore.vehicle :
    type === 'real_estate' ? homeStore.real_estate : homeStore.projectHouse

  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
      {getArray(data).map((val,index)=> {
        const isSelect = defaultKey?.toString() === val?.toString()
        return (
          <Pressable
            key={index.toString()}
            onPress={()=> setKeySelect(val)}
            style={[styles.box, {backgroundColor: isSelect ? color.palette.orange : '#FAFAFA'}]}
          >
            <AppText
              value={`${val} tháng`}
              fontSize={ms(10)}
              color={isSelect ? color.palette.white : '#788198'}
              fontFamily={isSelect ? fontFamily.bold : fontFamily.medium}
            />
          </Pressable>
        )
      })}
    </ScrollView>
  )
});

export default FilterProduct;

const styles = ScaledSheet.create({
  container: {},
  box: {
    paddingHorizontal: '12@s',
    height: '35@s',
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: '2@s',
  }
});
