import React from 'react';
import { View, StyleSheet } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import { presets } from "../../../constants/presets"

interface Props{
  checkboxState: boolean
  setCheckboxState: (e: boolean)=> void
}

const TermCheckbox = React.memo((props: Props) => {
  const {checkboxState, setCheckboxState} = props
  const _renderText = ()=> {
    return (
      <View style={styles.textContainer}>
        <AppText value={' I’ve read and agree to the '}/>
        <AppText value={'term '} color={color.palette.blue} style={presets.bold}/>
        <AppText value={'of '}/>
        <AppText value={'privacy policy'} color={color.palette.blue} style={presets.bold}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={20}
        isChecked={checkboxState}
        fillColor={color.palette.blue}
        unfillColor="#FFFFFF"
        textComponent={_renderText()}
        iconStyle={{ borderColor: "black", borderRadius: 4, }}
        onPress={(isChecked: boolean) => setCheckboxState(isChecked)}
      />
    </View>
  )
});

export default TermCheckbox;
TermCheckbox.displayName = 'TermCheckbox'

const styles = StyleSheet.create({
    container: {marginTop: 20},
  textContainer: {
      flexDirection: 'row'
  }
});
