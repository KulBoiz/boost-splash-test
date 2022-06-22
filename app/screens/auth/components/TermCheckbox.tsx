import React from 'react';
import { View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import { presets } from "../../../constants/presets"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { s, ScaledSheet } from "react-native-size-matters"

interface Props{
  checkboxState: boolean
  setCheckboxState: (e: boolean)=> void
}

const TermCheckbox = React.memo((props: Props) => {
  const {checkboxState, setCheckboxState} = props
  const _renderText = ()=> {
    return (
      <View style={styles.textContainer}>
        <AppText value={'Tôi đã đọc và đồng ý với các '} style={presets.note}/>
        <AppText value={'Điều khoản sử dụng '} onPress={()=> navigate(ScreenNames.TERM_AND_POLICY, {id: 0})} fontSize={s(12)} color={color.palette.blue} style={presets.bold}/>
        <AppText value={'và '} style={presets.note}/>
        <AppText value={'Chính sách bảo mật '} onPress={()=> navigate(ScreenNames.TERM_AND_POLICY, {id: 1})} fontSize={s(12)} color={color.palette.blue} style={presets.bold}/>
        <AppText value={'của FINA'} style={presets.note}/>
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

export default TermCheckbox;
TermCheckbox.displayName = 'TermCheckbox'

const styles = ScaledSheet.create({
    container: {marginTop: '20@s'},
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '5@s',
    alignItems: "center"
  }
});
