import React from 'react';
import { View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import { presets } from "../../../constants/presets"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  checkboxState: boolean
  setCheckboxState: (e: boolean)=> void
}

const AgentCheckbox = React.memo((props: Props) => {
  const {checkboxState, setCheckboxState} = props
  const _renderText = ()=> {
    return (
      <View style={styles.textContainer}>
        <AppText value={'Tôi xác nhận thông tin trên là chính xác'} style={presets.note}/>
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
        iconStyle={{ borderColor: "black", borderRadius: 4 }}
        onPress={(isChecked: boolean) => setCheckboxState(isChecked)}
      />
    </View>
  )
});

export default AgentCheckbox;

const styles = ScaledSheet.create({
    container: {marginTop: '20@s'},
  textContainer: {
      flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '5@s'
  }
});
