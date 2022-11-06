import React, { useCallback, useState } from "react"
import { View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_BOLD_12, FONT_REGULAR_12, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { color } from "../../../theme"
import OtpField from "../../../components/otp-field/otp-field"
import AppButton from "../../../components/app-button/AppButton"
import { useStores } from "../../../models"
import { RouteProp, useRoute } from "@react-navigation/native"
import { NavigatorParamList } from "../../../navigators/params-list"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props {
}

const InvestOtp = React.memo((props: Props) => {
  const { params: { onSubmit, onResend } } = useRoute<RouteProp<NavigatorParamList, ScreenNames.INVEST_OTP>>()
  const [value, setValue] = useState("")
  const { ekycStore } = useStores()
  const tel = ekycStore.user?.tels?.[0].tel

  const handleConfirm = useCallback(() => {
    onSubmit(value)
  }, [value])

  const handleResend = useCallback(() => {
    setValue('')
    onResend()
  }, [value])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Xác thực OTP"} isBlue />
      <View style={styles.body}>
        <AppText value={"Mã OTP đã được gửi qua số điện thoại"} />
        <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
          <AppText value={tel} fontSize={ms(18)} fontFamily={fontFamily.bold} />
        </View>
        <OtpField {...{ value, setValue }} />
        <AppText style={FONT_REGULAR_12} textAlign={"center"}>
          Không nhận được mã xác thực?
          <AppText value={"Gửi lại mã"} underline style={FONT_BOLD_12}
                   color={color.palette.orange}
                   onPress={handleResend} />
        </AppText>
      </View>

      <View style={styles.wrapBtn}>
        <AppButton title={"Xác nhận"} onPress={handleConfirm} />
      </View>
    </View>
  )
})

export default InvestOtp

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },
  body: {
    flex: 1,
    paddingVertical: "24@s",
    paddingHorizontal: "16@s",
  },
  wrapBtn: {
    paddingVertical: "24@s",
    paddingHorizontal: "16@s",
  },
})
