import React from 'react';
import { View, Pressable } from "react-native"
import { ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import FastImage from "react-native-fast-image"
import ItemView from "../../loan/components/item-view"
import { AppText } from "../../../components/app-text/AppText"
import { PhoneSvg } from "../../../assets/svgs"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import { ScaledSheet, ms } from "react-native-size-matters"

interface Props{}
const avatar = 'https://images.pexels.com/photos/9821104/pexels-photo-9821104.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'

const HistoryItem = React.memo((props: Props) => {
  const renderContent = () => {
    return(
      <Pressable>
        <PhoneSvg width={ms(18)} height={ms(18)}/>
      </Pressable>
    )
  }
  return (
    <View style={styles.container}>
      <View style={[ROW, SPACE_BETWEEN]}>
        <FastImage source={{uri: avatar}} style={styles.avatar}/>
        <View style={{flex: 1, marginLeft: 16}}>
          <ItemView title={'nguyễn thị thanh tâm'} titleStyle={styles.title} content={renderContent()} />
          <AppText value={'chuyên viên tư vấn FINA'} style={styles.role} capitalize/>
          <AppText value={'chuyển thông tin sang ngân hàng'} capitalize/>
          <View style={[ROW, styles.timeContainer]}>
            <AppText value={'19/04/2022'}/>
            <View style={styles.separate}/>
            <AppText value={'13:16'}/>
          </View>
        </View>
      </View>
    </View>
  )
});

export default HistoryItem;

const styles = ScaledSheet.create({
    container: {},
  avatar: {
    width: '48@s',
    height: '48@s',
    borderRadius: '24@s'
  },
  title:{
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    color: color.palette.blue
  },
  role: {
      marginTop: '2@s',
    marginBottom: '8@s',
    fontSize: '12@s',
    color: color.palette.lightGray,
    fontFamily: fontFamily.light
  },
  separate: {
    backgroundColor: '#DCDDDF',
    width:1,
    height: '10@s',
    top: '2@s',
    marginHorizontal: '16@s',
  },
  timeContainer:{
      marginTop: '2@s'
  }
});
