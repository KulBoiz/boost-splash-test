import React, { useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import AppButton from "../../components/app-button/AppButton"
import RenderHtml from 'react-native-render-html';
import { width } from "../../constants/variable"
import { CollaboratorContractInfoDesktop } from "./constants"
import { ScaledSheet } from "react-native-size-matters"
import SignatureModal from "./components/signature-modal"
import { ScreenNames } from "../../navigators/screen-names"
import { CONTAINER_PADDING } from "../../styles/common-style"
import FastImage from "react-native-fast-image"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import moment from "moment"
import { color } from "../../theme";
import { Dialog, Paragraph } from "react-native-paper"
import { AppText } from "../../components/app-text/AppText"
import { fontFamily } from "../../constants/font-family"

interface Props{}
const content = 'Hồ sơ của bạn đang được xử lý, chúng tôi sẽ cập nhật trong vòng 24 giờ.\n\nChân thành cảm ơn!'

const SignContract = React.memo((props: Props) => {
  const {agentStore} = useStores()
  const navigation = useNavigation()
  const [signatureModal, setSignatureModal] = useState<boolean>(false)
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [signature, setSignature] = useState<any>(null)

  const uploadSignature = () => {
    setSignatureModal(false)
  }

  const closeModal =()=> {
    setSuccessModal(false)
    navigation.dispatch(StackActions.push(ScreenNames.APP))
  }
  const sendData = async () => {
    const result = await agentStore.registerAgent()
    if (result.kind === 'ok'){
      setSuccessModal(true)
    }
    else {Alert.alert('Something went wrong')}
  }
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Kí hợp đồng '} isBlue/>
      <ScrollView style={CONTAINER_PADDING}>
        <RenderHtml
          contentWidth={width}
          baseStyle={{backgroundColor: color.background}}
          source={CollaboratorContractInfoDesktop({
            fullName: agentStore.fullName,
            idNumber: agentStore.citizenIdentification,
            issuedOn: moment(agentStore.dateRange).format('DD/MM/YYYY'),
            placeOfIssue: agentStore.issuedBy,
            address: agentStore.address,
            email: agentStore.email,
            tel: agentStore.phone,
            bankAccount: agentStore.bankNumber,
            bankName: agentStore.bankName,
          })}
        />
        <View style={{width: '40%', position: 'absolute', bottom: 30, right: 50, alignItems: 'center'}}>
          {!signature && <AppButton title={'Ký bằng tay'} onPress={()=> setSignatureModal(true)}/> }
          {signature &&<FastImage source={{uri: `data:image/png;base64,${signature}`}} style={{width: 100, height: 100, top: 20}}/>}
        </View>
        <View style={{height: 50}}/>
      </ScrollView>

      <View style={styles.btnContainer}>
        <AppButton title={'Tiếp tục'} onPress={sendData} disable={!signature}/>
      </View>
      <SignatureModal visible={signatureModal} closeModal={uploadSignature}  setSignature={setSignature}/>
      <Dialog visible={successModal}>
        <Dialog.Content>
          <Paragraph>{content}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <AppText onPress={closeModal} style={styles.backHome}>Trở về trang chủ</AppText>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
});

export default SignContract;

const styles = ScaledSheet.create({
  container: {flex:1, backgroundColor: color.background},
  btnContainer :{
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: '24@s',
    paddingHorizontal: '16@ms'
  },
  sign: {
    flex: 1,
    marginBottom: '50@s',

  },
  backHome: {
    textTransform: "uppercase",
    color: color.palette.blue,
    fontFamily: fontFamily.semiBold
  }
});
