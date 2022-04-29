import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props{}

const Product = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
    
    </View>
  )
});

export default Product;

const styles = StyleSheet.create({
    container: {},
});
