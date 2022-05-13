import React from 'react';
import { View } from 'react-native';
import { MARGIN_BOTTOM_16, ROW } from "../../styles/common-style"
import { AppText } from "../../components/app-text/AppText"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  data: Array<string>
}

const CircleContent = React.memo((props: Props) => {
  const data = props.data ?? []
  return (
    <View style={styles.container}>
      {
        data.map((val, id)=>{
          return (
            <View key={id.toString()} style={[MARGIN_BOTTOM_16, ROW]}>
              <View style={styles.circle}/>
              <AppText value={val} style={styles.content}/>
            </View>
          )
        })
      }
    </View>
  )
});

export default CircleContent;

const styles = ScaledSheet.create({
  container: {},
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
