import React, { useEffect, useState } from 'react';
import { View } from "react-native"
import { SuccessInsuranceSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { FONT_MEDIUM_14 } from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"
import AppButton from "../../../components/app-button/AppButton"
import { goBack } from "../../../navigators"
import { useStores } from '../../../models';
import AppHeader from "../../../components/app-header/AppHeader"

interface Props {
  onPress(): void,
  productDetail,
  transaction,
  respondTransaction
}

const STATUS = {
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  CANCELED: 'CANCELED'
}

export const MAPPING_STATUS = {
  'PENDING': 'Chờ xử lý',
  'SUCCEEDED': 'Thành công',
  'CANCELED': 'Huỷ bỏ',
}

const defaultTime = 30

const BuySuccess = React.memo((props: Props) => {
  const { onPress, productDetail, transaction = {}, respondTransaction } = props
  const {productStore} = useStores()
  const [time, setTime] = useState(defaultTime)
  const [reload, setReload] = useState(true)
  const [status, setStatus] = useState(respondTransaction?.status)

  // useEffect(() => {
  //   if (time > 0 && respondTransaction?.status === STATUS.PENDING) {
  //     setTimeout(() => {
  //       setTime(time - 1)
  //     }, 1000);
  //   }
  //
  //   if (time === 0 && reload) {
  //     productStore.getTransactionInsurance(productDetail?.id).then((res) => {
  //       const transaction = res?.data?.data?.find(item => item?.id === transaction?.id);
  //       setStatus(transaction?.status)
  //       setReload(false)
  //     }).catch(() => {
  //       setReload(false)
  //     })
  //   }
  // }, [time])

  const goHome = () => {
    goBack()
  }

  return (
    <View style={styles.container}>
      <AppHeader isBlue headerText={MAPPING_STATUS[status] ?? 'Chờ xác nhận'} hideBack/>
      <View style={styles.body}>
        <View style={styles.success}>
          {status === STATUS.SUCCEEDED && <SuccessInsuranceSvg />}
          <AppText value={'Mua bảo hiểm'} style={[FONT_MEDIUM_14, styles.buyText]} />
          <AppText value={`${MAPPING_STATUS[status] ?? 'Chờ xác nhận'}`} style={styles.successText} />
          {/*${time > 0  && status === STATUS.PENDING  ? `(${time})` : ''}*/}
        </View>
      </View>

        <View style={styles.wrapButton}>
          <AppText value={'Trở về trang chủ'} style={styles.homeText} onPress={goHome}/>
          <AppButton title={'Trở về danh sách bảo hiểm'} onPress={goHome}  />
        </View>
    </View>
  )
});

export default BuySuccess;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: '24@s',
    paddingHorizontal: '16@ms',
    borderRadius: '8@s'
  },
  success: {
    alignItems: "center"
  },
  successText: {
    fontSize: '24@ms',
    color: color.palette.blue,
    fontFamily: fontFamily.semiBold
  },
  buyText: {
    marginVertical: '4@s'
  },
  homeText: {
    fontSize: '16@ms',
    color: color.primary,
    fontFamily: fontFamily.semiBold,
    marginBottom: '16@s'
  },
  wrapButton: {
    flex:1,
    alignItems:"center",
    backgroundColor: color.background,
    justifyContent: "flex-end",
    paddingHorizontal: '16@ms',
    paddingBottom: '24@s'
  },

});
