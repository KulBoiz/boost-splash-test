import React from 'react';
import { View } from 'react-native';
import { SuccessSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import ItemView from "../../loan/components/item-view"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { FONT_REGULAR_12, MARGIN_TOP_16 } from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"
import AppButton from "../../../components/app-button/AppButton"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"

interface Props{
  onPress(): void
}

const BuySuccess = React.memo(({ onPress }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
      <View style={styles.success}>
        <SuccessSvg />
        <AppText value={'Mua bảo hiểm'} style={[FONT_REGULAR_12, styles.buyText]}/>
        <AppText value={'Thành công'} style={styles.successText}/>
      </View>
        <View style={styles.itemContainer}>
          <ItemView title={'Dịch vụ:'} content={'Bảo hiểm hỗ trợ nằm viện'} style={MARGIN_TOP_16}/>
          <ItemView title={'Nhà bảo hiểm:'} content={'BSH Care'} style={MARGIN_TOP_16}/>
          <ItemView title={'Thời hạn hợp đồng:'} content={'25/04/2022 - 25/04/2023'} style={MARGIN_TOP_16}/>
          <ItemView title={'Họ và tên:'} content={'điểu nguyễn trọng nguyên'} style={MARGIN_TOP_16}/>
          <ItemView title={'Ngày sinh:'} content={'10/05/2001'} style={MARGIN_TOP_16}/>
        </View>
      <ItemView title={'Số tiền bảo hiểm'} content={'200.000vnđ'} style={MARGIN_TOP_16}/>
      </View>
      <View style={styles.wrapButton}>
        <AppButton
          title={'Quay về'} onPress={()=> navigate(ScreenNames.HOME)}
          containerStyle={[styles.btn, styles.whiteBtn]}
          titleStyle={styles.textBtn}/>
        <AppButton title={'Theo dõi'} onPress={onPress} containerStyle={[styles.btn]}/>
      </View>
    </View>
  )
});

export default BuySuccess;

const styles = ScaledSheet.create({
    container: {
      flex:1,
      marginTop: '16@s',
      paddingHorizontal: '16@ms'
    },
  body: {
    backgroundColor: color.background,
    paddingVertical: '24@s',
    paddingHorizontal: '16@ms',
    borderRadius: '8@s'
  },
  success: {
      alignItems: "center"
  },
  successText: {
      fontSize: '20@ms',
    color: color.palette.green,
    fontFamily: fontFamily.bold
  },
  buyText: {
      marginVertical: '4@s'
  },
  itemContainer: {
      borderBottomWidth:1,
    borderBottomColor: color.palette.F0F0F0,
    paddingBottom: '16@s'
  },
  wrapButton: {
    height: '170@vs',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  btn: {
      width: '48%'
  },
  whiteBtn: {
      borderWidth: 1,
      borderColor: color.palette.blue,
    backgroundColor: color.background
  },
  textBtn: {
      color: color.palette.blue
  }
});
