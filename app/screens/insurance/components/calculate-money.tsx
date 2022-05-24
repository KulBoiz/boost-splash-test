import React, { useEffect, useState } from "react"
import { Pressable, TextInput, View } from "react-native"
import ItemView from "../../loan/components/item-view"
import { color } from "../../../theme"
import { ScaledSheet, ms } from "react-native-size-matters"
import AppButton from "../../../components/app-button/AppButton"
import { MARGIN_BOTTOM_16 } from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"
import { AppText } from "../../../components/app-text/AppText"

interface Props{
  onPress(): void
  insurance: any
}

const CalculateMoney = React.memo(({ onPress, insurance }: Props) => {
  const defaultPrice = 10000
  const [price, setPrice] = useState<string | number>(0)
  const [quantity, setQuantity] = useState<string | number>('1');

  useEffect(()=> {
    setPrice(defaultPrice * Number(quantity))
  },[quantity])

  const handleChangeInput = (txt: string) => {
    setQuantity(txt);
  };
  const _handlePlus = () => {
    setQuantity(Number(quantity) + 1);
  };

  const _handleSub = () => {
    if (Number(quantity) > 1) {
      setQuantity(Number(quantity) - 1);
    }
  };

  const renderInput = ()=> {
    return(
      <View style={styles.wrapMath}>
        <Pressable style={[styles.box, styles.minus]} onPress={_handleSub}>
          <AppText value={'-'} style={styles.minusText} />
        </Pressable>
        <View style={styles.wrapNumber}>
          <TextInput value={quantity?.toString()} onChangeText={handleChangeInput} keyboardType={'number-pad'} />
        </View>
        <Pressable style={[styles.box, styles.plus]} onPress={_handlePlus}>
          <AppText value={'+'} style={styles.plusText} color={color.text}/>
        </Pressable>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ItemView title={'Tổng tiền:'} content={`${insurance?.price.toLocaleString()}đ`} style={MARGIN_BOTTOM_16} contentStyle={styles.price}/>
      {/* <ItemView title={'Số lượng:'} content={renderInput()} style={MARGIN_BOTTOM_16}/> */}
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
    borderColor:color.palette.blue,
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
