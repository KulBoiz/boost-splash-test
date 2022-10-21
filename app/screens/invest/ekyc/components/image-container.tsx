import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props{}

const ImageContainer = React.memo((props: Props) => {
  return (
    <View style={styles.container}>

    </View>
  )
});

export default ImageContainer;

const styles = StyleSheet.create({
    container: {},
});
