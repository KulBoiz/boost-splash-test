import moment from 'moment';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { ScaledSheet, s } from "react-native-size-matters";
import { AppText } from "../../../components/app-text/AppText";
import { HIT_SLOP } from '../../../styles/common-style';
import { color } from "../../../theme";
import ResultItemDetail from './result-item-detail';
// import { mappingStatus } from "../../loan/constants"
import { DefaultAvatarSvg } from '../../../assets/svgs';
import { observer } from 'mobx-react-lite';

interface Props {
  item: any,
  dealDetailStoreModel: any,
  loanStore: any,
}

const STATUS_DEAL = {
  'wait_processing': {
    status: 'Đang chờ xử lý',
    color: 'lime'
  },
  'processing': {
    status: 'Đang xử lý',
    color: 'green'
  },
  'received': {
    status: 'Đã nhận',
    color: 'green'
  },
  'appraisal_progress': {
    status: 'Đang thẩm định',
    color: 'blue'
  },
  'cancelled': {
    status: 'Không tiếp nhận',
    color: 'red'
  },
  'lend_approval': {
    status: 'Phê duyệt hồ sơ',
    color: 'green'
  },
  'disbursing': {
    status: 'đang giải ngân',
    color: 'green'
  },
  'tripartite_blockade': {
    status: 'Đang phong toả',
    color: 'green'
  },
  'disbursed': {
    status: 'Đã giải ngân',
    color: 'green'
  },
  'close-all-disbursement': {
    status: 'Kết thúc giải ngân',
    color: 'green'
  },
}

const ResultItem = observer((props: Props) => {
  const [view, setView] = useState(false);
  const { item , dealDetailStoreModel, loanStore} = props
  const status = item?.status
  const { comments, transaction, dealDetailId } = dealDetailStoreModel;
  const mappingStatus = () => {
    return STATUS_DEAL[status]
  }

  return (
    <View style={[styles.content, dealDetailId !== item?.id && { alignItems: 'center' }]}>
      <TouchableOpacity
        style={{ zIndex: 10 }}
        onPress={() => {
          setView(!view)
          dealDetailStoreModel.setDealDetailId(item?.id)
          dealDetailStoreModel.getTransaction(loanStore.loanDetail?.id, item?.id)
        }}
        hitSlop={HIT_SLOP}
      >
        {item?.partner?.avatar?.url ?
          <Image
            style={[styles.image, dealDetailId === item?.id && { marginTop: 8 }]}
            source={{ uri: item?.partner?.avatar?.url }}
          /> :
          <DefaultAvatarSvg width={s(64)} height={s(64)} />
        }
      </TouchableOpacity>
      <View style={styles.contentItem}>
        <View style={styles.item} >
          <AppText style={styles.itemLabel} value={'Trạng thái:'} />
          <AppText color={mappingStatus()?.color} value={mappingStatus()?.status} />
        </View>

        {item.note &&
          <View style={styles.item} >
            <AppText style={styles.itemLabel} value={'Lý do:'} />
            <AppText style={styles.itemValue} value={item?.note} />
          </View>}

        <View style={styles.item} >
          <AppText style={styles.itemLabel} value={'Cập nhập:'} />
          <AppText style={styles.itemValue} value={moment(item.updatedAt).format('DD/MM/YYYY')} />
        </View>
        {(dealDetailId === item?.id && view)  && <ResultItemDetail item={item} comments={comments} transaction={transaction} />}
      </View>
    </View>
  )
});

export default ResultItem;

const styles = ScaledSheet.create({
  content: {
    marginBottom: '16@s',
    flexDirection: 'row',
  },
  image: {
    width: '64@s',
    height: '64@s',
    resizeMode: 'cover',
    borderRadius: '32@s',
    zIndex: 10,
    borderColor: color.palette.EEEEEE,
    borderWidth: 1,
  },
  contentItem: {
    marginLeft: '-32@s',
    backgroundColor: color.palette.white,
    padding: '16@s',
    borderRadius: '8@s',
    width: '90%',
  },
  item: {
    padding: '4@s',
    flexDirection: 'row',
    marginLeft: '24@s'
  },
  itemLabel: {
    width: '100@s',
    color: color.palette.BABABA,
  },
  itemValue: {
    maxWidth: '150@s'
  }
});
