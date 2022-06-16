import React from 'react';
import { Pressable, View } from "react-native"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { ALIGN_CENTER, ROW } from "../../../styles/common-style"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { useStores } from "../../../models"
import { get } from "lodash"

interface Props{
  item: any
}

const BankItem = React.memo((props: Props) => {
  const {item} = props
  const { loanStore } = useStores()
  const imageUrl = item?.org?.image?.url
  const backgroundColor = item?.org?.backgroundColor
  const preferentialRate = get(item, 'info.preferentialRate')
  const preferentialTime = get(item, 'info.preferentialTime')

  const handlePress = () => {
    loanStore.getProductDetail(item?.id)
    navigate(ScreenNames.LOAN_DETAIL)
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={[styles.header, {backgroundColor: backgroundColor ?? '#005992'}]}>
        <FastImage source={{uri:  imageUrl}} style={styles.bankIcon}/>
      </View>
      <View style={styles.body}>
        <AppText value={'Lãi suất'} style={styles.text} color={color.palette.gray}/>

        <View style={[ROW, ALIGN_CENTER, styles.percentContainer]}>
          <AppText value={`${preferentialRate ?? '0'}%`} style={styles.percent}/>
          <AppText value={' /năm'} style={styles.text} color={color.palette.deepGray}/>
        </View>
        <View>
          <AppText value={`${preferentialTime ?? '0'} tháng ưu đãi`} style={styles.text} color={color.palette.gray}/>
        </View>
      </View>
    </Pressable>
  )
});

export default BankItem;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    width: '150@ms',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    borderTopRightRadius: '4@s',
    borderTopLeftRadius: '4@s',
    height:'30@s',
    paddingHorizontal: '4@s',
    alignItems: 'flex-start',
    justifyContent:'center'
  },
  body: {
    backgroundColor: color.background,
    justifyContent: "space-between",
    paddingVertical: '12@ms',
    paddingHorizontal: '24@ms',
    borderBottomRightRadius: '4@s',
    borderBottomLeftRadius: '4@s',
  },
  bankIcon: {
    width: '50@s',
    height:'25@s'
  },
  percentContainer: {
    marginVertical: '4@s'
  },
  text: {
    fontSize: '13@ms',
  },
  percent: {
    fontSize: '21@ms'
  }
});
