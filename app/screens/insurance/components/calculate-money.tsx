import React, { useState } from "react"
import { View } from 'react-native';
import ItemView from "../../loan/components/item-view"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import AppButton from "../../../components/app-button/AppButton"
import { MARGIN_BOTTOM_16 } from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"

interface Props{
  onPress():void
}

const CalculateMoney = React.memo(({ onPress }: Props) => {
  const [price, setPrice] = useState<string | number>(0)
  return (
    <View style={styles.container}>
      <ItemView title={'Tổng tiền:'} content={`${price}đ`} style={MARGIN_BOTTOM_16} contentStyle={styles.price}/>
      <ItemView title={'Số lượng:'} content={''} style={MARGIN_BOTTOM_16}/>
      <AppButton title={'Mua bảo hiểm'} onPress={onPress}/>
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
  }
});
