import React, { useEffect, useState } from 'react';
import { ScrollView, View } from "react-native"
import { SuccessSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import ItemView from "../../loan/components/item-view"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { FONT_REGULAR_12, MARGIN_TOP_16 } from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"
import AppButton from "../../../components/app-button/AppButton"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"
import { numberWithCommas } from "../../../constants/variable"
import moment from 'moment';
import { useStores } from '../../../models';

interface Props {
  onPress(): void,
  productDetail,
  insuranceType,
  getValues,
  transaction
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

const BuySuccess = React.memo(({ onPress, productDetail, insuranceType, getValues, transaction = {} }: Props) => {
  const {productStore} = useStores()
  const insurance = productDetail?.packages?.[insuranceType]
  const [time, setTime] = useState(defaultTime)
  const [reload, setReload] = useState(true)
  const [status, setStatus] = useState(transaction.status)

  useEffect(() => {
    if (time > 0 && transaction?.status === STATUS.PENDING) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    }

    if (time === 0 && reload) {
      productStore.getTransactionInsurance(productDetail?.id).then((res) => {
        const transaction = res?.data?.data?.find(item => item?.id === transaction?.id);
        setStatus(transaction.status)
        setReload(false)
      }).catch(() => {
        setReload(false)
      })
    }
  }, [time])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <View style={styles.success}>
          {status === STATUS.SUCCEEDED && <SuccessSvg />}
          <AppText value={'Mua bảo hiểm'} style={[FONT_REGULAR_12, styles.buyText]} />
          <AppText value={`${MAPPING_STATUS[status] ?? 'Chờ xác nhận'}${time > 0  && status === STATUS.PENDING  ? `(${time})` : ''}`} style={styles.successText} />
        </View>
        <View style={styles.itemContainer}>
          <ItemView title={'Dịch vụ:'} content={insurance?.name} style={MARGIN_TOP_16} />
          <ItemView title={'Nhà bảo hiểm:'} content={'FINA'} style={MARGIN_TOP_16} />
          <ItemView title={'Thời hạn hợp đồng:'} content={'_'} style={MARGIN_TOP_16} />
          <ItemView title={'Họ và tên:'} content={getValues?.fullName} style={MARGIN_TOP_16} />
          <ItemView title={'Ngày sinh:'} content={`${moment(getValues?.dateOfBirth).format('DD/MM/YYYY')}`} style={MARGIN_TOP_16} />
        </View>
        <ItemView title={'Số tiền bảo hiểm'} content={`${numberWithCommas(insurance?.price)}đ`} style={MARGIN_TOP_16} />
      </View>
        <View style={styles.wrapButton}>
          <AppButton
            title={'Quay về'} onPress={() => navigate(ScreenNames.HOME)}
            containerStyle={[styles.btn, styles.whiteBtn]}
            titleStyle={styles.textBtn} />
          <AppButton title={'Lịch sử'} onPress={onPress} containerStyle={[styles.btn]} />
        </View>
    </ScrollView>
  )
});

export default BuySuccess;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: '16@s',
    paddingHorizontal: '16@ms'
  },
  body: {
    backgroundColor: color.background,
    paddingVertical: '24@s',
    paddingHorizontal: '16@ms',
    borderRadius: '8@s'
  },
  success: {
    alignItems: "center"
  },
  successText: {
    fontSize: '20@ms',
    color: color.palette.green,
    fontFamily: fontFamily.bold
  },
  buyText: {
    marginVertical: '4@s'
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: color.palette.F0F0F0,
    paddingBottom: '16@s'
  },
  wrapButton: {
    height: '170@s',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  btn: {
    width: '48%'
  },
  whiteBtn: {
    borderWidth: 1,
    borderColor: color.palette.blue,
    backgroundColor: color.background
  },
  textBtn: {
    color: color.palette.blue
  }
});
