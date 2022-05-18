import React from 'react';
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import ItemBenefit from "./item-benefit"
import { width } from "../../../constants/variable"
import { ScaledSheet } from "react-native-size-matters"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"

interface Props{}

const Benefit = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <FastImage source={images.defaultBackground} style={styles.banner}/>

      <View style={styles.itemContainer}>
        <AppText>
          Chi tiết bải hiểm xem
          <AppText value={' tại đây'} color={color.palette.blue} onPress={()=> navigate(ScreenNames.INSURANCE_DETAIL)}/>
        </AppText>
      </View>
      <View style={styles.wrapBenefit}>
        <View style={styles.benefitContainer}>
          <ItemBenefit haveInsurance/>
          <ItemBenefit />
        </View>
      </View>
    </View>
  )
});

export default Benefit;

const styles = ScaledSheet.create({
    container: {},
  banner: {
    borderRadius: '8@s',
    width: '100%',
    height: '180@s',
    alignSelf: "center"
  },
  wrapBenefit: {
    position: 'absolute',
    bottom: '70@s'
  },
  benefitContainer:{
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemContainer: {
    height: '200@ms',
    backgroundColor: color.background,
    paddingHorizontal: '16@ms',
    paddingBottom: '24@s',
    justifyContent: "flex-end"
  }
});
