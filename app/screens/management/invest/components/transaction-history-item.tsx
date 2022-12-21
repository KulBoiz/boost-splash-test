import React from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { images } from "../../../../assets/images"
import { AppText } from "../../../../components/app-text/AppText"
import {
  ALIGN_CENTER,
  FONT_BOLD_14,
  MARGIN_BOTTOM_4,
  MARGIN_TOP_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { getTransactionColor } from "../../constants"
import { fontFamily } from "../../../../constants/font-family"
import { formatDate, numberWithCommas } from "../../../../constants/variable"

interface Props {
  item: any
}

const TransactionHistoryItem = React.memo(({ item }: Props) => {
  const type = item?.orderType?.code === 'SELL'
  return (
    <View style={styles.container}>
      <View style={[ROW,SPACE_BETWEEN, ALIGN_CENTER,MARGIN_BOTTOM_4]}>
        <View style={[ROW, ALIGN_CENTER]}>
          <FastImage source={images.fina_logo} style={styles.icon} />
          <View>
            <AppText value={item?.productCode} style={FONT_BOLD_14} color={color.primary}/>
            {/* <AppText value={mappingLabelTypeOfFund(item?.info?.typeOfFund)} color={color.palette.green}/> */}
            <AppText value={item?.productProgramNameEn} color={color.palette.green}/>
          </View>
        </View>

        <View>
          <View style={[ROW, ALIGN_CENTER]}>
            <View style={[styles.circle, {backgroundColor: getTransactionColor(item?.statusName).transactionColor}]}/>
            <AppText value={item?.statusName} textAlign={'right'}/>
          </View>
          <AppText value={item?.orderType?.name} color={color.primary} textAlign={'right'}/>
        </View>
      </View>

      <View style={[ROW,SPACE_BETWEEN, MARGIN_TOP_8]}>
        <AppText value={!type ? 'Số tiền mua': 'Số tiền bán'} style={styles.label}/>
        <AppText value={'Ngày đặt lệnh'} style={styles.label}/>
      </View>
      <View style={[ROW,SPACE_BETWEEN]}>
        <AppText value={`${numberWithCommas(item?.netAmount)} vnđ`} fontFamily={fontFamily.bold}/>
        <AppText value={formatDate(item?.createAt)}/>
      </View>
    </View>
  )
})

export default TransactionHistoryItem

const styles = ScaledSheet.create({
  container: {
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: '8@s',
    padding: '12@s',
    marginBottom: '12@s'
  },
  icon: {
    width: "34@s",
    height: "34@s",
    marginRight: "8@s",
  },
  circle: {
    width: "8@s",
    height: "8@s",
    borderRadius: '4@s',
    marginRight: '6@s'
  },
  label: {
    color: color.palette.BABABA
  }
})
