import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { AppText } from '../../../components/app-text/AppText';
import { color } from "../../../theme";
import Note from '../../../components/note/note';
import { numberWithCommas } from "../../../constants/variable"

interface Props {
  item: any,
  comments: any[],
  transaction: any
}

const ResultItemDetail = React.memo((props: Props) => {
  const { item, comments, transaction } = props

  const getTotalMonetForControl = () => {
    const transactionDetails = transaction?.[0]?.transactionDetails?.filter(el => el?.status === 'for_control')
    return transactionDetails?.reduce((acc: number, item: any) => acc + Number(item.amount), 0) || 0
  }

  const getTransactionForControlNew = () => {
    const transactionDetails = transaction?.[0]?.transactionDetails?.filter(el => el?.status === 'for_control')

    return transactionDetails?.[transactionDetails?.length -1]?.amount || 0
  }

  return (
    <View style={styles.itemDetail}>
      <View style={styles.borderBottom}></View>
      <View style={styles.content}>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Số tiền phê duyệt:'} />
          <AppText style={styles.value} value={numberWithCommas(item?.info?.approvalAmount)} />
        </View>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Thời hạn vay:'} />
          <AppText style={styles.value} value={item?.info?.borrowTime ? `${item?.info?.borrowTime} tháng` : ''} />
        </View>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Ngày phê duyệt:'} />
          <AppText style={styles.value} value={moment(item?.info?.approvalDate).format('DD/MM/YYYY')} />
        </View>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Giải ngân tổng cộng:'} />
          <AppText style={styles.value} value={numberWithCommas(getTotalMonetForControl())} />
        </View>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Giải ngân mới nhất:'} />
          <AppText style={styles.value} value={numberWithCommas(getTransactionForControlNew())} />
        </View>
      </View>

      {/* {comments?.length > 0 && <>
        <AppText style={styles.labelNote} value={'Ghi chú của ngân hàng:'} />
        <View style={styles.note}>
          {comments?.map((comment, index) => (
          <Note key={index.toString()} comment={comment} />
        ))}
          <Note id={''} />
        </View>
      </>} */}

      <AppText style={styles.labelNote} value={'Ghi chú của ngân hàng:'} />
        <View style={styles.note}>
          <Note id={item?.id} />
        </View>

    </View>
  )
});

export default ResultItemDetail;

const styles = ScaledSheet.create({
  borderBottom: {
    height: 1,
    width: '80%',
    backgroundColor: color.palette.EEEEEE,
    marginTop: '8@s',
  },
  itemDetail: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%'
  },
  label: {
    width: '120@s',
    color: color.palette.BABABA,
    paddingBottom: '8@s',
    marginTop: '16@s'
  },
  labelNote: {
    marginTop: '16@s',
    color: color.palette.BABABA,
    paddingBottom: '8@s',
    width: '100%'
  },
  value: {},
  note: {
    width: '100%',
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: '8@s',
    padding: '6@s',
  },
});
