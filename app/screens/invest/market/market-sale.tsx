import React, { useCallback } from "react"
import { View, ViewStyle } from "react-native"
import { ms, ScaledSheet } from "react-native-size-matters"
import AppHeader from "../../../components/app-header/AppHeader"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import {
  ALIGN_CENTER,
  FONT_BOLD_12,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_16,
  ROW,
  SPACE_BETWEEN,
} from "../../../styles/common-style"
import { color } from "../../../theme"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import MarketSaleForm from "./components/market-sale-form"
import AppButton from "../../../components/app-button/AppButton"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { numberWithCommas } from "../../../constants/variable"
import moment from "moment"

interface Props {
}

interface ItemProps {
  title: string
  content: string
  style?: ViewStyle | any
  alignRight?: boolean
}

const Item = React.memo(({ title, content, style, alignRight }: ItemProps) => {
  return (
    <View style={style}>
      <AppText value={title} fontSize={ms(11)} fontFamily={fontFamily.regular} textAlign={alignRight ? "right" : "left"}
               color={color.text} />
      <AppText value={content} fontSize={ms(11)} fontFamily={fontFamily.bold} textAlign={alignRight ? "right" : "left"}
               color={color.text} />
    </View>
  )
})

const MarketSale = React.memo((props: Props) => {

  const validationSchema = Yup.object().shape({
    program: Yup.string().required(i18n.t("errors.requireAddress")),
    amount: Yup.string().required(i18n.t("errors.requirePhone")),
    estimatedQuantity: Yup.string().required("Chọn địa ngân hàng"),
    purchaseFee: Yup.string().required("Nhập số tài khoản ngân hàng"),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const handleSale = useCallback(() => {
    navigate(ScreenNames.CONFIRM_SALE)
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Đặt lệnh bán"} isBlue />
      <View style={styles.bodyContainer}>
        <View style={styles.headerContainer}>
          <View style={[ROW, SPACE_BETWEEN]}>
            <Item title={"Phiên giao dịch"} content={"Chương trình mua"} />
            <Item title={"Thời điểm đóng sổ lệnh"} alignRight content={"Linh hoạt"} style={MARGIN_BOTTOM_16} />
          </View>
          <View style={[ROW, SPACE_BETWEEN, ALIGN_CENTER]}>

            <Item title={"NAV/CCQ kỳ trước"} content={"Loại quỹ"} />
          </View>
        </View>
        <MarketSaleForm  {...{ control, errors: { ...errors }, setValue, watch, clearErrors }} />
        <View style={styles.wrapContainer}>
          <View style={styles.header}>
            <AppText value={"Số lượng"} style={FONT_BOLD_12} color={color.text} />
            <AppText value={"Thời gian nắm giữ"} style={FONT_BOLD_12} color={color.text} />
            <AppText value={"Phí bán"} style={FONT_BOLD_12} color={color.text} />
          </View>
          <View style={styles.body}>
            <AppText value={numberWithCommas(4.94)} style={FONT_REGULAR_12} />
            <AppText value={`${numberWithCommas(0.1)} tháng`} style={FONT_REGULAR_12} />
            <AppText value={"2%"} style={FONT_REGULAR_12} />
          </View>
        </View>

        <View style={styles.wrapBtn}>
          <AppButton title={"Đặt lệnh bán"} onPress={handleSale} />
        </View>
      </View>

    </View>
  )
})

export default MarketSale

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: color.background },
  bodyContainer: {
    padding: "16@s",
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: "16@s",
    paddingVertical: "20@s",
    backgroundColor: color.palette.navi,
    borderRadius: "4@s",
  },
  wrapContainer: {
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: "8@s",
    marginBottom: "16@s",
  },
  header: {
    borderTopLeftRadius: "8@s",
    borderTopRightRadius: "8@s",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.primary,
    padding: "16@s",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "12@s",
    paddingHorizontal: "16@s",
  },
  wrapBtn: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingTop: "4@s",
  },
})
