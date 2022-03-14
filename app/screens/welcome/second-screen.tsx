import React from 'react';
import { View, StyleSheet } from 'react-native';
import WelcomeItem from "./components/WelcomeItem"
import { SecondSvg } from "../../assets/svgs"

interface Props{}

const SecondScreen = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <WelcomeItem svg={<SecondSvg />} label={'welcome.secondLabel'} content={'welcome.secondContent'} />
    </View>
  )
});

export default SecondScreen;

SecondScreen.displayName = 'SecondScreen';


const styles = StyleSheet.create({
  container: {flex:1},
});
