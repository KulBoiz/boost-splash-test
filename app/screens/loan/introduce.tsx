import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from "../../components/app-text/AppText"
import { FONT_SEMI_BOLD_14 } from "../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { LOAN_PROCESS } from "./constants"

interface Props{}

const Introduce = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'quy trình vay vốn'} capitalize style={FONT_SEMI_BOLD_14}/>
      {
        LOAN_PROCESS.map((val, index)=> {
          return(
            <View style={styles.blueCircle} key={index.toString( )}>
              <AppText value={index}/>
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
    borderTopWidth: 50,
    borderRightWidth: 100,
    borderBottomWidth: 50,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
  }
});
