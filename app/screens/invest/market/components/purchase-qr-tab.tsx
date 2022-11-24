import React, { useCallback, useEffect, useRef, useState } from "react"
import { Pressable, View } from "react-native"
import { ALIGN_CENTER, FONT_REGULAR_14, MARGIN_TOP_8, ROW } from "../../../../styles/common-style"
import QRCode from "react-native-qrcode-svg"
import { AppText } from "../../../../components/app-text/AppText"
import { CautionSvg } from "../../../../assets/svgs"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { images } from "../../../../assets/images"
import FastImage from "react-native-fast-image"
import * as FileSystem from "expo-file-system"
import { find } from "../../../../utils/lodash-utils"
import Share from "react-native-share"
import * as MediaLibrary from "expo-media-library"
import { useStores } from "../../../../models"
import PurchaseGuide from "./purchase-guide"

const firstCaution = "Một số Ngân hàng chưa hỗ trợ \nquét mã QR"
const secondCaution = "Quý khách vui lòng đối chiếu lại \nThông tin trước khi chuyển khoản"
const title = "Chia sẻ mã giới thiệu"
const message = ""

interface Props {
  transactionInfo: any
}

const PurchaseQrTab = React.memo(({ transactionInfo = {} }: Props) => {
  let ref = useRef<any>(null).current
  const [linkQr, setLinkQr] = useState('')
  const [modal, setModal] = useState<boolean>(false)
  const options = {
    title,
    subject: title,
    message: `${message}`,
  }
  const shareQr = useCallback(async () => {
    const { appStore } = useStores()
    const fileUri = FileSystem.cacheDirectory + `aa.png`
    const fileExists = find(appStore?.filesDownloaded, (f) => f === fileUri)
    if (fileExists) {
      Share.open({ ...options, url: fileUri })
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
        Share.open({ ...options, url: fileUri })
      })
  }, [])

  const toggleModal = useCallback(() => {
    setModal(!modal)
  }, [modal])

  const { vietQrStore } = useStores()

  useEffect(() => {
    const data = {
      'accountNo': transactionInfo?.productDetailInfo?.bankNumber,
      'accountName': transactionInfo?.productDetailInfo?.dataBank?.name,
      'swiftCode': transactionInfo?.productDetailInfo?.dataBank?.swiftCode,
      'amount': transactionInfo?.metaData?.amount,
      'addInfo': transactionInfo?.metaData?.transferContent,
      'format': 'text',
      'template': '1x9b7a6',
    }
    vietQrStore?.getQRBuyFund(data).then((res) => {
      if (res?.data?.data) setLinkQr(res?.data?.data?.qrDataURL)
    })
  }, [transactionInfo])

  return (
    <View>
      <AppText value={"XEM HƯỚNG DẪN CHUYỂN KHOẢN"} style={FONT_REGULAR_14} color={color.primary} onPress={toggleModal} />
      <View style={[ROW, MARGIN_TOP_8]}>
        <View style={ALIGN_CENTER}>
          {linkQr ? <FastImage
            source={{ uri: linkQr }}
            resizeMode="cover"
            style={styles.iconShareQR} /> :
            <QRCode
              logo={images.profile_fina_icon}
              logoSize={ms(25)}
              value={firstCaution}
              size={ms(120)}
              getRef={(c) => (ref = c)}
            />
          }
          <Pressable onPress={shareQr} style={styles.shareContainer}>
            <AppText value={"Chia sẻ mã QR"} color={color.primary} />
            <FastImage source={images.common_share_blue} style={styles.iconShare} />
          </Pressable>
        </View>
        <View>
          <View style={styles.cautionContainer}>
            <CautionSvg style={styles.icon} />
            <AppText value={firstCaution} style={[FONT_REGULAR_14, { width: "92%" }]} />
          </View>
          <View style={ROW}>
            <CautionSvg style={styles.icon} />
            <AppText value={secondCaution} style={[FONT_REGULAR_14, { width: "92%" }]} />
          </View>
        </View>
      </View>
      <PurchaseGuide visible={modal} closeModal={toggleModal} />
    </View>
  )
})

export default PurchaseQrTab

const styles = ScaledSheet.create({
  container: {},
  icon: {
    marginRight: "4@s",
    marginLeft: "8@s",
  },
  cautionContainer: {
    marginBottom: "12@s",
    flexDirection: "row",
  },
  shareContainer: {
    marginTop: "4@s",
    flexDirection: "row",
    alignItems: "center"
  },
  iconShare: {
    width: '16@s',
    height: '16@s',
    marginLeft: '4@s'
  },
  iconShareQR: {
    width: '100%',
    height: '100@s',
  }
})
