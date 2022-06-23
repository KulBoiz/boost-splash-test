import React, { useState } from "react"
import { ActivityIndicator, Alert, ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import AppButton from "../../components/app-button/AppButton"
import RenderHtml from 'react-native-render-html';
import { isAndroid, width } from "../../constants/variable"
import { CollaboratorContractInfoDesktop } from "./constants"
import { s, ScaledSheet } from "react-native-size-matters"
import SignatureModal from "./components/signature-modal"
import { ScreenNames } from "../../navigators/screen-names"
import { CONTAINER_PADDING, PADDING_VERTICAL } from "../../styles/common-style"
import FastImage from "react-native-fast-image"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import moment from "moment"
import { color } from "../../theme";
import { Dialog, Paragraph } from "react-native-paper"
import { AppText } from "../../components/app-text/AppText"
import { fontFamily } from "../../constants/font-family"
import { ROLE } from "../../models/auth-store";

interface Props{}
const content = 'Hồ sơ của bạn đang được xử lý, chúng tôi sẽ cập nhật trong vòng 24 giờ.\n\nChân thành cảm ơn!'

const SignContract = React.memo((props: Props) => {
  const { agentStore, authStoreModel } = useStores()
  const navigation = useNavigation()
  const [loading, setLoading] = useState<boolean>(false)
  const [signatureModal, setSignatureModal] = useState<boolean>(false)
  const [successModal, setSuccessModal] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [checkSign, setCheckSign] = useState<boolean>(false)
  const [signature, setSignature] = useState<any>(null)

  const uploadSignature = () => {
    setSignatureModal(false)
  }

  const closeModal = () => {
    setSuccessModal(false)
    navigation.dispatch(StackActions.push(ScreenNames.APP))
  }

  const sendData = async () => {
    setSuccessModal(true)
    setIsSuccess(false)

    await agentStore.registerAgent().then(() => {
      authStoreModel.setRole(ROLE.CTV)
      setIsSuccess(true)
    }).catch(() => {
      setIsSuccess(false)
      Alert.alert('Something went wrong')
    })
  }
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Kí hợp đồng '} isBlue />
      <ScrollView style={[CONTAINER_PADDING, PADDING_VERTICAL]}>
        <RenderHtml
          contentWidth={width}
          baseStyle={styles.htmlContainer}
          source={CollaboratorContractInfoDesktop({
            fullName: agentStore.fullName?.toUpperCase(),
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
        <View style={styles.signatureContainer}>
          {(!signature || !checkSign) && <AppButton title={'Ký bằng tay'} onPress={() => setSignatureModal(true)} />}
          {(signature && checkSign) && <FastImage source={{ uri: `data:image/png;base64,${signature}` }} style={styles.signature} />}
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>

      <View style={styles.btnContainer}>
        <AppButton title={'Tiếp tục'} onPress={sendData} disable={!signature || loading || !checkSign} loading={loading}/>
      </View>
      <SignatureModal {...{visible:signatureModal, closeModal:uploadSignature, setSignature, setLoading, setCheckSign}}/>
      <Dialog visible={successModal}>
        <Dialog.Content>
          {!isSuccess ? <ActivityIndicator size="large"/> : <Paragraph>{content}</Paragraph>}
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
  container: { flex: 1, backgroundColor: color.palette.lightBlue },
  signature: { width: '105@s', height: '80@s', top: '20@s', backgroundColor: color.background },
  btnContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: '24@s',
    paddingHorizontal: '16@ms'
  },

  htmlContainer: {
    backgroundColor: color.background,
    padding: s(16),
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: s(8)
  },
  sign: {
    flex: 1,
    marginBottom: '50@s',

  },
  backHome: {
    textTransform: "uppercase",
    color: color.palette.blue,
    fontFamily: fontFamily.semiBold,
    right: '10@s',
    bottom: '10@s'
  },
  signatureContainer: {
    width: '40%',
    position: 'absolute',
    bottom: isAndroid ? '160@s' : '140@s',
    right: s(25),
    alignItems: 'center'
  }
});
