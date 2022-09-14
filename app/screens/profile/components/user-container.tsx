import React from "react"
import { View } from "react-native"
import UserAvatar from "../../../components/user-avatar/user-avatar"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { useStores } from "../../../models"
import { getFullName } from "../../../constants/variable"
import { fontFamily } from "../../../constants/font-family"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"

interface Props {
}

const UserContainer = React.memo((props: Props) => {
  const {authStoreModel} = useStores()
  const {user} = authStoreModel
  const username = getFullName(user)

  return (
    <View style={styles.container}>
      <FastImage source={images.profile_avatar_background} style={styles.avatarBackground}>
      <UserAvatar style={styles.avatar} />
      </FastImage>
      <View>
        <AppText value={username} fontSize={ms(16)} fontFamily={fontFamily.semiBold}/>
      </View>
    </View>
  )
})

export default UserContainer

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    marginBottom: '12@s',
    paddingTop: '24@s'
  },
  avatar: {},
  avatarBackground :{
    width: '154@s',
    height: '154@s',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: '12@s'
  }
})
