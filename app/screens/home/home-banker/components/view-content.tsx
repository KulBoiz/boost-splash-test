import React from 'react';
import { View } from "native-base";
import { ScaledSheet } from "react-native-size-matters";
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"
import FastImage from "react-native-fast-image"
import { images } from "../../../../assets/images"
import { Pressable } from 'react-native';
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"

interface Props {
  type: 'loan' | 'counselling'
  total: number
}

const ViewContent = React.memo((props: Props) => {
  const  {total, type} = props
  const iconColor = type === 'loan' ? color.palette.blue : color.palette.orange
  const backgroundColor = type === 'loan' ? "#E7EEFB" : "#FFF1E7"

  const onPress = () => {
    if (type === 'loan'){
      navigate(ScreenNames.BANKER_LIST_LOAN_SCREEN)
      return
    }
    navigate(ScreenNames.BANKER_LIST_REQUEST_SCREEN)
  }
  return (
    <Pressable style={[styles.container, {backgroundColor}]} onPress={onPress}>
      <View>
        <AppText value={total} style={[styles.total, {color: iconColor}]}/>
        <AppText value={type === 'loan' ? "hồ sơ vay" : "yêu cầu tư vấn"}/>
      </View>
      <View style={[styles.icon, {backgroundColor: iconColor}]} rounded={'full'}>
        <FastImage source={images.long_arrow_right} style={styles.iconArrow}/>
      </View>
    </Pressable>
  )
});

export default ViewContent;

const styles = ScaledSheet.create({
  container: {
    width: '48%',
    height: '85@s',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: '16@s',
    borderRadius: '8@s'
  },
  icon: {
    width: '26@s',
    height: '26@s',
    alignItems: "center",
    justifyContent: "center",
  },
  total: {
    fontSize: '24@ms',
    fontFamily: fontFamily.bold
  },
  iconArrow: {
    width: '20@s',
    height: '20@s'
  }
});
