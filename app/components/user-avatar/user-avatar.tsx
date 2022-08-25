import React, { FC, useCallback, useState } from "react"
import { ActivityIndicator, Pressable, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { ScaledSheet } from "react-native-size-matters"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { color } from "../../theme"
import { useStores } from "../../models"
import { get } from "lodash"
import ImagePicker from "../upload-document/image-picker"
import { UploadApi } from "../../services/api/upload-api"

interface Props {
  style?: ViewStyle | any
}

const UserAvatar: FC<Props> = observer(({ style }: Props) => {
  const { authStoreModel } = useStores()
  const avatar = get(authStoreModel?.user, "avatar")
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSelectImage = useCallback(async (res) => {
    await setLoading(true)
    const uploadAvatar = await authStoreModel.uploadAvatar(res)
    await setLoading(false)
    if (uploadAvatar.kind === "ok") {
      await authStoreModel.updateUserAvatar()
    }
  }, [])

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.wrapAvatar} onPress={() => setVisible(true)}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FastImage source={avatar ? { uri: avatar } : images.fina_logo} style={styles.avatar} />
        )}
      </Pressable>
      <ImagePicker
        hideUploadFile
        visible={visible}
        onCancel={() => setVisible(false)}
        onSelectImage={onSelectImage}
      />
    </View>
  )
})

export default UserAvatar

const styles = ScaledSheet.create({
  container: {},
  wrapAvatar: {
    backgroundColor: color.background,
    width: "108@s",
    height: "108@s",
    borderRadius: "54@s",
    borderWidth: 1,
    borderColor: color.palette.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: "50@s",
  },
})
