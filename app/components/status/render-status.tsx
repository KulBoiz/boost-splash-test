import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from "../app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"

interface Props{
  status: string
  statusColor?: string
  backgroundColor?: string
}

const RenderStatus = React.memo((props: Props) => {
  const {status, statusColor = 'black', backgroundColor = 'transparent'} = props
  return (
    <View style={[styles.container, {backgroundColor}]}>
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
