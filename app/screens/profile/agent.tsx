import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReferralContainer from "./components/referral-container"
import { INDIVIDUAL } from "../settting/constants"
import ProfileMenu from "./components/profile-menu"
import Hotline from "./components/hotline"
import { AGENT } from "./constants"

interface Props{}

const Agent = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <ReferralContainer />
      {AGENT.map(({icon, title, active}, i)=> {
        return(
          <ProfileMenu key={i} {...{ icon, title, active }} />
        )
      })}
      <Hotline />
    </View>
  )
});

export default Agent;

const styles = StyleSheet.create({
    container: {},
});
