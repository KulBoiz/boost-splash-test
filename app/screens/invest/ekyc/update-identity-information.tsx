import React from "react"
import { View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import AppHeader from "../../../components/app-header/AppHeader"
import IdentitySelection from "./components/identity-selection"
import IdentityGuide from "./components/identity-guide"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { FONT_REGULAR_14, MARGIN_BOTTOM_24, MARGIN_TOP_8 } from "../../../styles/common-style"

interface Props {
}

const UpdateIdentityInformation = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={"Cập nhật thông tin định danh "} isBlue showBorderWidth={false}/>
      <AppText value={"Quý khách vui lòng lựa chọn loại giấy tờ tùy thân"} style={[FONT_REGULAR_14, MARGIN_BOTTOM_24, MARGIN_TOP_8]}
               textAlign={"center"} color={color.text} />
      <IdentitySelection />
      <IdentityGuide />
    </View>
  )
})

export default UpdateIdentityInformation

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
})
