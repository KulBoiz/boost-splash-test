import React, { FC } from "react"
import { View } from 'react-native';
import { observer } from "mobx-react-lite"
import { ScaledSheet } from "react-native-size-matters";
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { color } from "../../theme"

interface Props{}

const UserAvatar:FC<Props> = observer((props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapAvatar}>
        <FastImage source={images.avatar} style={styles.avatar}/>
      </View>
    </View>
  )
});

export default UserAvatar;

const styles = ScaledSheet.create({
  container: {},
  wrapAvatar: {
    width: '108@s',
    height: '108@s',
    borderRadius: '54@s',
    borderWidth: 1,
    borderColor: color.palette.blue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar:{
    width: '100%',
    height: '100%',
    borderRadius: '50@s',

  }

});
