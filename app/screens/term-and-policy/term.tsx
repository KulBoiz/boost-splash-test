import React from 'react';
import { ScrollView, View } from "react-native"
import {
   PERSONAL_ACCOUNT,
  SEND_SUPPORT_INFORMATION, SHARE_SOCIAL_NETWORK,
  TERMS_OF_USE,
  TERMS_OF_USE_CONTETNT,
  USED_SERVICE,
  WEBSITE_CONTENT,
} from "./constants"
import { AppText } from "../../components/app-text/AppText"
import {
  FONT_REGULAR_12,
  MARGIN_BOTTOM_16,
  MARGIN_BOTTOM_8,
  ROW,
} from "../../styles/common-style"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../constants/font-family"

interface Props{}

const Term = React.memo((props: Props) => {
  return (
    <ScrollView style={styles.container}>
      <AppText value={'ĐIỀU KHOẢN SỬ DỤNG'} style={[styles.title, MARGIN_BOTTOM_8]}/>
      <AppText value={TERMS_OF_USE} style={FONT_REGULAR_12}/>

      {
        TERMS_OF_USE_CONTETNT.map((val, id)=>{
          return (
            <View key={id.toString()} style={[MARGIN_BOTTOM_16, ROW]}>
              <View style={styles.circle}/>
              <AppText value={val} style={styles.content}/>
            </View>
          )
        })
      }
      <AppText value={'Các điều khoản sử dụng'} style={[styles.subTitle,MARGIN_BOTTOM_8]}/>
      <AppText value={'Truy cập tới website fina.com.vn , bạn đã đồng ý:'} style={[styles.h2, MARGIN_BOTTOM_8]}/>
      <AppText value={'Thông tin, nội dung trên website:'} style={[styles.h3, MARGIN_BOTTOM_8]}/>
      {
        WEBSITE_CONTENT.map((val, id)=>{
          return (
                 <View key={id.toString()} style={[MARGIN_BOTTOM_16, ROW]}>
              <View style={styles.circle}/>
              <AppText value={val} style={styles.content}/>
            </View>
          )
        })
      }
      <AppText value={'Sử dụng Dịch vụ:'} style={[styles.h3, MARGIN_BOTTOM_8]}/>
      {
        USED_SERVICE.map((val, id)=>{
          return (
                 <View key={id.toString()} style={[MARGIN_BOTTOM_16, ROW]}>
              <View style={styles.circle}/>
              <AppText value={val} style={styles.content}/>
            </View>
          )
        })
      }
      <AppText value={'Gửi thông tin hỗ trợ:'} style={[styles.h3, MARGIN_BOTTOM_8]}/>

      {
        SEND_SUPPORT_INFORMATION.map((val, id)=>{
          return (
                 <View key={id.toString()} style={[MARGIN_BOTTOM_16, ROW]}>
              <View style={styles.circle}/>
              <AppText value={val} style={styles.content}/>
            </View>
          )
        })
      }
      <AppText value={'Chia sẻ thông tin trên các trang mạng xã hội:'} style={[styles.h3, MARGIN_BOTTOM_8]}/>
      {
        SHARE_SOCIAL_NETWORK.map((val, id)=>{
          return (
                 <View key={id.toString()} style={[MARGIN_BOTTOM_16, ROW]}>
              <View style={styles.circle}/>
              <AppText value={val} style={styles.content}/>
            </View>
          )
        })
      }
      <AppText value={'Tài khoản cá nhân:'} style={[styles.h2, MARGIN_BOTTOM_8]}/>

      <AppText value={PERSONAL_ACCOUNT}/>
      <View style={{height: 50}}/>
    </ScrollView>
  )
});

export default Term;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue,
      padding: '16@ms'
    },
  title: {
      fontSize: '24@ms',
    fontFamily: fontFamily.semiBold,
    textAlign: "center"
  },
  subTitle: {
      fontSize: '20@ms',
    fontFamily: fontFamily.semiBold,
  },
  h2: {
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
  },h3: {
    fontSize: '13@ms',
    fontFamily: fontFamily.semiBold,
  },
  content: {
    width: '95%',
    fontSize: '12@ms',
    lineHeight: '14@s'
  },
  circle: {
    width: '6@s',
    height:'6@s',
    borderRadius: '3@s',
    backgroundColor: color.palette.black,
    marginRight: '10@s',
    marginTop: '5@s'
  }
});
