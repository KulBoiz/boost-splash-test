import React, { useEffect, useState } from "react"
import { View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { ScaledSheet, s } from "react-native-size-matters"
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field"
import { CancelSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"

interface Props{
  visible: boolean,
  closeModal(): void
  stepThree(): void
}

const CELL_COUNT = 6;

const PinModal = React.memo((props: Props) => {
  const {visible, closeModal, stepThree} = props
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(()=> {
    if (value.length === 6){
      stepThree()
    }
  },[value])

  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={closeModal}>
            <CancelSvg width={s(32)} height={s(32)}/>
          </TouchableOpacity>
          <AppText value={'Nhập mã PIN'} style={styles.headerText}/>
          <View style={styles.empty}/>
        </View>
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
        <AppText value={'Quên mã PIN'} style={styles.pin}/>
      </View>
    </Modal>
  )
});

export default PinModal;

const styles = ScaledSheet.create({
  container: {
    position: 'relative', margin: 0, paddingHorizontal: '12@s'
  },
  headerText:{
    fontSize: '16@s',
    fontFamily: fontFamily.semiBold
  },
  empty: {
    width: '32@s',
    height: '32@s'
  },
  body: {
    backgroundColor: Colors.white,
    borderRadius: '8@s',
    padding: '16@s',
    paddingBottom: '24@s'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  cellRoot: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: '8@s',
    borderWidth: 1,
    height: '60@ms',
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
    width: '300@s',
  },
  focusCell: {
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  pin: {
    color: color.palette.blue,
    textAlign: "center"
  }
});
