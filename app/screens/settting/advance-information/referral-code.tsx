import React from "react"
import { Alert, View } from "react-native"
import { ALIGN_CENTER, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import QRCode from "react-native-qrcode-svg"
import { DOMAIN } from "@env"
import Clipboard from "@react-native-clipboard/clipboard"
import { fontFamily } from "../../../constants/font-family"

interface Props {
  refCode
}

const ReferralCode = React.memo(({ refCode }: Props) => {
  const linkRef = `${DOMAIN}users/signup?refCode=${refCode}`

  const copyToClipboard = () => {
    Clipboard.setString(linkRef)
    Alert.alert("Đã copy vào clipboard")
  }

  return (
    <View style={styles.container}>
      <View style={[ROW, SPACE_BETWEEN, styles.linkContainer]}>
        <View style={styles.wrapLinkText}>
          <View style={[ROW, ALIGN_CENTER]}>
            <AppText
              value={"Mã giới thiệu: "}
              // fontSize={ms(12)}
            />
            <AppText
              value={refCode}
              fontSize={ms(16)}
              fontFamily={fontFamily.bold}
            />
          </View>
          <AppText
            value={"Link giới thiệu"}
            underline
            fontFamily={fontFamily.semiBold}
            fontSize={ms(20)} color={color.primary}
            onPress={copyToClipboard}
          />


          <AppText
            value={"Ấn để copy hoặc quét mã QR\nđể lấy link giới thiệu"}
            fontSize={ms(11)} center color={color.palette.grayChateau}
          />
        </View>
        <QRCode
          value={linkRef}
        />
      </View>
    </View>
  )
})

export default ReferralCode

const styles = ScaledSheet.create({
  container: {
    marginBottom: "10@s",
  },
  wrapLinkText: {
    justifyContent: "space-around",
    width: "50%",
    alignItems: "center",
  },
  linkContainer: {
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: "8@s",
    paddingVertical: "16@s",
    paddingHorizontal: "24@s",
  },
})
