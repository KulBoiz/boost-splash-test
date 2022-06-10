import React from 'react';
import { View } from 'react-native';
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { ALIGN_CENTER, ROW } from "../../../styles/common-style"

interface Props{
  item: any
}

const BankItem = React.memo((props: Props) => {
  const {item} = props
  const imageUrl = item?.org?.image?.url
  const backgroundColor = item?.org?.backgroundColor

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: backgroundColor ?? '#005992'}]}>
        <FastImage source={{uri:  imageUrl}} style={styles.bankIcon}/>
      </View>
      <View style={styles.body}>
        <AppText value={'LÃI XUẤT'} style={styles.text}/>
        <View style={[ROW, ALIGN_CENTER]}>
          <AppText value={'9,02%'} style={styles.percent}/>
          <AppText value={' /năm'} style={styles.text}/>
        </View>
        <AppText value={'12 THÁNG ƯU ĐÃI'} style={styles.text} color={color.palette.deepGray}/>
      </View>
    </View>
  )
});

export default BankItem;

const styles = ScaledSheet.create({
  container: {
    width: '220@ms',
    height:'125@ms',
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
    alignItems: 'flex-start',
    justifyContent:'center'
  },
  body: {
    backgroundColor: color.background,
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: '20@ms',
    borderBottomRightRadius: '4@s',
    borderBottomLeftRadius: '4@s',
  },
  bankIcon: {
    width: '50@s',
    height:'25@s'
  },
  text: {
    fontSize: '11@ms',
  },
  percent: {
    fontSize: '21@ms'
  }
});
