import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropertyInfo from "./components/property-info"

interface Props{}

const PropertyTab = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <PropertyInfo />
    </View>
  )
});


export default PropertyTab;

const styles = StyleSheet.create({
    container: {},
});
