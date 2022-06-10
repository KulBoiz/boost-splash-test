import React, { useCallback, useState } from "react"
import { View, Pressable } from "react-native"
import { ALIGN_CENTER, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import FastImage from "react-native-fast-image"
import ItemView from "../../loan/components/item-view"
import { AppText } from "../../../components/app-text/AppText"
import { DefaultAvatarSvg, PhoneSvg } from "../../../assets/svgs"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import { ScaledSheet, ms, s } from "react-native-size-matters"
import moment from 'moment';
import DashedLine from "react-native-dashed-line"

const TYPE = {
  TASK: 'task',
  DEAL: 'deal',
  DEAL_DETAIL: 'dealDetails',
}

const STATUS_DEAL = {
  'wait_processing': 'Chờ nhân viên xử lý hồ sơ',
  'processing': 'Nhân viên đang xử Lý hồ sơ',
  'moved_to_financial_organization': 'Đã share thông tin hồ sơ cho nhân hàng',
  'lend_approval': 'Phê duyệt cho vay',
  'disbursing': 'Đang được giải ngân',
  'tripartite_blockade': 'Đang phong toả ba bên',
  'disbursed': 'Đã giải ngân thành công',
  'cancelled': 'Nhân viên đã huỷ hồ sơ',
}

const STATUS_DEAL_DETAIL = {
  'wait_processing': 'Chờ nhân viên xử lý hồ sơ',
  'processing': 'Nhân viên đang xử Lý hồ sơ',
  'moved_to_financial_organization': 'Đã share thông tin hồ sơ cho nhân hàng',
  "received": 'Ngân hàng đã tiếp nhận thông tin',
  'lend_approval': 'Ngân hàng đã duyệt hồ sơ vay',
  'disbursing': 'Ngân hàng đang giải ngân',
  'tripartite_blockade': 'Ngân hàng đang rà soát',
  'disbursed': 'Ngân hàng đã kết thúc quá trình giải ngân',
  'cancelled': 'Ngân hàng từ chối hồ sơ',
}

interface Props {
  item?: any
  isLastItem: boolean
}

const HistoryItem = React.memo((props: Props) => {
  const { item, isLastItem } = props
  const [itemHeight,setItemHeight] = useState<number>(0)

  const renderContent = () => {
    return (
      <Pressable>
        <PhoneSvg width={ms(18)} height={ms(18)} />
      </Pressable>
    )
  }

  const renderDetail = () => {
    const { type, status } = item

    if (type === TYPE.TASK) {
      return item?.message
    }

    if (type === TYPE.DEAL) {
      return STATUS_DEAL[status]
    }

    if (type === TYPE.DEAL_DETAIL) {
      return STATUS_DEAL_DETAIL[status]
    }

    return "_"
  }
  return (
    <View style={styles.container} onLayout={useCallback((event) => {
      const {height} = event.nativeEvent.layout;
      setItemHeight(height)
    },[])}>
      <View style={[ROW, SPACE_BETWEEN]}>
        <View style={ALIGN_CENTER}>
        {item?.createdBy?.avatar ? <FastImage source={{ uri: item?.createdBy?.avatar }} style={styles.avatar} /> :
          <DefaultAvatarSvg width={s(48)} height={s(48)} style={styles.avatarContainer} />
        }
        {!isLastItem && <DashedLine axis='vertical' dashLength={10} dashThickness={1.5} dashGap={9} dashColor='blue' style={[styles.dashLine, {height: itemHeight}]} /> }
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <ItemView title={item?.createdBy?.fullName} titleStyle={styles.title} content={renderContent()} />

          <AppText value={item?.createdBy?.type === 'teller' ? 'Nhân viên tài chính' : 'chuyên viên tư vấn FINA'} style={styles.role} capitalize />

          <AppText value={renderDetail()} capitalize />

          <View style={[ROW, styles.timeContainer]}>
            <AppText value={moment(item?.updatedAt).format("DD/MM/YYYY")} />
            <View style={styles.separate} />
            <AppText value={moment(item?.updatedAt).format("HH:mm")} />
          </View>
        </View>
      </View>
    </View>
  )
});

export default HistoryItem;

const styles = ScaledSheet.create({
  container: {
    marginBottom: '24@s'
  },
  dashLine: {
    top: '20@vs',
    position: 'absolute',
    zIndex: -1
  },
  avatar: {
    zIndex: 1,
    width: '48@s',
    height: '48@s',
    borderRadius: '24@s'
  },
  title: {
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    color: color.palette.blue
  },
  role: {
    marginTop: '2@s',
    marginBottom: '8@s',
    fontSize: '12@s',
    color: color.palette.lightGray,
    fontFamily: fontFamily.light
  },
  separate: {
    backgroundColor: '#DCDDDF',
    width: 1,
    height: '10@s',
    top: '2@s',
    marginHorizontal: '16@s',
  },
  timeContainer: {
    marginTop: '2@s'
  },
  avatarContainer: {}
});
