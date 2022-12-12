import React, { useCallback, useRef } from "react"
import { Alert, Pressable, View, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { ALIGN_CENTER, FONT_REGULAR_12, FONT_REGULAR_14, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { color } from "../../../theme"
import { useStores } from "../../../models"
import { DOMAIN } from "@env"
import QRCode from "react-native-qrcode-svg"
import { hexToRgbA } from "../../../constants/variable"
import Clipboard from "@react-native-clipboard/clipboard"
import Share from "react-native-share"
import * as MediaLibrary from "expo-media-library"
import * as FileSystem from "expo-file-system"
import { find } from "../../../utils/lodash-utils"

interface Props {
}

interface ItemProps {
  label: string
  value: string
  icon: number
  iconStyle?: ViewStyle | any
  textColor?: string

  onPress?(): void
}

const Item = React.memo(({ label, value, icon, iconStyle, textColor, onPress }: ItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <AppText value={label} style={FONT_REGULAR_12} color={color.text} />
      <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, styles.itemContainer]}>
        <AppText value={value} numberOfLines={1} style={[{ flex: 1 }, FONT_REGULAR_14]} color={textColor} />
        <FastImage source={icon} style={[styles.icon, iconStyle]} />
      </View>
    </Pressable>
  )
})

const ReferralContainer = React.memo((props: Props) => {
  let ref = useRef<any>(null).current
  const { authStoreModel, appStore } = useStores()
  const { user } = authStoreModel
  const { refCode } = user
  const linkRef = `${DOMAIN}users/signup?refCode=${refCode}`
  const title = "Chia sẻ mã giới thiệu"
  const message = ""

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(refCode)
    Alert.alert("Đã copy vào clipboard")
  }, [])

  const options = {
    title,
    subject: title,
    message: `${message} ${linkRef}`,
  }
  const share = useCallback(() => {
    Share.open(options)
  }, [])

  const shareQr = useCallback(async () => {
    const fileUri = FileSystem.cacheDirectory + `${refCode}.png`
    const fileExists = find(appStore?.filesDownloaded, (f) => f === fileUri)
    if (fileExists) {
      Share.open({ ...options, url: fileUri, message: linkRef })
      return
    }
    ref.toDataURL(async e => {
      await FileSystem.writeAsStringAsync(fileUri, e, { encoding: FileSystem.EncodingType.Base64 })
    })
    await MediaLibrary.requestPermissionsAsync()
    const asset = await MediaLibrary.createAssetAsync(fileUri)
    await MediaLibrary.createAlbumAsync("QR", asset, false)
      .then((e) => {
        appStore?.addFileDownloaded(fileUri)
        Share.open({ ...options, url: fileUri, message: linkRef })
      })
  }, [refCode, appStore?.filesDownloaded])

  return (
    <FastImage style={styles.container} source={images.profile_referral_background}>
      <View style={styles.wrapItem}>
        <Item
          label={"Đường dẫn giới thiệu của bạn"}
          value={linkRef} icon={images.common_share_arrow}
          textColor={hexToRgbA(color.palette.black, 0.6)}
          onPress={share}
          iconStyle={styles.shareArrow} />
        <Item
          label={"Mã giới thiệu của bạn"}
          onPress={copyToClipboard}
          value={refCode}
          icon={images.common_copy} textColor={color.primary}
        />
      </View>

      <View style={styles.qrContainer}>
        <QRCode
          logo={images.profile_fina_icon}
          logoSize={ms(20)}
          value={linkRef}
          size={ms(90)}
          getRef={(c) => (ref = c)}
        />

        <Pressable onPress={shareQr} style={styles.shareContainer}>
          <AppText value={"Chia sẻ"} color={color.text} />
          <FastImage source={images.common_share} style={styles.icon} />
        </Pressable>
      </View>
    </FastImage>
  )
})

export default ReferralContainer

const styles = ScaledSheet.create({
  container: {
    height: "160@s",
    width: "100%",
    borderRadius: "7@s",
    padding: "16@s",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "24@s",
  },
  wrapItem: {
    justifyContent: "space-between",
    flex: 1,
    marginRight: "16@s",
  },
  qrContainer: {
    justifyContent: "center",
    marginTop: "20@s",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: color.background,
    alignItems: "center",
    paddingHorizontal: "12@s",
    height: "34@s",
    borderRadius: "8@s",
    marginTop: "8@s",
  },
  shareArrow: {
    width: "12.5@ms",
    height: "16@ms",
    marginLeft: "8@s",
  },
  icon: {
    width: "16@s",
    height: "16@s",
    marginLeft: "8@s",
  },
  shareContainer: {
    marginTop: "4@s",
    flexDirection: "row",
    alignItems: "center"
  },
})
