import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Image, Pressable, View } from "react-native"
import { ALIGN_CENTER, FONT_REGULAR_14, MARGIN_TOP_8, ROW } from "../../../../styles/common-style"
import { AppText } from "../../../../components/app-text/AppText"
import { CautionSvg } from "../../../../assets/svgs"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { images } from "../../../../assets/images"
import FastImage from "react-native-fast-image"
import Share from "react-native-share"
import { useStores } from "../../../../models"
import PurchaseGuide from "./purchase-guide"
import { convertViToEn } from "../../../../constants/variable"

const firstCaution = "Một số Ngân hàng chưa hỗ trợ \nquét mã QR"
const secondCaution = "Quý khách vui lòng đối chiếu lại \nThông tin trước khi chuyển khoản"
const title = "Chia sẻ mã giới thiệu"

interface Props {
  transactionInfo: any
}

const PurchaseQrTab = React.memo(({ transactionInfo = {} }: Props) => {
  const { vietQrStore } = useStores()
  const [linkQr, setLinkQr] = useState("")
  const [modal, setModal] = useState<boolean>(false)

  const options = {
    title,
    subject: title,
    message: `Mã thanh toán của giao dịch ${transactionInfo?.code}`,
    // url: `${linkQr}`
  }
  const shareQr = useCallback(async () => {
    Share.open({ ...options,  url: linkQr })
  }, [linkQr])

  const toggleModal = useCallback(() => {
    setModal(!modal)
  }, [modal])

  useEffect(() => {
    const data = {
      "accountNo": transactionInfo?.productDetailInfo?.bankNumber,
      "accountName": convertViToEn(transactionInfo?.productDetailInfo?.dataBank?.name),
      "swiftCode": transactionInfo?.productDetailInfo?.dataBank?.swiftCode,
      "amount": transactionInfo?.metaData?.amount,
      "addInfo": transactionInfo?.metaData?.transferContent,
      "format": "text",
      "template": "1x9b7a6",
    }
    vietQrStore?.getQRBuyFund(data).then((res) => {
      if (res?.data?.data) setLinkQr(res?.data?.data?.qrDataURL)
    })
  }, [transactionInfo])

  return (
    <View>
      <AppText value={"XEM HƯỚNG DẪN CHUYỂN KHOẢN"} style={FONT_REGULAR_14} color={color.primary}
               onPress={toggleModal} />
      <View style={[ROW, MARGIN_TOP_8]}>
        <View style={ALIGN_CENTER}>
          {linkQr ?
            <Image
              source={{ uri: linkQr }}
              resizeMode="cover"
              style={styles.iconShareQR} />
            :
            <View style={styles.iconShareQR}><ActivityIndicator color={color.primary} /></View>
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
    alignItems: "center",
  },
  iconShare: {
    width: "16@s",
    height: "16@s",
    marginLeft: "4@s",
  },
  iconShareQR: {
    width: "120@ms",
    height: "120@ms",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.palette.lighterGrey,
  },
})
