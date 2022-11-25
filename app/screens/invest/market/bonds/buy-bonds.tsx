import React, { useCallback, useMemo } from "react"
import { View } from "react-native"
import AppHeader from "../../../../components/app-header/AppHeader"
import ItemView from "../../../loan/components/item-view"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"
import { useStores } from "../../../../models"
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import ConvertBonds from "./components/convert-bonds"
import BuyBondsInfo from "./components/buy-bonds-info"
import AppButton from "../../../../components/app-button/AppButton"
import { AppText } from "../../../../components/app-text/AppText"
import { FONT_BOLD_12, MARGIN_BOTTOM_16, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { numberWithCommas, truncateString } from "../../../../constants/variable"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"
import AppViewNoAuth from "../../../../components/app-view-no-auth"

interface Props {
}

const BuyBonds = React.memo((props: Props) => {
  const { investStore } = useStores()
  const { bondsDetail } = investStore
  const validationSchema = Yup.object().shape({
    amount: Yup.string().required('Vui lòng nhập số lượng đầu tư'),
    bonds: Yup.string().required('Vui lòng nhập số lượng trái phiếu'),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {amount: '0', bonds: '0'},
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const handleBuy = useCallback(() => {
    navigate(ScreenNames.PURCHASE_BONDS)
  }, [])
  
  const { authStoreModel } = useStores()

  if (!authStoreModel.isLoggedIn) {
    return <AppViewNoAuth />
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Đặt lệnh mua"} isBlue />

      <View style={styles.body}>
        <View style={styles.bondsInfo}>
          <ItemView title={bondsDetail?.name} content={"Trái phiếu"} contentStyle={styles.content}
                    titleStyle={styles.title} />
        </View>
        <ConvertBonds {...{ control, errors: { ...errors }, setValue, clearErrors, watch, bondsDetail }}/>
      </View>

      <BuyBondsInfo detail={bondsDetail}/>

      <View style={styles.wrapBtn}>
        <View style={[ROW, SPACE_BETWEEN, MARGIN_BOTTOM_16]}>
          <AppText value={'TỔNG GIÁ TRỊ ĐẦU TƯ'} style={FONT_BOLD_12}/>
          <AppText value={`${truncateString(watch('amount'), 20)} VND`} fontSize={ms(15)} fontFamily={fontFamily.bold} color={color.primary}/>
        </View>
        <AppButton title={'Đặt lệnh mua'} onPress={handleBuy} />
      </View>
    </View>
  )
})

export default BuyBonds

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: color.background },
  body: {
    padding: "16@s",
  },
  bondsInfo: {
    borderRadius: "4@s",
    backgroundColor: color.palette.navi,
    paddingVertical: "20@s",
    paddingHorizontal: "16@s",
  },
  content: {
    fontSize: "11@ms",
    color: color.text,
    fontFamily: fontFamily.bold,
  },
  title: {
    fontSize: "11@ms",
    color: color.text,
  },
  wrapBtn: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingBottom: '24@s',
    paddingHorizontal: '16@s'

  }
})
