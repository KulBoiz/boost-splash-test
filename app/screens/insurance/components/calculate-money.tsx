import moment from "moment"
import React from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import AppButton from "../../../components/app-button/AppButton"
import ShareComponent from "../../../components/share"
import { fontFamily } from "../../../constants/font-family"
import { numberWithCommas } from "../../../constants/variable"
import { MARGIN_BOTTOM_16 } from "../../../styles/common-style"
import { color } from "../../../theme"
import ItemView from "../../loan/components/item-view"
// import { AppText } from "../../../components/app-text/AppText"
import {API_ENDPOINT} from "@env"

interface Props {
  onPress(): void
  insurance: any
  enable?: any
  productDetail: any
}

const CalculateMoney = React.memo(({ onPress, insurance, enable = false, productDetail }: Props) => {
  console.log('insurance', insurance, productDetail);
  
  const linkShare = () => {
    return API_ENDPOINT+'/san-pham-bao-hiem'
  }

  return (
    <View style={styles.container}>
      <ItemView title={'Tổng tiền:'} content={`${numberWithCommas(insurance?.amount)}đ`} style={MARGIN_BOTTOM_16} contentStyle={styles.price} />
      {/* <ItemView title={'Số lượng:'} content={renderInput()} style={MARGIN_BOTTOM_16}/> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '48%' }}>
          <ShareComponent url={linkShare()} />
        </View>

        <View style={{ width: '48%' }}>
          <AppButton title={'Mua bảo hiểm'} onPress={onPress} disable={enable} />
        </View>
      </View>
    </View>
  )
});

export default CalculateMoney;

const styles = ScaledSheet.create({
  container: {
    borderTopLeftRadius: '8@s',
    borderTopRightRadius: '8@s',
    marginTop: '24@s',
    backgroundColor: color.background,
    paddingHorizontal: '16@ms',
    paddingVertical: '24@s',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,

    elevation: 5,
  },
  price: {
    fontSize: '24@ms',
    color: color.palette.blue,
    fontFamily: fontFamily.semiBold
  },
  wrapMath: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "flex-end",
    width: '80%',
  },
  wrapNumber: {
    marginHorizontal: '4@s',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '4@s',
    minWidth: '25%',
    borderWidth: 1,
    height: '24@s',
    borderColor: color.palette.blue,
  },
  box: {
    width: '24@s',
    height: '24@s',
    borderRadius: '4@s',
    alignItems: "center",
    justifyContent: "center"
  },
  minus: {
    borderWidth: 1,
    borderColor: color.palette.deepGray
  },
  plus: {
    backgroundColor: color.palette.blue
  },
  plusText: {
    fontFamily: fontFamily.bold,
    fontSize: '14@ms'
  },
  minusText: {
    fontFamily: fontFamily.bold,
    fontSize: '14@ms',
    color: color.palette.deepGray
  }
});
