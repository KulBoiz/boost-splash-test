import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LOREM } from "./constants"
import { AppText } from "../../components/app-text/AppText"
import { FONT_SEMI_BOLD_14, MARGIN_BOTTOM_24, MARGIN_BOTTOM_8 } from "../../styles/common-style"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"

interface Props{}

const Term = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      {
        LOREM.map((val, id)=>{
          return (
            <View key={val.title + id} style={MARGIN_BOTTOM_24}>
              <AppText value={`${id+1}. ${val.title}`} style={[FONT_SEMI_BOLD_14, MARGIN_BOTTOM_8]}/>
              <AppText value={val.content}/>
            </View>
          )
        })
      }
    </View>
  )
});

export default Term;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue,
      padding: '16@s'
    },
});
