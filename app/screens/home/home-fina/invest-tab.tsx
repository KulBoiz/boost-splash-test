import React from 'react';
import { View, StyleSheet } from 'react-native';
import InvestItemContainer from "./components/invest-item-container"
import { TEST_INVEST } from "./constants"

interface Props{}

const InvestTab = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <InvestItemContainer label={'Trái phiếu'} data={TEST_INVEST} />
    </View>
  )
});

export default InvestTab;

const styles = StyleSheet.create({
    container: {},
});
