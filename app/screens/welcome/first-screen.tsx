import React from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeItem from "./components/WelcomeItem"
import { FirstSvg } from "../../assets/svgs"

interface Props{}

const FirstScreen = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <WelcomeItem svg={<FirstSvg />} label={'Lãi suất chỉ từ \n' +
      '6.19%/năm '} content={'Với Fina, bạn dễ dàng tra cứu, so sánh \n' +
      'và lựa chọn giải pháp phù hợp nhất'} />
    </View>
  )
});

export default FirstScreen;

FirstScreen.displayName = 'FirstScreen';


const styles = StyleSheet.create({
  container: {flex:1},
});
