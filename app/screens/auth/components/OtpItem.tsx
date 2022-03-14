import React, {FC, useEffect, useState } from "react"
import { View } from 'react-native';

import { observer } from "mobx-react-lite"
import { AppText } from "../../../components/AppText/AppText"
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { color } from "../../../theme"
import { presets } from "../../../constants/presets"
import { ScaledSheet } from "react-native-size-matters";
import moment from "moment"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

const CELL_COUNT = 4;
interface Props{
  value: string,
  setValue: (e: string)=> void
}
const OtpItem:FC<Props> = observer(
  (props : Props) => {
    const { value, setValue } = props
    // const defaultTime = 5*60*1000
    const defaultTime = 10*1000
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const [time, setTime] = useState(defaultTime)
    const [isStartCheck, setStartCheck] = useState<boolean>(true);

    useEffect(() => {
      if (isStartCheck) {
        var timeout = setInterval(() => {
          if (time > 0) {
            setTime(time > 1000 ? time - 1000 : 0);
          }
          if (time === 0) {
            navigate(ScreenNames.REGISTER)
            setStartCheck(false);
            clearInterval(timeout);
          }
        }, 1000);
      }
      return () => {
        clearInterval(timeout);
      };
    }, [isStartCheck, time]);

    return (
      <View style={styles.container}>
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <AppText style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </AppText>
            </View>
          )}
        />
        <AppText value={`(${moment(time).format('mm:ss')})`} style={styles.textCountDown}/>
        <View style={styles.wrapText}>
          <AppText tx={'auth.notReceiveCode'} />
          <AppText onPress={()=> setStartCheck(true)} tx={'auth.resentCode'} style={presets.bold} color={color.palette.blue} underline />
        </View>

      </View>
    )
  });

export default OtpItem;

const styles = ScaledSheet.create({
  cellRoot: {
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    height: '60@s',
    justifyContent: 'center',
    width: '65@s',
  },
  cellText: {
    color: '#000',
    fontSize: '40@s',
    textAlign: 'center',
  },
  codeFieldRoot: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20@s',
    marginBottom: '20@s',
    width: '310@s',
  },
  textCountDown:{
    color: color.palette.orange,
    marginBottom: '100@s'
  },
  container: {},
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
  root: {minHeight: 300, padding: 20},
  wrapText: {
    flexDirection: 'row'
  }
});
