import React from 'react';
import { View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"

interface Props{}

const ProfileDetail = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'chi tiết hồ sơ'} isBlue/>

    </View>
  )
});

export default ProfileDetail;

const styles = ScaledSheet.create({
  container: {flex: 1},
  title: {
    color: color.palette.blue,
    textTransform: 'capitalize'
  },
  avatar: {
    width: '48@s',
    height: '48@s',
    borderRadius: '24@s',
  },
});
