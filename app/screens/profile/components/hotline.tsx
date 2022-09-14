import React, { useMemo } from "react"
import { StyleSheet, View } from "react-native"
import ProfileMenu from "./profile-menu"
import { images } from "../../../assets/images"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { FONT_REGULAR_14 } from "../../../styles/common-style"

interface Props {
}

const Hotline = React.memo((props: Props) => {
  const renderRight = useMemo(() => (
    <AppText value={"022 829 2723"} color={color.primary} style={FONT_REGULAR_14} />
  ), [])

  return (
    <View style={styles.container}>
      <ProfileMenu
        icon={images.profile_hotline} title={"Hotline hỗ trợ"} active={true} rightContent={renderRight}
        onPress={() => {
          //
        }} />
    </View>
  )
})

export default Hotline

const styles = StyleSheet.create({
  container: {},
})
