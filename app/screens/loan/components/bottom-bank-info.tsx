import React from 'react';
import { View, Pressable } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { useStores } from "../../../models"

interface Props{
  id: string
}

const BottomBankInfo = React.memo(({ id }: Props) => {
  const { loanStore } = useStores()

  const handlePress = () => {
    loanStore.getProductDetail(id)
    navigate(ScreenNames.LOAN_DETAIL)
  }
  const handlePressRegister = () => {
    loanStore.getProductDetail(id).then(() => {
      navigate(ScreenNames.REGISTER_LOAN)
    })
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.row} onPress={handlePress}>
        <AppText tx={"loan.viewDetail"} style={styles.detailText} capitalize/>
        <FastImage source={images.arrowLeft} style={styles.backIcon} tintColor={color.palette.blue}/>
      </Pressable>
      <Pressable style={styles.button} onPress={handlePressRegister}>
        <AppText tx={'loan.register'} style={styles.titleStyle} />
      </Pressable>
    </View>
  )
});

export default BottomBankInfo;
BottomBankInfo.displayName = 'BottomBankInfo'

const styles = ScaledSheet.create({
  backIcon: {
    marginLeft: '8@ms',
    width: '12@s',
    height: '12@s',
    transform: [{rotate: '180deg'}]
  },
  container: {
    marginTop: '16@s',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems:"center"
    },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  detailText: {
    fontFamily: fontFamily.semiBold,
    fontSize: '12@ms',
    color: color.palette.blue
  },
  button: {
    backgroundColor: color.palette.orange,
    alignItems: "center",
    paddingHorizontal: '16@ms',
    justifyContent: "center",
    borderRadius: '8@s',
    height: '36@s'
  },
  titleStyle: {
    fontSize: '14@ms',
    color: color.text,
    fontWeight: '500'
  }
});
