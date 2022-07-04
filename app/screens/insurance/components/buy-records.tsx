import React, { useCallback, useState } from "react"
import { View, FlatList } from "react-native"
import SearchBar from "../../../components/search-bar"
import { AppText } from "../../../components/app-text/AppText"
import { FONT_MEDIUM_12, MARGIN_BOTTOM_16, ROW } from "../../../styles/common-style"
import { color } from "../../../theme"
import { s, ScaledSheet } from "react-native-size-matters"
import ItemView from "../../loan/components/item-view"
import moment from "moment"
import { useStores } from "../../../models"
import { hidePhoneNumber } from "../../../constants/variable"
import { observer } from "mobx-react-lite"
import { MAPPING_STATUS } from "./buy-success"

interface Props { }

const renderTime = (date) => {
  return (
    <View style={ROW}>
      <AppText value={moment(date).format('DD/MM/YYYY')} />
      <AppText value={'   |   '} color={color.palette.deepGray} />
      <AppText value={moment(date).format('HH:MM:SS')} />
    </View>
  )
}
const BuyRecords = observer((props: Props) => {
  // @ts-ignore
  const { productStore } = useStores()
  const { transactionInsurance } = productStore
  const [show, setShow] = useState(false)

  const fullName = (user) => {
    if (!user) return ''
    if (user?.fullName) return user.fullName
    if (user?.firstName || user?.lastName) return user?.firstName + " " + user?.lastName
    return '***'
  }

  const checkStatus = status => {
    switch (status) {
      case MAPPING_STATUS.SUCCEEDED: {
        return { text: 'Đã thanh toán', color: 'lime' }
      }
      case MAPPING_STATUS.PENDING: {
        return { text: 'Đang thẩm định', color: 'blue' }
      }
      case MAPPING_STATUS.CANCELED: {
        return { text: 'Hoàn tất', color: 'red' }
      }
      default: return { text: '', color: 'lime' }
    }
  }

  const renderItem = useCallback(({ item }: any) => {
    return (
      <View style={styles.wrapItem}>
        <AppText value={`${fullName(item?.customer)} - ${item?.customer?.tels?.[0]?.tel ? hidePhoneNumber(item?.customer?.tels?.[0]?.tel) : ''}`} style={MARGIN_BOTTOM_16} />
        <ItemView title={'Trạng thái:'} content={MAPPING_STATUS[item?.status]} contentStyle={[styles.content, { color: checkStatus(MAPPING_STATUS[item?.status]).color }]} style={MARGIN_BOTTOM_16} />
        <ItemView title={'Số tiền:'} content={`${item?.totalAmount.toLocaleString()} vnđ`} contentStyle={[styles.content]} style={MARGIN_BOTTOM_16} />
        <ItemView title={'Dịch vụ:'} content={item?.product?.name} contentStyle={[styles.content]} style={MARGIN_BOTTOM_16} />
        <ItemView title={'Nhà bảo hiểm:'} content={item?.product?.source ? item?.product?.source : 'FINA'} contentStyle={[styles.content]} style={MARGIN_BOTTOM_16} />
        <ItemView title={'Cập nhật:'} content={renderTime(item?.updatedAt)} contentStyle={[styles.content]} />
      </View>
    )
  }, [])

  setTimeout(() => {
    setShow(true)
  }, 1000);

  return (

    <View style={styles.container}>
      {show && <>
        {/*<SearchBar onChangeSearchText={(e: string) => {*/}
        {/*  //*/}
        {/*}} placeholder={"Bạn đang tìm gì"} />*/}
        <AppText style={[FONT_MEDIUM_12, styles.recordText]}>
          Có tất cả
          <AppText value={` ${transactionInsurance?.total || 0} `} color={color.palette.blue} />
          hồ sơ
        </AppText>
        <FlatList keyExtractor={(_, i) => i.toString()} data={transactionInsurance?.data} renderItem={renderItem} />
      </>}
    </View>
  )
});

export default BuyRecords;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
    paddingHorizontal: '16@ms',
    paddingVertical: '24@s'
  },
  wrapItem: {
    backgroundColor: color.background,
    borderRadius: '8@s',
    padding: '16@ms',
    marginBottom: '16@s',
  },
  content: {
    width: '60%',
    // color: color.palette.orange
  },
  recordText: {
    marginTop: '24@s',
    marginBottom: '16@s'
  }
});
