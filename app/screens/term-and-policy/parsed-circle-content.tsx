import React from 'react';
import { View } from 'react-native';
import {  MARGIN_BOTTOM_16, ROW } from "../../styles/common-style"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import ParsedText from "react-native-parsed-text"

interface Props{
  data: Array<string>
  parseString: string
}

const ParsedCircleContent = React.memo((props: Props) => {
  const data = props.data ?? []
  return (
    <View style={styles.container}>
      {
        data.map((val, id)=>{
          return (
            <View key={id.toString()} style={[MARGIN_BOTTOM_16, ROW]}>
              <View style={styles.circle}/>
              <ParsedText
                style={styles.content}
                parse={
                  [
                    {pattern: RegExp(props.parseString), style: {color: color.palette.blue}},
                  ]
                }
                childrenProps={{allowFontScaling: false}}
              >
                {val}
              </ParsedText>
            </View>
          )
        })
      }
    </View>
  )
});

export default ParsedCircleContent;

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
  },
  blue: {
    color: color.palette.blue,
    textDecorationLine: 'underline'
  }
});
