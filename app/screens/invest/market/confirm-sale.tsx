import React, { useCallback } from "react"
import { Alert, DeviceEventEmitter, View, ViewStyle } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { FONT_MEDIUM_12, FONT_REGULAR_12, MARGIN_BOTTOM_4, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import {
  COMMON_ERROR, convertToInt,
  formatDate,
  formatDateTime,
  hexToRgbA,
  numberWithCommas,
  OTP_TIME,
} from "../../../constants/variable"
import ItemView from "../../loan/components/item-view"
import DualButton from "../../../components/app-button/dual-button"
import { goBack, navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { useStores } from "../../../models"
import { mappingLabelTypeOfFund } from "./constants"

interface Props {
}

interface ItemProps {
  leftContent: string
  rightContent: string
  isBold?: boolean
  style?: ViewStyle | any
}
interface RightContentProps {
  content: string
  note?: string
}

const RightContent = React.memo(({ content, note }: RightContentProps) => {
  return (
    <AppText style={FONT_MEDIUM_12}>
      {content} {note && <AppText value={`(${note})`} style={FONT_REGULAR_12} color={"#B9B9B9"} />}
    </AppText>
  )
})

const Item = React.memo(({ leftContent, rightContent, isBold, style }: ItemProps) => {
  return (
    <View style={[ROW, SPACE_BETWEEN, style]}>
      <AppText value={leftContent} fontSize={ms(11)} fontFamily={isBold ? fontFamily.bold : fontFamily.regular}
               color={color.text} />
      <AppText value={rightContent} fontSize={ms(11)} fontFamily={isBold ? fontFamily.bold : fontFamily.regular}
               color={color.text} />
    </View>
  )
})

const note = "Thời hạn thanh toán sau phiên khớp lệnh là từ 2-4 ngày. Ngân hàng giám sát sẽ chuyển tiền về Tài khoản Ngân hàng của bạn."
const GMT = "Giờ VN"

const ConfirmSale = React.memo((props: Props) => {
  const { assetStore } = useStores()
  const transactionInfo = assetStore.sellTransactionInfo

  const onSubmit = useCallback((otpCode)=> {
    assetStore.verifySellOrderOtp(otpCode)
      .then(res=> {
        if (res?.error){
          DeviceEventEmitter.emit('errorOtp', {error: res?.error?.message ?? COMMON_ERROR})
          return
        }
        navigate(ScreenNames.SALE_SUCCESS)
      })
  },[])

  const onResend = useCallback(()=> {
    assetStore.resendSellOrderOtp()
      .then(res=> {
        if (res?.error){
          Alert.alert(res?.error?.message)
          return
        }
        DeviceEventEmitter.emit('resend')
      })
  },[])

  const rightPress= useCallback(()=> {
    assetStore.createSellOrder({volume: transactionInfo?.volume, productId: transactionInfo?.productId, productProgramId: transactionInfo?.productProgramId}).then(res=>{
      if (res?.error) return
      navigate(ScreenNames.INVEST_OTP, {onSubmit, onResend, otpTime: OTP_TIME.SALE})
    })
  },[])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Xác nhận lệnh bán"} isBlue />
      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <Item leftContent={"VINACAPITAL"} rightContent={"Chương trình mua"} style={MARGIN_BOTTOM_4} />
          <Item leftContent={transactionInfo?.code} rightContent={mappingLabelTypeOfFund(transactionInfo?.info?.typeOfFund)} isBold />
        </View>
        <View style={styles.infoContainer}>
          <ItemView title={"Ngày đặt lệnh"} content={<RightContent content={formatDateTime(new Date())} note={GMT} />} style={styles.item}/>
          <ItemView title={"Phiên khớp lệnh"} content={<RightContent content={formatDate(transactionInfo?.info?.nextOrderMatchingSession)}/>} style={styles.item}/>
          <ItemView title={"Phí bán"} content={<RightContent content={`${convertToInt(transactionInfo?.fee)} vnđ`} />} style={styles.item} />
          <ItemView title={"Số lượng bán"} content={<RightContent content={numberWithCommas(transactionInfo?.volume)} />}  />
        </View>
        <View style={styles.valueContainer}>
          <AppText value={"Giá trị tương ứng"} style={[FONT_MEDIUM_12, MARGIN_BOTTOM_4]} color={color.text} />
          <AppText value={`${convertToInt(transactionInfo?.value)} vnđ`} fontSize={ms(24)} color={color.text}
                   fontFamily={fontFamily.bold} />
        </View>

        <View style={styles.noteContainer}>
          <AppText value={note} style={FONT_REGULAR_12} />
        </View>

      </View>

      <View style={styles.btnContainer}>
        <DualButton leftTitle={'Quay lại'} rightTitle={'Xác nhận'} leftPress={goBack} rightPress={rightPress}/>
      </View>
    </View>
  )
})

export default ConfirmSale

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  body: {
    padding: "16@s",
  },
  headerContainer: {
    paddingHorizontal: "16@s",
    paddingVertical: "20@s",
    backgroundColor: color.palette.navi,
    borderRadius: "4@s",
  },
  infoContainer:{
    paddingHorizontal: '16@s',
    paddingVertical: '12@s',
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: '8@s',
    marginTop: '16@s'
  },
  item: {
    marginBottom: "12@s",
  },
  valueContainer: {
    marginVertical: "16@s",
    alignItems: "center",
    backgroundColor: hexToRgbA(color.primary, 0.9),
    paddingVertical: "16@s",
    borderRadius: "8@s",
  },
  noteContainer: {
    padding: "12@s",
    backgroundColor: "#F8F0E3",
    borderRadius: "8@s",
  },
  btnContainer:{
    flexGrow:1,
    justifyContent: "flex-end",
    padding: '16@s'
  }
})
