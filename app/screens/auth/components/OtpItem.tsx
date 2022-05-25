import React, { FC, useEffect, useRef, useState } from "react"
import { Alert, AppState, View } from "react-native"

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
import ConfirmModal from "../../../components/app-modal/confirm-modal"
import SuccessModal from "../../../components/success-modal"
import AsyncStorage from "@react-native-async-storage/async-storage"

const CELL_COUNT = 6;
interface Props{
  phoneNumber: string
  isRegister: boolean
}
const OtpItem:FC<Props> = observer(
  ({ phoneNumber, isRegister } : Props) => {
    const [successModal, setSuccessModal] = useState<boolean>(false);
    const [resendModal, setResendModal] = useState<boolean>(false);
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
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const _handleAppStateChange = (nextAppState: any) => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    };

    useEffect(() => {
      AsyncStorage.setItem('otpTime', moment().toISOString());
      setStartCheck(true);
      AppState.addEventListener('change', _handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', _handleAppStateChange);
      };


    }, []);

    useEffect(() => {
      const initOtpTime = async () => {
        if (appStateVisible === 'active') {
          const createdAt = await AsyncStorage.getItem('otpTime');
          if (createdAt) {
            const timePassed = moment().diff(createdAt, 'milliseconds');
            if (timePassed >= defaultTime) {
              setTime(0);
              setStartCheck(false);
            } else {
              setTime(defaultTime - timePassed);
            }
          }
        }
      };
      initOtpTime();
    }, [appStateVisible]);

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
        return () => {
          clearInterval(timeout);
        };
      }
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

    const success = () => {
      setResendModal(false)
      setTimeout(()=> setSuccessModal(true), 500)
      setTime(defaultTime)
      AsyncStorage.setItem('otpTime', moment().toISOString());
      setStartCheck(true)
    }

    const resendCode = async () => {
      if (isRegister) {
        const resend = await authStoreModel.resendOtp(phoneNumber)
        if (resend.kind === 'ok') {
          success()
        }
      } else {
        const resend = await authStoreModel.forgotPassword(phoneNumber)
        if (resend.kind === 'ok') {
          success()
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
          <AppText onPress={()=> setResendModal(true)} tx={'auth.resentCode'} style={presets.bold} color={color.palette.blue} underline />
        </View>
        <ConfirmModal
          visible={resendModal}
          closeModal={()=>setResendModal(false)}
          onPress={resendCode}
          title={'Bạn chưa nhận được mã OTP?'}
          content={'Vui lòng chờ, FINA sẽ gửi mã OTP cho bạn trong ít phút.'}/>
        <SuccessModal title={'Gửi lại mã xác nhận'} visible={successModal} onPress={ () => setSuccessModal(false)} />
      </View>
    )
  });

export default OtpItem;

const styles = ScaledSheet.create({
  cellRoot: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: '8@s',
    borderWidth: 1,
    height: '55@ms',
    justifyContent: 'center',
    width: '48@ms',
  },
  cellText: {
    color: '#000',
    fontSize: '35@ms',
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
    borderColor: '#007AFF',
    borderWidth: 1,
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
