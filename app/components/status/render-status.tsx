import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { AppText } from "../app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"

interface Props{
  status: string
  statusColor?: string
  backgroundColor?: string
  style?: ViewStyle | any
}

const RenderStatus = React.memo((props: Props) => {
  const {status, statusColor = 'black', backgroundColor = 'transparent', style} = props
  return (
    <View style={[styles.container, {backgroundColor}, style]}>
      <AppText value={status ?? ''} color={statusColor} fontSize={ms(11)}/>
    </View>
  )
});

export default RenderStatus;

const styles = ScaledSheet.create({
    container: {
      borderRadius: '16@s',
      paddingHorizontal: '8@s',
      paddingVertical: '4@s',
    },
});
