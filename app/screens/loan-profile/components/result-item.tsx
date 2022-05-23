import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { ScaledSheet, s } from "react-native-size-matters";
import { AppText } from "../../../components/app-text/AppText";
import { HIT_SLOP } from '../../../styles/common-style';
import { color } from "../../../theme";
import ResultItemDetail from './result-item-detail';
import { mappingStatus } from "../../loan/constants"
import { DefaultAvatarSvg } from '../../../assets/svgs';
import { observer } from 'mobx-react-lite';

interface Props {
  item: any,
  dealDetailStoreModel: any,
  loanStore: any,
}

const ResultItem = observer((props: Props) => {
  const [view, setView] = useState(false);
  const { item , dealDetailStoreModel, loanStore} = props
  const status = item?.status
  const { comments, transaction, dealDetailId } = dealDetailStoreModel;

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
          <AppText color={mappingStatus(status, item)?.color} value={mappingStatus(status, item)?.status} />
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
