import moment from 'moment';
import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { AppText } from "../../../components/app-text/AppText";
import { HIT_SLOP } from '../../../styles/common-style';
import { color } from "../../../theme";
import ResultItemDetail from './result-item-detail';

interface Props {
  item: any
}

const ResultItem = React.memo((props: Props) => {
  const { item } = props
  const [view, setView] = useState(false)

  return (
    <View style={[styles.content, !view && { alignItems: 'center' }]}>
      <TouchableOpacity style={{zIndex: 10}} onPress={() => setView(!view)} hitSlop={HIT_SLOP}>
        <Image
          style={[styles.image, view && { marginTop: 8 }]}
          source={{ uri: 'https://static.wixstatic.com/media/9d8ed5_e6ced15f72434992af9b5926526c78f6~mv2.jpg/v1/fill/w_500,h_500,al_c,q_85,usm_0.66_1.00_0.01/9d8ed5_e6ced15f72434992af9b5926526c78f6~mv2.webp' }}
        />
      </TouchableOpacity>
      <View style={styles.contentItem}>
        <View style={styles.item} >
          <AppText style={styles.itemLabel} value={'Trạng thái:'} />
          <AppText style={styles.itemValueStatus} value={item?.status} />
        </View>

        {item.note &&
          <View style={styles.item} >
            <AppText style={styles.itemLabel} value={'Lý do:'} />
            <AppText style={styles.itemValue} value={item?.note} />
          </View>}

        <View style={styles.item} >
          <AppText style={styles.itemLabel} value={'Cập nhập:'} />
          <AppText style={styles.itemValue} value={moment(item.createdAt).format('DD/MM/YYYY')} />
        </View>
        {view && <ResultItemDetail item={item} />}
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
    resizeMode: 'stretch',
    borderRadius: 50,
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
  itemValueStatus: {
    color: color.palette.green,
  },
  itemValue: {
    maxWidth: '150@s'
  }
});
