import React from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeItem from "./components/WelcomeItem"
import { ThirdSvg } from "../../assets/svgs"

interface Props{}

const ThirdScreen = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <WelcomeItem svg={<ThirdSvg />} label={'welcome.thirdLabel'} content={'welcome.thirdContent'} />
    </View>
  )
});

export default ThirdScreen;

ThirdScreen.displayName = 'ThirdScreen';

const styles = StyleSheet.create({
    container: {flex: 1},
});
