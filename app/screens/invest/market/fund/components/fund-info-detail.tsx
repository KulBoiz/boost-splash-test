import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { fontFamily } from "../../../../../constants/font-family"
import { color } from "../../../../../theme"
import { ALIGN_CENTER, ROW } from "../../../../../styles/common-style"
import { s, ScaledSheet } from "react-native-size-matters"
import { formatDate } from "../../../../../constants/variable"
import DashedLine from "react-native-dashed-line"
import moment from "moment"
import { mappingLabelTypeOfFund, ORDER_MATCHING_DAY_MAPPING } from "../../constants"

interface Props {
  data: any
}

interface ItemProps {
  number: number
  title: string
  value: string
  hideDash?:boolean
}

const Item = React.memo(({ number, value, title, hideDash = false }: ItemProps) => {
  const [itemHeight, setItemHeight] = useState<number>(0)

  return (
    <View onLayout={useCallback((event) => {
      const { height } = event.nativeEvent.layout;
      setItemHeight(height)
    }, [])}>
      <View style={[ROW, ALIGN_CENTER]}>
        <View style={styles.circle}>
          <AppText value={number} color={color.primary} fontFamily={fontFamily.bold}/>
        </View>
        <AppText value={title} fontFamily={fontFamily.medium} />
      </View>
      {!hideDash && <DashedLine axis="vertical" dashLength={8} dashThickness={1} dashGap={5} dashColor={color.palette.lightGray}
                   style={[styles.dashLine, { height: itemHeight + s(10) }]} />}
      <View style={[ROW, ALIGN_CENTER, styles.contentContainer]}>
        <View style={styles.smallCircle}/>
        <AppText value={value} color={color.palette.gray} />
      </View>
    </View>
  )
})

const FundInfoDetail = React.memo(({ data } : Props) => {
  const info = data?.info
  const {orderAndTransferMoneyToBuyDate, nextOrderMatchingSession} = data?.info

  return (
    <View style={styles.container}>
      <Item number={1} title={'Ngày khớp lệnh'} value={info?.orderMatchingDate?.map((item:any) => ORDER_MATCHING_DAY_MAPPING[item]).join(', ') || ''} />
      <Item number={2} title={'Phiên khớp lệnh tiếp theo'} value={formatDate(nextOrderMatchingSession)} />
      <Item number={3} title={'Đặt lệnh & chuyển tiền mua'} value={`Trước ${moment(orderAndTransferMoneyToBuyDate).format('HH:MM, DD/MM/YYYY')}`} hideDash />
    </View>
  )
})

export default FundInfoDetail

const styles = ScaledSheet.create({
  contentContainer: {
    marginLeft: '48@s',
    marginBottom: '16@s',
    marginTop: '8@s'
  },
  dashLine: {
    top: '10@vs',
    position: 'absolute',
    left: '10@s',
    zIndex: -1
  },
  circle: {
    width: "20@s",
    height: "20@s",
    borderRadius: "10@s",
    alignItems: "center",
    justifyContent: "center",
    marginRight: '12@s',
    backgroundColor: color.palette.lightBlue
  },
  smallCircle: {
    width: "2@s",
    height: "2@s",
    borderRadius: "1@s",
    marginRight: '12@s',
    backgroundColor: color.palette.deepGray
  },
  container: {},
})
