import React, { useCallback, useState } from "react"
import { Pressable, View } from "react-native"
import { SETTING } from "./constants"
import ProfileMenu from "./components/profile-menu"
import { images } from "../../assets/images"
import { color } from "../../theme"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { ScreenNames } from "../../navigators/screen-names"
import ConfirmModal from "../../components/app-modal/confirm-modal"
import { SignOutSvg } from "../../assets/svgs"
import { AppText } from "../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { hexToRgbA } from "../../constants/variable"
import { fontFamily } from "../../constants/font-family"
import { VERSION } from "@env"

interface Props {
}

const Setting = React.memo((props: Props) => {
  const navigation = useNavigation()
  const { authStoreModel } = useStores()
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const logout = useCallback(async () => {
    await authStoreModel.logout()
    navigation.dispatch(StackActions.push(ScreenNames.AUTH))
  },[])

  const deleteAccount = useCallback(() => {
    authStoreModel.deleteUser().then(logout)
  },[])

  const closeModal = useCallback(()=> {
    setDeleteModal(false)
  },[])

const openModal = useCallback(()=> {
    setDeleteModal(true)
  },[])

  return (
    <View>
      {SETTING.map(({ icon, title, active }, i) => {
        return (
          <ProfileMenu key={i} {...{ icon, title, active }} />
        )
      })}

      <ProfileMenu
        icon={images.profile_delete} title={"Xóa tài khoản"}
        active={true} tintColor={color.palette.angry}
        showArrow={false}
        onPress={openModal} />

      <Pressable style={styles.signOut} onPress={logout}>
        <SignOutSvg />
        <AppText value={'Đăng xuất'} style={styles.textSignOut}/>
      </Pressable>

      <AppText value={`Phiên bản FN ${VERSION}`} style={styles.textVersion}/>

      <ConfirmModal
        visible={deleteModal}
        closeModal={closeModal}
        onPress={deleteAccount}
        content={'Bạn có chắc muốn xóa tài khoản?'}
        cancelTitle={'Trờ lại'}
        submitTitle={'Chắc chắn'}
      />
    </View>
  )
})

export default Setting

const styles = ScaledSheet.create({
  signOut:{
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: '12@s',
    marginTop: '24@s'
  },
  textSignOut: {
    fontSize: '14@ms',
    marginLeft: '8@s',
    color: hexToRgbA(color.palette.black, 0.3),
    fontFamily: fontFamily.medium
  },
  textVersion:{
    textAlign: "center",
    fontSize: '14@ms',
    color: hexToRgbA(color.palette.black, 0.3),
  }
})
