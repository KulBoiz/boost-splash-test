import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { AppText } from '../../../components/app-text/AppText';
import { color } from "../../../theme";
import Note from './note';

interface Props {
  item: any
}

const ResultItemDetail = React.memo((props: Props) => {
  const { item } = props

  return (
    <View style={styles.itemDetail}>
      <View style={styles.borderBottom}></View>
      <View style={styles.content}>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Trạng thái:'} />
          <AppText style={styles.value} value={'100.000.000'} />
        </View>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Thời hạn vay:'} />
          <AppText style={styles.value} value={'20 năm'} />
        </View>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Ngày phê duyệt:'} />
          <AppText style={styles.value} value={moment().format('DD/MM/YYYY')} />
        </View>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Giải ngân tổng cộng:'} />
          <AppText style={styles.value} value={'600.000.000'} />
        </View>
        <View style={styles.item}>
          <AppText style={styles.label} value={'Giải ngân mới nhất:'} />
          <AppText style={styles.value} value={'600.000.000'} />
        </View>
      </View>
      <AppText style={styles.labelNote} value={'Ghi chú của ngân hàng:'} />

      <View style={styles.note}>
        <Note />
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
