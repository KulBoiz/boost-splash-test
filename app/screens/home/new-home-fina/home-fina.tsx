import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import TabSelect from "../components/tab-select"

interface Props{}

const HomeFina = React.memo((props: Props) => {
  const [index, setIndex] = useState(0)
  return (
    <View style={styles.container}>
      <TabSelect {...{index, setIndex}} />
    </View>
  )
});

export default HomeFina;

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingTop: 200
    },
});
