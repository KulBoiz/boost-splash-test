import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReferralContainer from "./components/referral-container"
import ProfileMenu from "./components/profile-menu"
import Hotline from "./components/hotline"
import { AGENT } from "./constants"
import { ROLE } from "../../models/auth-store"
import SettingItem from "../settting/components/setting-item"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { useStores } from "../../models"

interface Props{}

const Agent = React.memo((props: Props) => {
  const { authStoreModel } = useStores()

  return (
    <View style={styles.container}>
      <ReferralContainer />
      {AGENT.map(({icon, title, active, onPress}, index)=> {
        if (index === 0 && (authStoreModel?.role === ROLE.FINA || authStoreModel?.role === ROLE.BANK)) {
          return <View key={index.toString()}/>
        }
        if (index === 0 && authStoreModel?.role === ROLE.CTV) {
          return <ProfileMenu
            key={index.toString()}
            active={active}
            icon={icon}
            title={'Hợp đồng cộng tác viên'}
            onPress={() => {
              navigate(ScreenNames.AGENT, {screen: ScreenNames.VIEW_CONTRACT})
            }}
          />
        }
        return(
          <ProfileMenu key={index} {...{ icon, title, active,onPress }} />
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
