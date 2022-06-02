import React, { FC, useCallback, useState } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { ScaledSheet } from "react-native-size-matters";
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { color } from "../../theme"
import { useStores } from "../../models"
import { get } from "lodash"
import ImagePicker from "../image-upload/image-picker"

interface Props{
  style?: ViewStyle | any
}

const UserAvatar:FC<Props> = observer(({ style }: Props) => {
  const {authStoreModel} = useStores()
  const avatar = get(authStoreModel?.user,'avatar')
  const [visible,setVisible] = useState(false)
  const onSelectImage = useCallback((res) => {
    console.log(res)
  },[])

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.wrapAvatar} onPress={()=> setVisible(true)}>
        <FastImage source={avatar ? {uri: avatar} : images.fina_logo} style={styles.avatar}/>
      </Pressable>
      <ImagePicker visible={visible} onCancel={()=> setVisible(false)} onSelectImage={onSelectImage}/>
    </View>
  )
});

export default UserAvatar;

const styles = ScaledSheet.create({
  container: {},
  wrapAvatar: {
    backgroundColor: color.background,
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
