import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import AppButton from "../../components/app-button/AppButton"

interface Props{}

const RegisterAgent = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Đăng ký làm cộng tác viên'} isBlue/>
      <AppButton title={'Tiếp tục'} onPress={()=> {}}/>
    </View>
  )
});

export default RegisterAgent;

const styles = StyleSheet.create({
    container: {},
});
