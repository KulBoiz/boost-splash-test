import React, {FC, useEffect, useState } from "react"
import { Alert, View } from "react-native"

import { observer } from "mobx-react-lite"
import { AppText } from "../../../components/app-text/AppText"
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
import { useStores } from "../../../models"

const CELL_COUNT = 6;
interface Props{
  phoneNumber: string
  isRegister: boolean
}
const OtpItem:FC<Props> = observer(
  ({ phoneNumber, isRegister } : Props) => {
    const [value, setValue] = useState('');
    const defaultTime = 5 * 60 * 1000
    const { authStoreModel } = useStores()
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
            setStartCheck(false);
            clearInterval(timeout);
          }
        }, 1000);
      }
      return () => {
        clearInterval(timeout);
      };
    }, [isStartCheck, time]);

    const checkOtp = async () => {
      if (isRegister) {
        const otp = await authStoreModel.verifyOtp(value)
        if (otp.kind === 'ok') {
          navigate(ScreenNames.REGISTER)
        }
        else Alert.alert('Bạn đã nhập sai mã xác nhận')
      } else {
        const otp = await authStoreModel.verifyPasswordOtp(value)
        if (otp.kind === 'ok') {
          navigate(ScreenNames.CHANGE_PASSWORD)
        }
        else Alert.alert('Bạn đã nhập sai mã xác nhận')
      }
    }

    const resendCode = async () => {
      if (isRegister) {
        const resend = await authStoreModel.resendOtp(phoneNumber)
        if (resend.kind === 'ok') {
          setTime(defaultTime)
          setStartCheck(true)
        }
      } else {
        const resend = await authStoreModel.forgotPassword(phoneNumber)
        if (resend.kind === 'ok') {
          setTime(defaultTime)
          setStartCheck(true)
        }
      }
    }

    useEffect(()=> {
      if (value?.length === 6) {
        checkOtp()
      }
    },[value])

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
        {time > 0 &&
          <>
            <AppText value={`(${moment(time).format('mm:ss')})`} style={styles.textCountDown}/>
            <AppText tx={'auth.endProcess'} style={styles.text}/>
          </>
        }
        <View style={styles.wrapText}>
           <AppText tx={'auth.notReceiveCode'} style={styles.text}/>
          <AppText onPress={resendCode} tx={'auth.resentCode'} style={presets.bold} color={color.palette.blue} underline />
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
    width: '35@s',
  },
  cellText: {
    color: '#000',
    fontSize: '40@ms',
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
  text: {
    color: '#486484',
    marginBottom: '8@s'
  },
  root: {minHeight: 300, padding: 20},
  wrapText: {
    flexDirection: 'row'
  }
});
