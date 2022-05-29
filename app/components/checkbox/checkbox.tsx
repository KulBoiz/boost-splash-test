import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { color } from "../../theme"

interface Props{
  checkboxState?: boolean
  setCheckboxState(e: boolean): void
  textComponent?: JSX.Element
  text?: string
  style?: ViewStyle | any
}

const Checkbox = React.memo((props: Props) => {
  const {checkboxState, setCheckboxState, textComponent, text, style} = props
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={20}
        text={text}
        style={style}
        isChecked={checkboxState}
        fillColor={color.palette.blue}
        unfillColor="#FFFFFF"
        textComponent={textComponent}
        iconStyle={styles.iconStyle}
        onPress={(isChecked: boolean) => setCheckboxState(isChecked)}
      />
    </View>
  )
});

export default Checkbox;

Checkbox.displayName = 'Checkbox'

const styles = StyleSheet.create({
    container: {},
  iconStyle: { borderColor: color.palette.black, borderRadius: 4, }
});
