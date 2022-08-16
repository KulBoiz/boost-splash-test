import React from 'react';
import { View } from 'react-native';
import AppHeader from "../app-header/AppHeader"
import { LoanSuccessSvg } from "../../assets/svgs"
import { AppText } from "../app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../constants/font-family"
import { color } from "../../theme"
import { MARGIN_BOTTOM_16, MARGIN_BOTTOM_24 } from "../../styles/common-style"
import AppButton from "../app-button/AppButton"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { StackActions, useNavigation } from "@react-navigation/native"

interface Props{}
// to do
// param headerTitle
// param type

const SuccessScreen = React.memo((props: Props) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Đăng kí gói vay thành công'} hideBack/>
      <View style={styles.body}>
        <LoanSuccessSvg style={MARGIN_BOTTOM_24}/>
        <AppText value={'Đăng ký gói vay'} fontSize={ms(14)}/>
        <AppText value={'Thành công'} style={styles.middleText}/>
        <AppText
          value={'Nhân viên FINA đã nhận được yêu cầu từ bạn và sẽ\nphản hồi trong vòng 24 giờ làm việc'}
          fontSize={ms(14)}
          color={color.palette.grayChateau}
          center
        />
      </View>
      <View style={styles.footer}>
        <AppText value={'Trở về trang chủ'}
                 color={color.primary}
                 fontFamily={fontFamily.semiBold}
                 style={MARGIN_BOTTOM_16}
                 fontSize={ms(14)}
                 onPress={()=> navigate(ScreenNames.HOME)}/>
        <AppButton title={'Xem danh sách gói vay mua nhà'} onPress={()=> navigation.dispatch(StackActions.pop(2))}/>
      </View>

    </View>
  )
});

export default SuccessScreen;

const styles = ScaledSheet.create({
    container: {
      flex:1,
      backgroundColor: color.background
    },
  body: {
    alignItems: "center",
    flex:1,
    paddingTop: '90@s'
  },
  middleText: {
    fontFamily: fontFamily.semiBold,
    marginBottom: '8@s',
    fontSize: '24@ms',
    color: color.primary
  },
  footer:{
      alignItems: "center",
    paddingBottom: '30@s',
    paddingHorizontal: '16@s'
  }
});
