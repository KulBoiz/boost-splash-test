import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { s, ScaledSheet } from "react-native-size-matters";
import { DefaultAvatarSvg } from '../../../assets/svgs';
import { AppText } from "../../../components/app-text/AppText";
import { truncateString } from '../../../constants/variable';
import { HIT_SLOP } from '../../../styles/common-style';
import { color } from "../../../theme";
import FeedBackItemDetail from './feedBackItemDetail';

interface Props {
  item: any,
  itemActive: any,
  setItemActive: any,
  addId: any,
  idsCreateLoan: any[]
}

const TASK_RESPONSE_STATUS = {
  'received': {
    status: 'Đã tiếp nhận',
    color: 'green'
  },
  'reject': {
    status: 'Từ Chối',
    color: 'red'
  },
  'responded': {
    status: 'Đã nhận',
    color: 'green'
  },
}

const FeedBackItem = observer((props: Props) => {
  const { item, itemActive = [], setItemActive, addId, idsCreateLoan } = props;

  const mappingStatus = () => {
    if (!item?.responseStatus) return {
      status: 'Chưa phản hồi',
      color: 'green'
    }

    return TASK_RESPONSE_STATUS[item?.responseStatus]
  }

  const checkItemActive = () => {
    return !!itemActive?.find(el => el === item?.id)
  }

  return (
    <View
      style={[styles.content, !checkItemActive() && { alignItems: 'center' }]}
    >
      <TouchableOpacity
        style={{ zIndex: 1, height: s(64) }}
        onPress={() => {
          if (!item?.responseStatus) {
            alert('Phía ngân hàng chưa phản hồi' + mappingStatus()?.status)
          } else {
            if (checkItemActive()) {
              setItemActive(itemActive?.filter(el => el !== item?.id))
            } else {
              setItemActive(itemActive.concat([item?.id]))
            }
          }
        }}
        hitSlop={HIT_SLOP}
      >
        {item?.partner?.avatar?.url ?
          <Image
            style={[styles.image, checkItemActive() && { marginTop: s(16) }]}
            source={{ uri: item?.partner?.avatar?.url }}
          /> :
          <DefaultAvatarSvg width={s(64)} height={s(64)} />
        }
      </TouchableOpacity>
      <View style={styles.contentItem}>
        <View style={styles.item} >
          <AppText style={styles.itemLabel} value={'Ngân hàng:'} />
          <AppText value={truncateString(item?.partner?.name, 20)} />
        </View>
        <View style={styles.item} >
          <AppText style={styles.itemLabel} value={'Trạng thái:'} />
          <AppText color={mappingStatus()?.color} value={mappingStatus()?.status} />
        </View>
        <View style={styles.item} >
          <AppText style={styles.itemLabel} value={'Họ và tên:'} />
          <AppText color={mappingStatus()?.color} value={item?.user?.fullName} />
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
        {checkItemActive() && <FeedBackItemDetail item={item} addId={addId} idsCreateLoan={idsCreateLoan}/>}
      </View>
    </View>
  )
});

export default FeedBackItem;

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
    width: '80@s',
    color: color.palette.BABABA,
  },
  itemValue: {
    maxWidth: '150@s'
  }
});