import React, { useCallback, useState } from "react"
import { View, FlatList } from "react-native"
import FinanceFilter from "./components/finance-filter"
import { PROFILE_MANAGEMENT_FILTER } from "./constants"
import { color } from "../../theme"
import ShortStatus from "./components/short-status"
import { ScaledSheet } from "react-native-size-matters"

interface Props{}
const RecordsManagement = React.memo((props: Props) => {
  const [select, setSelect] = useState<number>(0)
const renderItem = useCallback(({item}) => {
    return <ShortStatus />
},[])


  return (
    <View style={styles.container}>
      <FinanceFilter currentSelected={select} setCurrentSelected={setSelect} filterData={PROFILE_MANAGEMENT_FILTER}/>

      <FlatList data={[0,1,2]} renderItem={renderItem} style={styles.flatList} />
    </View>
  )
});

export default RecordsManagement;

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.palette.white,
      flex: 1,
    },
  flatList: {
      paddingHorizontal: '16@ms'
  },

});
