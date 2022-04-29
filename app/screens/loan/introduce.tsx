import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from "../../components/app-text/AppText"
import { FONT_BOLD_14, FONT_SEMI_BOLD_14, ROW } from "../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { LOAN_PROCESS } from "./constants"
import { color } from "../../theme"

interface Props{}

const Introduce = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'quy trình vay vốn'} capitalize style={FONT_SEMI_BOLD_14}/>
      {
        LOAN_PROCESS.map((val, index)=> {
          return(
            <View key={index.toString()} style={ROW}>
            <View style={styles.blueCircle} >
              <AppText value={index} style={FONT_BOLD_14}/>
            </View>
              <View style={ROW}>
              <View style={styles.triangle}/>
                <View style={styles.wrapContent}>
                  <AppText value={val.title}/>
                {val.content.map((e,i)=> (
                  <AppText key={i.toString()} value={e}/>
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
    container: {},
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 16,
    borderRightWidth: 32,
    borderBottomWidth: 16,
    borderTopColor: "transparent",
    borderRightColor: "white",
    borderBottomColor: "transparent",
  },
  blueCircle: {
      width: '24@s',
    height: '24@s',
    borderRadius: '12@s',
    alignItems: "center",
    justifyContent: "center"
  },
  wrapContent: {
      borderRadius: '8@s',
      backgroundColor: color.background,
    padding: '8@s'
  }
});
