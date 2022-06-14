import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { s, ScaledSheet } from "react-native-size-matters";
import { AppText } from '../../../components/app-text/AppText';
import { numberWithCommas } from "../../../constants/variable";
import { useStores } from '../../../models';
import { ROLE } from '../../../models/auth-store';
import { color } from "../../../theme";

interface Props {
  item: any,
  addId: any,
  idsCreateLoan: any[]
}

const FeedBackItemDetail = React.memo((props: Props) => {
  const { item, addId, idsCreateLoan = [] } = props
  const { authStoreModel } = useStores()

  return (
    <View style={styles.itemDetail}>
      <View style={styles.borderBottom}></View>
      {item?.responseStatus === 'received' &&
        <View style={styles.content}>
          <View style={styles.item}>
            <AppText style={styles.label} value={'Số tiền phê duyệt:'} />
            <AppText style={styles.value} value={`${numberWithCommas(item?.content?.loanDemand)} VNĐ`} />
          </View>
          <View style={styles.item}>
            <AppText style={styles.label} value={'Thời hạn vay:'} />
            <AppText style={styles.value} value={item?.content?.borrowTime ? `${item?.content?.borrowTime} Năm` : '_'} />
          </View>
          <View style={styles.item}>
            <AppText style={styles.label} value={'Ngày phê duyệt:'} />
            <AppText style={styles.value} value={moment(item?.responseDate).format('DD/MM/YYYY')} />
          </View>
          <View style={styles.item}>
            <AppText style={styles.label} value={'Lãi xuất:'} />
            <AppText style={styles.value} value={item?.content?.interestRate ? `${item?.content?.interestRate}%` : '_'} />
          </View>
          <View style={styles.item}>
            <AppText style={styles.label} value={'Thời gian ưu đãi:'} />
            <AppText style={styles.value} value={item?.content?.preferentialTime ? `${item?.content?.preferentialTime} Năm` : '_'} />
          </View>
          <View style={styles.item}>
            <AppText style={styles.label} value={'Phí kỳ hạn trả trước:'} />
            <AppText style={styles.value} value={item?.content?.prepaidTermFee ? `${numberWithCommas(item?.content?.prepaidTermFee)} VNĐ` : '_'} />
          </View>
        </View>
      }

      <AppText style={styles.labelNote} value={'Ghi chú của ngân hàng:'} />
      <View style={[styles.note, {minHeight: s(50)}]}>
        <AppText style={styles.value} value={item?.bankNote} />
      </View>

      {item?.responseStatus === 'received' && authStoreModel?.role === ROLE.FINA &&
        <View style={{ width: '100%', marginTop: 10 }}>
          <BouncyCheckbox
            size={20}
            isChecked={!!idsCreateLoan?.find(el => el?.id === item?.id)}
            fillColor={color.palette.blue}
            unfillColor="#FFFFFF"
            textComponent={<AppText value={'Chọn ngân hàng'} style={{ marginLeft: 10 }} />}
            iconStyle={{ borderColor: "blue", borderRadius: 4, zIndex: 2 }}
            onPress={(isChecked: boolean) => {
              if (isChecked) {
                addId(idsCreateLoan.concat([item]))
              } else {
                addId(idsCreateLoan?.filter(el => el?.id !== item?.id))
              }
            }}
          />
        </View>
      }
    </View>
  )
});

export default FeedBackItemDetail;

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
