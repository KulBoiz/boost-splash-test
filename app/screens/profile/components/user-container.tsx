import React from "react"
import { View } from "react-native"
import UserAvatar from "../../../components/user-avatar/user-avatar"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { useStores } from "../../../models"
import { getFullName, hexToRgbA } from "../../../constants/variable"
import { fontFamily } from "../../../constants/font-family"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import RenderStatus from "../../../components/status/render-status"
import { color } from "../../../theme"
import { MARGIN_BOTTOM_8 } from "../../../styles/common-style"
import { observer } from "mobx-react-lite"

interface Props {
}

const UserContainer = observer((props: Props) => {
  const {authStoreModel} = useStores()
  const {user, role} = authStoreModel
  const username = getFullName(user)

  return (
    <View style={styles.container}>
      <FastImage source={images.profile_avatar_background} style={styles.avatarBackground}>
      <UserAvatar style={styles.avatar} />
      </FastImage>
      <View>
        <AppText value={username} fontSize={ms(16)} fontFamily={fontFamily.semiBold} style={MARGIN_BOTTOM_8}/>
      </View>
      <RenderStatus status={role} statusColor={color.primary} backgroundColor={hexToRgbA(color.primary, 0.1)}/>
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
