import React, { useCallback, useState } from "react"
import { StyleSheet, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { AppText } from "../../../components/app-text/AppText"
import { ms } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_BOLD_12, FONT_REGULAR_12, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { color } from "../../../theme"
import OtpField from "../../../components/otp-field/otp-field"
import AppButton from "../../../components/app-button/AppButton"

interface Props {
  tel: number
}

const InvestOtp = React.memo(({ tel = 123451252 }: Props) => {
  const [value, setValue] = useState("")

  const handleConfirm = useCallback(() => {
    //
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Xác thực OTP"} />
      <View style={{flex:1}}>
        <AppText value={"Mã OTP đã được gửi qua số điện thoại"} />
        <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
          <AppText value={tel} fontSize={ms(18)} fontFamily={fontFamily.bold} />
          <AppText value={"Đổi số điện thoại"} style={FONT_BOLD_12} color={color.primary} underline />
        </View>
        <OtpField {...{ value, setValue }} />
        <AppText style={FONT_REGULAR_12}>
          Không nhận được mã xác thực? <AppText value={"Gửi lại mã"} underline style={FONT_BOLD_12}
                                                color={color.palette.orange} />
        </AppText>
      </View>

      <View>
        <AppButton title={"Xác nhận"} onPress={handleConfirm} />
      </View>
    </View>
  )
})

export default InvestOtp

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.background,
    flex:1
  },
})
