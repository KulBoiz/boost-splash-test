import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { ALIGN_CENTER, ROW } from "../../../styles/common-style"
import FastImage from "react-native-fast-image"
import { AppText } from "../../../components/app-text/AppText"
import { DefaultAvatarSvg } from "../../../assets/svgs"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import { ScaledSheet, s } from "react-native-size-matters"
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
const RenderCircle = () => {
  return (
    <View style={styles.circle}>
      <View style={styles.smallCircle}/>
    </View>
  )
}
const HistoryItem = React.memo((props: Props) => {
  const { item, isLastItem } = props
  const [itemHeight, setItemHeight] = useState<number>(0)

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

  const time = item?.createdAt || item?.updatedAt

  return (
    <View style={styles.container} onLayout={useCallback((event) => {
      const { height } = event.nativeEvent.layout;
      setItemHeight(height)
    }, [])}>

        <RenderCircle />
        <View style={ROW}>
          <AppText value={time ? moment(time).format("DD/MM/YYYY") : '_'} style={styles.time}/>
          <View style={styles.separate} />
          <AppText value={time ? moment(time).format("HH:mm") : '_'} style={styles.time}/>
        </View>
        {!isLastItem && <DashedLine axis='vertical' dashLength={4} dashThickness={1} dashGap={3} dashColor='gray' style={[styles.dashLine, { height: itemHeight + s(10) }]} />}
      <View style={styles.wrapStatus}>
        <AppText value={renderDetail()} capitalize />
      </View>
      <View style={styles.wrapContact}>
        <View style={[ROW, ALIGN_CENTER]}>
         {item?.createdBy?.avatar ? <FastImage source={{ uri: item?.createdBy?.avatar }} style={styles.avatar} /> :
          <DefaultAvatarSvg width={s(34)} height={s(34)} />
         }
         <View style={{marginLeft: s(5)}}>
           <AppText value={item?.createdBy?.fullName} style={styles.title} />
           <AppText value={item?.createdBy?.type === 'teller' ? 'Nhân viên tài chính' : 'Chuyên viên tư vấn FINA'} style={styles.role} capitalize />
         </View>
        </View>
        {/* <PhoneSvg width={ms(18)} height={ms(18)} /> */}
      </View>
    </View>
  )
});

export default HistoryItem;

const styles = ScaledSheet.create({
  circle: {
    position: "absolute",
    left: '-5.5@s',
    width: '12@s',
    height: '12@s',
    borderRadius: '6@s',
    backgroundColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  smallCircle: {
    width: '4@s',
    height: '4@s',
    borderRadius: '2@s',
    backgroundColor: color.background
  },
  container: {
    marginBottom: '24@s',
    paddingLeft: '18@s'
  },
  dashLine: {
    top: '10@vs',
    position: 'absolute',
    zIndex: -1
  },
  wrapContact:{
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: 'row',
    borderTopRightRadius: '8@s',
    borderBottomLeftRadius: '8@s',
    backgroundColor: color.palette.lighterGrey,
    paddingVertical: '11@s',
    paddingLeft: '8@s',
    paddingRight: '20@s'
  },
  wrapStatus:{
    marginVertical: '4@s'
  },
  time: {
    fontSize: '12@ms',
    fontFamily: fontFamily.semiBold
  },
  avatar: {
    zIndex: 1,
    width: '34@s',
    height: '34@s',
    borderRadius: '17@s'
  },
  title: {
    fontSize: '14@ms',
    fontFamily: fontFamily.bold,
    color: color.palette.blue
  },
  role: {
    marginTop: '2@s',
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
});
