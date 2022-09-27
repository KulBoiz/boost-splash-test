import React from 'react';
import { View } from 'react-native';
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import { ROW } from "../../styles/common-style"

interface Props{
  data: Array<{title: string, content?:Array<string>}>
}

const RenderStepVertical = React.memo(({ data }: Props) => {
  return (
    <View style={styles.container}>
      {data?.map((e,index)=> {
        return(
          <View key={index} style={ROW}>
            <View style={styles.circle}>
              <AppText value={index} fontFamily={fontFamily.bold} color={color.primary}/>
            </View>
            <AppText value={e?.title}/>
          </View>
        )
      })}
    </View>
  )
});

export default RenderStepVertical;

const styles = ScaledSheet.create({
  container: {},
  circle: {
    width: '20@s',
    height: '20@s',
    borderRadius:'10@s',
    backgroundColor: color.palette.lightBlue
  }
});
