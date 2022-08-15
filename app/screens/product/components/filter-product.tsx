import React, { useState } from "react"
import { Pressable, ScrollView } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"

interface Props{}
const FAKE_DATA = [
  {
    title: '12'
  },{
    title: '24'
  },{
    title: '36'
  },{
    title: '48'
  },

]

const FilterProduct = React.memo((props: Props) => {
  const [id, setId] = useState(0)
  return (
    <ScrollView style={styles.container}>
      {FAKE_DATA.map((val,index)=> {
        const isSelect = id === index
        return (
          <Pressable
            key={index.toString()}
            onPress={()=> setId(index)}
            style={[styles.box, {backgroundColor: isSelect ? color.palette.orange : '#FAFAFA'}]}
          >
            <AppText
              value={`${val.title} tháng`}
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
    width: '75@s',
    paddingVertical: '10@s',
    alignItems: "center",
  }
});
