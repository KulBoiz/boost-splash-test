import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppHeader from "../../../../components/app-header/AppHeader"
import ItemDescriptionFund from "../../components/item-description-fund"

interface Props{}

const ConvertFund = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Đặt lệnh chuyển đổi'} isBlue />
      <ItemDescriptionFund />

    </View>
  )
});

export default ConvertFund;

const styles = StyleSheet.create({
    container: {},
});
