import React from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeItem from "./components/WelcomeItem"
import { SecondSvg } from "../../assets/svgs"

interface Props{}

const SecondScreen = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <WelcomeItem svg={<SecondSvg />} label={'Tư vấn & Hỗ trợ\n' +
      'hồ sơ miễn phí'} content={'Hỗ trợ đăng ký, hoàn thiện thủ tục miễn phí, giúp bạn tiết kiệm thời gian, công sức'} />
    </View>
  )
});

export default SecondScreen;

SecondScreen.displayName = 'SecondScreen';


const styles = StyleSheet.create({
  container: {flex:1},
});
