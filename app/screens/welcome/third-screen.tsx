import React from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeItem from "./components/WelcomeItem"
import { ThirdSvg } from "../../assets/svgs"

interface Props{}

const ThirdScreen = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <WelcomeItem svg={<ThirdSvg />} label={'1504 bộ hồ sơ\n' +
      'đã được giải ngân'} content={'Nắm bắt cơ hội sở hữu ngôi nhà mơ ước\n' +
      'ngay hôm nay'} />
    </View>
  )
});

export default ThirdScreen;

ThirdScreen.displayName = 'ThirdScreen';

const styles = StyleSheet.create({
    container: {flex: 1},
});
