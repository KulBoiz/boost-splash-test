import React from 'react';
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"

interface Props{
  style?: ViewStyle | any
  title: string
  content: string
  isInterestRate?: boolean
  contentColor?: string
}

const InterestRate = React.memo(({ style, title, content, isInterestRate = false, contentColor }: Props) => {
  return(
    <View style={style}>
      <AppText value={title} style={styles.title}/>
      <View style={styles.row}>
        <AppText value={isInterestRate ? `${content}%` : content} style={[styles.content, {color: contentColor}]}/>
        <AppText value={isInterestRate ? "(12 Tháng)" : 'Tháng'} style={styles.month} color={contentColor}/>
      </View>
    </View>
  )
})

InterestRate.displayName = 'InterestRate'

export default InterestRate;


const styles = ScaledSheet.create({
  container: {},
  title: {
    fontSize: '10@ms',
    color: "#AEAEB2",
    marginBottom: '7@s'
  },
  row:{
    flexDirection: 'row',
    alignItems: "flex-end"
  },
  content: {
    marginRight: '4@ms',
    fontSize: '24@ms',
    color: '#292D32',
    fontFamily: fontFamily.bold
  },
  month: {
    fontSize: '12@s',
    fontFamily: fontFamily.light
  }
});
