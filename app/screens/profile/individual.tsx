import React from 'react';
import { View, StyleSheet } from "react-native"
import ProfileMenu from "./components/profile-menu"
import Hotline from "./components/hotline"
import { INDIVIDUAL } from "./constants"

interface Props{}

const Individual = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      {INDIVIDUAL.map(({icon, title, active}, i)=> {
        return(
          <ProfileMenu key={i} {...{ icon, title, active }} />
        )
      })}
      <Hotline />
    </View>
  )
});

export default Individual;

const styles = StyleSheet.create({
    container: {flex:1},
});
