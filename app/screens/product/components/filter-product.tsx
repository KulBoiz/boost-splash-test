import React, { useState } from "react"
import { FlatList, Pressable, ScrollView } from "react-native"
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
  const [ref, setRef] = useState(null);
  const {homeStore, productStore} = useStores()
  const {type, setKey, defaultKey} = props

  const data = type === 'vehicle' ? homeStore.vehicle :
    type === 'real_estate' ? homeStore.real_estate : homeStore.projectHouse

  const initialIndex = getArray(data).findIndex(e=> e.toString() === defaultKey.toString())

  const setKeySelect = (keys, index) => {
    // @ts-ignore
    ref?.scrollToIndex({animated: true, index: index})
    productStore.getProducts(type, keys, {page: 1, limit: 20}, true)
    setKey(keys)
  }

  const renderItem = ({item, index}) => {
    const isSelect = defaultKey?.toString() === item?.toString()
      return(
        <Pressable
        onPress={()=> setKeySelect(item, index)}
        style={[styles.box, {borderBottomColor: isSelect ?color.primary: color.palette.iron, borderBottomWidth:isSelect ? 2 : 1 }]}
      >
        <AppText
          value={`${item} THÁNG`}
          fontSize={ms(12)}
          color={isSelect ? color.palette.blue : '#788198'}
          fontFamily={isSelect ? fontFamily.bold : fontFamily.medium}
        />
      </Pressable>
    )
  }
  return (
    // <ScrollView contentContainerStyle={styles.container} horizontal showsHorizontalScrollIndicator={false}>
    //   {getArray(data).map((val,index)=> {
    //     const isSelect = defaultKey?.toString() === val?.toString()
    //     return (
    //       <Pressable
    //         key={index.toString()}
    //         onPress={()=> setKeySelect(val)}
    //         style={[styles.box, {borderBottomColor: isSelect ?color.primary: color.palette.iron, borderBottomWidth:isSelect ? 2 : 1 }]}
    //       >
    //         <AppText
    //           value={`${val} THÁNG`}
    //           fontSize={ms(12)}
    //           color={isSelect ? color.palette.blue : '#788198'}
    //           fontFamily={isSelect ? fontFamily.bold : fontFamily.medium}
    //         />
    //       </Pressable>
    //     )
    //   })}
    // </ScrollView>
    <>
    {!!data &&
      <FlatList
        ref={(ref) => {
          // @ts-ignore
          setRef(ref);
        }}
        keyExtractor={(e, i)=> i.toString()}
        data={getArray(data)}
        renderItem={renderItem}
        horizontal
        initialScrollIndex={initialIndex}
        showsHorizontalScrollIndicator={false}
        bounces={false}
      />
    }
    </>
  )
});

export default FilterProduct;

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    paddingHorizontal: '12@s',
    paddingVertical: '8@s',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.background,
  }
});
