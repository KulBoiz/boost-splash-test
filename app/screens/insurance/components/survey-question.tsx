import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props{}

const SurveyQuestion = React.memo((props: Props) => {
  return (
    <View style={styles.container}>

    </View>
  )
});

export default SurveyQuestion;

const styles = StyleSheet.create({
    container: {},
});
