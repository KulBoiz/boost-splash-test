import React from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeItem from "./components/WelcomeItem"
import { FirstSvg } from "../../assets/svgs"

interface Props{}

const FirstScreen = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <WelcomeItem svg={<FirstSvg />} label={'welcome.firstLabel'} content={'welcome.firstContent'} />
    </View>
  )
});

export default FirstScreen;

FirstScreen.displayName = 'FirstScreen';


const styles = StyleSheet.create({
  container: {flex:1},
});
