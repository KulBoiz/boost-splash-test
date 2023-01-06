import React from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { images } from "../../../../assets/images"
import { s, ScaledSheet } from "react-native-size-matters"
import { ALIGN_CENTER, FONT_SEMI_BOLD_14, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import { formatDate, formatDateTime, hexToRgbA, numberWithCommas } from "../../../../constants/variable"
import { fontFamily } from "../../../../constants/font-family"
import { mappingLabelTypeOfFund } from "../../../invest/market/constants"

interface Props {
  item: any
}
interface ItemProps {
  leftTitle: string,
  leftContent: string
  rightTitle: string
  rightContent: string
  bold?:boolean
}
const lineColor = '#E9EBEF'

const Item = React.memo((props: ItemProps)=> {
  const {leftTitle, leftContent, rightTitle, rightContent, bold = false} = props
  return(
    <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, {marginBottom: s(12)}]}>
      <View>
        <AppText value={leftTitle} color={'#B8B8B8'}/>
        <AppText value={leftContent} fontFamily={bold ? fontFamily.bold : fontFamily.regular}/>
      </View>

      <View>
        <AppText value={rightTitle} textAlign={'right'} color={'#B8B8B8'}/>
        <AppText value={rightContent} textAlign={'right'}/>
      </View>
    </View>
  )
})

const TransactionInformationItem = React.memo(({ item }: Props) => {
  const transactionLog = item?.transactionPartnerLog
  const nextOrderMatchingSession = transactionLog?.productInfo?.info?.nextOrderMatchingSession
  const closedOrderBookTime = transactionLog?.productInfo?.info?.closedOrderBookTime
  const navPre = transactionLog?.productInfo?.info?.navPre
  const productDetailInfo = transactionLog?.productDetailInfo?.name

  return (
    <View style={styles.container}>
      <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
        <View style={[ROW, ALIGN_CENTER]}>
          <FastImage source={images.vinacapital} style={styles.icon} />
          <View>
            <AppText value={item?.productCode} style={FONT_SEMI_BOLD_14} color={color.primary}/>
            <AppText value={mappingLabelTypeOfFund(item?.product?.info?.typeOfFund)} color={color.textColor.success}/>
          </View>
        </View>
        <View style={styles.wrapOrder}>
          <AppText value={item?.orderType?.name} color={color.green.green_02}/>
        </View>
      </View>

      <View style={styles.wrapInfo}>
        <Item leftTitle={'Số tiền mua'} leftContent={`${numberWithCommas(transactionLog?.metaData?.amount)} vnđ`} bold rightTitle={'Ngày đặt lệnh'} rightContent={formatDateTime(transactionLog?.createdAt)}/>
        <Item leftTitle={'Phiên khớp lệnh'} leftContent={formatDate(nextOrderMatchingSession)} rightTitle={'Chương trình'} rightContent={productDetailInfo}/>
        <Item leftTitle={'Sổ lệnh đóng'} leftContent={formatDate(closedOrderBookTime)} rightTitle={'NAV kỳ trước'} rightContent={`${numberWithCommas(navPre)}đ`}/>
      </View>

      <View style={styles.wrapStatus}>
        <Item leftTitle={'Mã lệnh'} leftContent={item?.code} rightTitle={'Trạng thái'} rightContent={item?.statusName}/>

      </View>
    </View>
  )
})

export default TransactionInformationItem

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '12@s',
    paddingTop: '12@s',
    borderWidth: 1,
    borderColor: lineColor,
    borderRadius: '8@s'
  },
  icon: {
    width: "34@s",
    height: "34@s",
    marginRight: '8@s'
  },
  wrapOrder: {
    paddingVertical: '8@s',
    paddingHorizontal: '12@s',
    borderWidth: 1,
    borderColor: color.green.green_02,
    backgroundColor: hexToRgbA(color.green.green_02, 0.1),
    borderRadius: '4@s'
  },
  wrapInfo: {
    marginTop: '12@s'
  },
  wrapStatus: {
    borderTopWidth: 1,
    borderTopColor: lineColor,
    paddingTop: '12@s'
  }
})
