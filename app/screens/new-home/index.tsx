import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header } from "../../components"

interface Props{}

const NewHome = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  )
});

export default NewHome;

const styles = StyleSheet.create({
    container: {},
});
