import React from 'react';
import { View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field"
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  value: any
  setValue(e: any): void
}

const CELL_COUNT = 6;

const OtpField = React.memo((props: Props) => {
  const {value, setValue} = props
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

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
    </View>
  )
});

export default OtpField;

const styles = ScaledSheet.create({
    container: {},
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
  focusCell: {
    borderColor: '#007AFF',
    borderWidth: 1,
  },
});
