import React from 'react';
import { View, StyleSheet, FlatList } from "react-native"
import InsuranceItem from "./insurance-item"

interface Props{}

const InsuranceList = React.memo((props: Props) => {

  const renderItem = React.useCallback(({item})=> {
   return <InsuranceItem  item={item}/>
  },[])

  return (
    <View style={styles.container}>
      <FlatList data={[]} renderItem={renderItem} />
    </View>
  )
});

export default InsuranceList;

const styles = StyleSheet.create({
    container: {},
});
