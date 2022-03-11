import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FifthSvg, FinaLogoSvg } from "../../assets/svgs"
import { height, width } from "../../constants/variable"
import { GradientBackground } from "../../components"
import { AppText } from "../../components/AppText/AppText"
interface Props{}

const FifthScreen = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <GradientBackground colors={['#064DD6', 'rgba(98, 150, 249, 0.4)']} />
      <FifthSvg width={width} height={height} style={styles.svgBackground}/>
      <FinaLogoSvg />
      <AppText value={'Welcome'}/>
      <AppText value={'Stay on top by effortlessly tracking your subscriptions & bills'}/>
    </View>
  )
});

export default FifthScreen;
FifthScreen.displayName = 'FifthScreen'

const styles = StyleSheet.create({
  container: {flex: 1},
  svgBackground: {
      position: 'absolute'
  },
  linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  }
});
