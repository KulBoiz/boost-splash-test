import React from 'react';
import { ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import AppButton from "../../components/app-button/AppButton"
import RenderHtml from 'react-native-render-html';
import { width } from "../../constants/variable"
import { CollaboratorContractInfoDesktop } from "./constants"
import { ScaledSheet } from "react-native-size-matters"
interface Props{}

const RegisterAgent = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Đăng ký làm cộng tác viên'} isBlue/>
      <ScrollView>
      <RenderHtml
        contentWidth={width}
        source={CollaboratorContractInfoDesktop({fullName: ''})}
      />
      </ScrollView>
      <View style={styles.btnContainer}>
        <AppButton title={'Tiếp tục'} onPress={()=> {}}/>
      </View>
    </View>
  )
});

export default RegisterAgent;

const styles = ScaledSheet.create({
    container: {flex:1},
  btnContainer :{
      flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: '24@s',
    paddingHorizontal: '16@ms'
  }
});
