import React, { useState } from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import AppButton from "../../components/app-button/AppButton"
import RenderHtml from 'react-native-render-html';
import { width } from "../../constants/variable"
import { CollaboratorContractInfoDesktop } from "./constants"
import { ScaledSheet } from "react-native-size-matters"
import SignatureModal from "./components/signature-modal"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { CONTAINER_PADDING } from "../../styles/common-style"

interface Props{}

const SignContract = React.memo((props: Props) => {
  const [signatureModal, setSignatureModal] = useState<boolean>(false)
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Đăng ký làm cộng tác viên'} isBlue/>
      <ScrollView style={CONTAINER_PADDING}>
      <RenderHtml
        contentWidth={width}
        source={CollaboratorContractInfoDesktop({fullName: ''})}
      />
      </ScrollView>

      <View style={styles.btnContainer}>
        <AppButton title={'Tiếp tục'} onPress={()=> navigate(ScreenNames.REGISTER_INFO)}/>
      </View>
      <SignatureModal visible={signatureModal} closeModal={()=> setSignatureModal(false)} onSubmit={()=>{}} />
    </View>
  )
});

export default SignContract;

const styles = ScaledSheet.create({
    container: {flex:1},
  btnContainer :{
      flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: '24@s',
    paddingHorizontal: '16@ms'
  },
  sign: {
      flex: 1,
    marginBottom: '50@s',

  }
});
