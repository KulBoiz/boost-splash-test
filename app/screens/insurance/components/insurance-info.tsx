import React from 'react';
import { View } from 'react-native';
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import ItemView from "../../loan/components/item-view"
import { FONT_MEDIUM_14, MARGIN_TOP_16 } from "../../../styles/common-style"
import { AppText } from "../../../components/app-text/AppText"

interface Props {
  insurance: any
  productDetail: any
}

const InsuranceInfo = React.memo(({ insurance, productDetail }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>

        <View style={styles.itemContainer}>
          <View style={styles.header}>
            <AppText value={'Thông tin bảo hiểm'} style={FONT_MEDIUM_14} />
          </View>
          <ItemView title={'Nhà bảo hiểm:'} content={'BSH Care'} style={MARGIN_TOP_16} />
          <ItemView title={'Sản phẩm bảo hiểm:'} content={productDetail?.name} style={MARGIN_TOP_16} />
          <ItemView title={'Gói bảo hiểm:'} content={insurance?.name} style={MARGIN_TOP_16} />
          <ItemView title={'Thời hạn hợp đồng:'} content={'_'} style={MARGIN_TOP_16} />
          <ItemView title={'Tổng số người tham giá:'} content={'_'} style={MARGIN_TOP_16} />
          <ItemView title={'Số tiền bảo hiểm:'} content={`${insurance?.price}vnđ`} style={MARGIN_TOP_16} />
        </View>
      </View>

    </View>
  )
});

export default InsuranceInfo;

const styles = ScaledSheet.create({
  container: {
    marginTop: '24@s',
    flex: 1,
    backgroundColor: color.palette.lightBlue
  },
  itemContainer: {
    backgroundColor: color.background,
    padding: '16@ms',
    borderRadius: '8@s'
  },
  body: {
    paddingHorizontal: '16@ms'
  },
  header: {
    borderBottomWidth: 1,
    paddingBottom: '16@s',
    borderBottomColor: color.palette.F0F0F0
  }
});
