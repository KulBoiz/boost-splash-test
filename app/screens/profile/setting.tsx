import React from "react"
import { StyleSheet, View } from "react-native"
import { SETTING } from "./constants"
import ProfileMenu from "./components/profile-menu"
import { images } from "../../assets/images"
import { color } from "../../theme"

interface Props {
}

const Setting = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      {SETTING.map(({ icon, title, active }, i) => {
        return (
          <ProfileMenu key={i} {...{ icon, title, active }} />
        )
      })}
      <ProfileMenu
        icon={images.profile_delete} title={"Xóa tài khoản"}
        active={true} tintColor={color.palette.angry}
        showArrow={false}
        onPress={() => {
        }} />
    </View>
  )
})

export default Setting

const styles = StyleSheet.create({
  container: {},
})
