import React from 'react';
import { View } from 'react-native';
import { AppText } from "../../components/app-text/AppText"
import { FONT_BOLD_14, FONT_MEDIUM_12, FONT_SEMI_BOLD_14, MARGIN_BOTTOM_24, ROW } from "../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { LOAN_PROCESS } from "./constants"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"

interface Props{}

const Introduce = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'quy trình vay vốn'} capitalize style={[FONT_SEMI_BOLD_14,MARGIN_BOTTOM_24]}/>
      <View style={styles.dash}/>
      {
        LOAN_PROCESS.map((val, index)=> {
          return(
            <View key={index.toString()} style={ROW}>
            <View style={styles.blueCircle} >
              <AppText value={index} style={FONT_BOLD_14} color={color.text}/>
            </View>
              <View style={[ROW, MARGIN_BOTTOM_24]}>
              <View style={styles.triangle}/>
                <View style={styles.wrapContent}>
                  <AppText value={val.title} style={[FONT_MEDIUM_12, styles.title]}/>
                {val.content.map((e,i)=> (
                  <View  key={i.toString()} style={ROW}>
                    <View style={styles.circle}/>
                     <AppText value={e} style={styles.contentText}/>
                  </View>
                ))}
                </View>
              </View>
            </View>
          )
        })
      }
    </View>
  )
});

export default Introduce;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue,
      paddingVertical: '24@s',
      paddingHorizontal: '16@ms',
      alignItems: 'center'
    },
  dash: {
    borderWidth: 1,
    height: '300@vs',
    borderStyle: 'dashed',
    position: 'absolute',
    left: '25@ms',
    top: '70@s',
    borderColor: color.line
  },
  title:{marginBottom: '4@s'},
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: '7@s',
    borderRightWidth: '15@s',
    borderBottomWidth: '7@s',
    borderTopColor: "transparent",
    borderRightColor: "white",
    borderBottomColor: "transparent",
    marginTop: '10@s',
    marginLeft: '5@s'
  },
  blueCircle: {
      marginTop: '5@s',
    marginLeft:'5@ms',
      backgroundColor: color.palette.blue,
      width: '24@s',
    height: '24@s',
    borderRadius: '12@s',
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
      marginTop: '3@s',
    marginRight: '5@s',
    width: '3@s',
    height: '3@s',
    borderRadius: '1.5@s',
    backgroundColor: color.palette.deepGray
  },
  wrapContent: {
      borderRadius: '8@s',
      backgroundColor: color.background,
    padding: '8@s',
    width:'90%'
  },
  contentText: {
      fontSize: '10@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.deepGray
  }
});
