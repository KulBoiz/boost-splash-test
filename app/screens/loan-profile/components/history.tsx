import React, { useCallback } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import HistoryItem from "./history-item"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"

interface Props{}

const History = React.memo((props: Props) => {
  const renderItem = useCallback(({item})=> {
    return <HistoryItem />
  },[])
  return (
    <View style={styles.container}>
      <FlatList data={[0]} renderItem={renderItem} style={styles.flatList}/>
    </View>
  )
});

export default History;

const styles = ScaledSheet.create({
    container: {
      paddingHorizontal: '16@ms'
    },
  flatList: {
      padding: '16@s',
    backgroundColor: color.background,
    borderRadius: '8@s'
  }
});
