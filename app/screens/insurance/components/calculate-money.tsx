import React from "react"
import { Pressable, View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import AppButton from "../../../components/app-button/AppButton"
import ShareComponent from "../../../components/share"
import { fontFamily } from "../../../constants/font-family"
import { numberWithCommas } from "../../../constants/variable"
import { MARGIN_BOTTOM_16 } from "../../../styles/common-style"
import { color } from "../../../theme"
import ItemView from "../../loan/components/item-view"
import { AppText } from "../../../components/app-text/AppText"
import {DOMAIN} from "@env"
import { OrangePlusSvg } from "../../../assets/svgs"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props {
  onPress(): void
  insurance: any
  enable?: any
  productDetail: any
  showRegister?: boolean
}

const CalculateMoney = React.memo(({ onPress, insurance, enable = false, productDetail, showRegister = false}: Props) => {

  const goToRegister = () => {
    navigate(ScreenNames.AGENT)
  }

  const linkShare = () => {
    return DOMAIN + 'san-pham-bao-hiem/' + productDetail?.slug
  }

  const renderRegister = () =>
   (
     <Pressable onPress={goToRegister}>
       <OrangePlusSvg style={{position: 'absolute'}} width={s(24)} height={s(24)}/>
       <View style={styles.wrapItemRegister}>
         <AppText value={'Đăng kí Cộng tác viên'} style={styles.orangeText}/>
       </View>
     </Pressable>
   )


  return (
    <View style={styles.container}>
      <ItemView title={'Tổng tiền:'} content={`${numberWithCommas(insurance?.amount)}đ`} style={MARGIN_BOTTOM_16} contentStyle={styles.price} />
      {showRegister && <ItemView title={'Để nhận ngay ưu đãi:'} content={renderRegister()} style={MARGIN_BOTTOM_16}/> }
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ width: '48%' }}>
          <ShareComponent url={linkShare()} />
        </View>

        <View style={{ width: '48%' }}>
          <AppButton title={'Mua bảo hiểm'} onPress={onPress} disabled={enable} />
        </View>
      </View>
    </View>
  )
});

export default CalculateMoney;

const styles = ScaledSheet.create({
  container: {
    position: "absolute",
    bottom:0, left: 0, right: 0,
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
  },
  orangeText: {
    color: color.palette.orange,
    fontSize: '12@ms',
    fontFamily: fontFamily.bold,
  },
  wrapItemRegister: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: '16@s',
    borderColor: color.palette.orange,
    height: '24@s',
    alignItems: 'center',
    justifyContent: "center",
    paddingLeft: '30@s',
    paddingRight: '12@s'
  }
});
