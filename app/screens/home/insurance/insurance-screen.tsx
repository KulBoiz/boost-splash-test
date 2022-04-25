import React, { FC } from "react"
import { View, StyleSheet } from 'react-native';
import { observer } from "mobx-react-lite"

interface Props{}

const InsuranceScreen: FC<Props> = observer(() => {
  return (
    <View style={styles.container}>

    </View>
  )
})

export default InsuranceScreen;

const styles = StyleSheet.create({
    container: {},
});
